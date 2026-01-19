import Inventory from '#models/inventory'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import PDFDocument from 'pdfkit'

export default class ExportPdfsController {

    async pdfExport({ response }: HttpContext) {

        const inventories = await Inventory.query()
            .select('id', 'asset_name', 'asset_type', 'serial_number', 'purchase_date', 'vendor_name', 'quantity', 'status')
            .orderBy('id')

        const hello = inventories.map((inventory) => {
            return [
            inventory.id,
                inventory.asset_name,
                inventory.asset_type,
                inventory.serial_number,
                inventory.purchase_date.setLocale('en-gb').toLocaleString(),
                inventory.purchase_date.toLocaleString(DateTime.TIME_SIMPLE),
                inventory.vendor_name,
                inventory.quantity,
                inventory.status.split(/(?=[A-Z])/).join(" ")]
        })

        const doc = new PDFDocument({ margin: 20, size: 'A4' })

        response.header('Content-Type', 'application/pdf')
        response.header('Content-Disposition', 'attachment; filename="inventory.pdf"')

        response.stream(doc)

        doc
            .fontSize(20)
            .font('Helvetica-Bold')
            .text('Inventory Statement', { align: 'center' })

        doc.moveDown(0.5)

        doc
            .font('Helvetica-Bold')
            .fontSize(9)
            .table({
            data: [["S.No","Asset Name", "Asset Type", "Serial Number", "Purchased Date", "Purchased Time", "Vendor Name", "Quantity", "Status"] ]
        })

        doc
            .font('Times-Roman')
            .fontSize(8)
            .table({
            data:
                hello
        })
        doc.end()
    }
}