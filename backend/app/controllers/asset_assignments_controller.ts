import { AssetAssignmentService } from '#services/asset_assignment_service'
import { AssetAssignmentCreateValidator, AssetAssignmentUpdateValidator } from '#validators/asset_assignment'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class AssetAssignmentsController {
    constructor(private assetAssignmentService: AssetAssignmentService) { }

    async store({ request, response }: HttpContext) {
        try {
            const payload: any = await request.validateUsing(AssetAssignmentCreateValidator)
            const asset_assignment = await this.assetAssignmentService.register(payload)
            return {
                message: "Asset Assigned successfully",
                asset_assignment
            }
        } catch (error) {
            return response.status(500).json({
                message: error
            })
        }
    }

    async show({ params, response }: HttpContext) {
        try {
            const id = params.id
            const fetch = await this.assetAssignmentService.find(id)
            return {
                message: "Data fetch successfully",
                fetch
            }
        } catch (error) {
            return response.status(500).json({
                message: error
            })
        }
    }

    async index({ response }: HttpContext) {
        try {
            const data = await this.assetAssignmentService.findAll()
            return {
                message: "All data fetched successfully",
                data
            }
        } catch (error) {
            return response.status(500).json({
                message: error
            })
        }
    }

    async edit({ request, params, response }: HttpContext) {
        try {
            const payload = await request.validateUsing(AssetAssignmentUpdateValidator)
            const update = await this.assetAssignmentService.update(payload, params.id)
            return {
                message: "Data update successfully",
                update
            }
        } catch (error) {
            return response.status(500).json({
                message: error
            })
        }
    }

    async destroy({ params, response }: HttpContext) {
        try {
            const id = params.id
            await this.assetAssignmentService.delete(id)
            return {
                message: "Data deleted successfully"
            }
        } catch (error) {
            return response.status(500).json({
                message: error
            })
        }
    }
}