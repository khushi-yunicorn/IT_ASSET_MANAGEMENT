import type { HttpContext } from '@adonisjs/core/http'
import { ExportExcelService } from "#services/export_excel_service"
import { inject } from "@adonisjs/core"

@inject()
export default class ExportExcelsController {
    constructor(private exportExcelService: ExportExcelService) { }

    async exportExcel({ response }: HttpContext) {
        try {
            const excel = await this.exportExcelService.exportExcel()
            response.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
            response.header('Content-Disposition', 'attachment; filename="inventory.xlsx"')
            return response.send(excel)

        }catch(error){
            return response.status(500).json({
                message: error
            })
        }
    }
}