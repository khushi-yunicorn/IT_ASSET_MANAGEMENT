import Inventory from '#models/inventory'
import ExcelJS from 'exceljs'
import { DateTime } from 'luxon';

export class ExportExcelService {

  async exportExcel() {
    const inventories = await Inventory.query()
      .select('id', 'asset_name', 'asset_type', 'serial_number', 'purchase_date', 'vendor_name', 'quantity', 'status')
      .orderBy('id')
    const workbook = new ExcelJS.Workbook()
    workbook.creator = "Admin"
    workbook.created = new Date()

    const worksheet = workbook.addWorksheet('Inventory_Data')
    let font = { name: 'Times New Roman', size: 11 };

    worksheet.columns = [
      { header: 'S.No', key: 'id', width: 10 },
      { header: 'Asset Name', key: 'asset_name', width: 20, style: { font: font } },
      { header: 'Asset Type', key: 'asset_type', width: 20, style: { font: font } },
      { header: 'Serial Number', key: 'serial_number', width: 20, style: { font: font } },
      { header: 'Purchased Date', key: 'purchase_date', width: 16, style: { font: font } },
      { header: 'Purchased Time', key: 'purchase_time', width: 17, style: { font: font } },
      { header: 'Quantity', key: 'quantity', width: 10, style: { font: font } },
      { header: 'Vendor Name', key: 'vendor_name', width: 25, style: { font: font } },
      { header: 'Status', key: 'status', width: 15, style: { font: font } },
    ]
    inventories.forEach((inventory) => {
      worksheet.addRow({
        id: inventory.id,
        asset_name: inventory.asset_name,
        asset_type: inventory.asset_type,
        serial_number: inventory.serial_number,
        purchase_date: inventory.purchase_date.setLocale('en-gb').toLocaleString(),
        purchase_time: inventory.purchase_date.toLocaleString(DateTime.TIME_SIMPLE),
        vendor_name: inventory.vendor_name,
        quantity: inventory.quantity,
        status: inventory.status.split(/(?=[A-Z])/).join(" ")
      })
    })
    worksheet.getRow(1).font = { bold: true, size: 12 }

    worksheet.eachRow((row) => {
      row.alignment = { vertical: 'middle', horizontal: 'center' }
    })
    const buffer = await workbook.xlsx.writeBuffer()
    return buffer
  }
}