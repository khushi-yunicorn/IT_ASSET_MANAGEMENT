import { AssetService } from '#services/asset_service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class AssetsController {
    constructor(private assetService: AssetService) { }

    async store({ request }: HttpContext) {

        try {
            const payload: any = request.all()
            const user = await this.assetService.register(payload)
            console.log(payload);

            return {
                message: "Asset created successfully",
                user
            }

        }
        catch (error) {
            return {
                message: "Failed to create asset"
            }
        }
    }

    async show() {
        try {
            const users = await this.assetService.findAll()
            return {
                message: "All Data fetch successfully",
                users
            }

        }
        catch (error) {
            return {
                message: "Data fetched unsucessfully",
                error
            }
        }

    }

    async index({ params }: HttpContext) {
        try {
            const payload = params.id
            const user = await this.assetService.find(payload)

            return {
                message: "Data fetch successfully",
                user
            }
        }
        catch (error) {
            return {
                message: 'Data not found',
                error
            }
        }
    }

    async edit({ request, params }: HttpContext) {
        try {
            const id = params.id

            const payload = request.all()
            const asset = await this.assetService.update(id, payload)
            return {
                message: "Data updated successfully",
                asset
            }
        }
        catch (error) {
            return {
                message: "Cann't update the data"
            }
        }

    }

    async destroy({ params }: HttpContext) {
        try {
            await this.assetService.delete(params.id)
            return {
                message: "Asset Deleted Successfully",
            }
        }
        catch (error) {
            return {
                message: "Asset not deleted"
            }
        }
    }
}