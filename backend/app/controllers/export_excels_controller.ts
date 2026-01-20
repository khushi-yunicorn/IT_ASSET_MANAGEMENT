import type { HttpContext } from '@adonisjs/core/http'
import { ExportExcelService } from "#services/export_excel_service"
import { inject } from "@adonisjs/core"
import ResponseHelper from '../utils/responseHelper.js'

@inject()
export default class ExportExcelsController {
    constructor(private exportExcelService: ExportExcelService) { }

    async exportExcel({ response, i18n }: HttpContext) {
        try {
            const excel = await this.exportExcelService.exportExcel()
            response.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
            response.header('Content-Disposition', 'attachment; filename="inventory.xlsx"')
            response.send(excel)
            return ResponseHelper.success(
                response,
                i18n.t("validator.exports.excel"),
                true
            )

        }catch(error){
            return ResponseHelper.badRequest(
                response,
                i18n.t("validator.exports.export_failed"),
            )
        }
    }
}