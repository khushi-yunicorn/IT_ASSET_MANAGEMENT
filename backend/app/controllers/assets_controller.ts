import { AssetService } from '#services/asset_service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class AssetsController {
    constructor(private assetService: AssetService) { }

    async store({ request, response }: HttpContext) {
        try {
            const payload: any = request.all()
            const user = await this.assetService.register(payload)
            return {
                message: "Asset created successfully",
                user
            }
        }catch(error){
            return response.status(500).json({
                message: error
            })
        }
    }

    async show({response}: HttpContext) {
        try {
            const users = await this.assetService.findAll()
            return {
                message: "All Data fetch successfully",
                users
            }
        }catch(error){
            return response.status(500).json({
                message: error
            })
        }
    }

    async index({ params, response }: HttpContext) {
        try {
            const payload = params.id
            const user = await this.assetService.find(payload)
            return {
                message: "Data fetch successfully",
                user
            }
        }catch(error){
            return response.status(500).json({
                message: error
            })
        }
    }

    async edit({ request, params, response }: HttpContext) {
        try {
            const id = params.id
            const payload = request.all()
            const asset = await this.assetService.update(id, payload)
            return {
                message: "Data updated successfully",
                asset
            }
        }catch(error){
            return response.status(500).json({
                message: error
            })
        }
    }

    async destroy({ params, response }: HttpContext) {
        try {
            await this.assetService.delete(params.id)
            return {
                message: "Asset Deleted Successfully",
            }
        }catch(error){
            return response.status(500).json({
                message: error
            })
        }
    }
}