import { HttpContext } from '@adonisjs/core/http'

import { InventoryService } from "#services/inventory_service";
import { inject } from "@adonisjs/core";
import { InventoryUpdateValidator, InventoryCreateValidator } from '#validators/inventory';

@inject()
export default class InventoriesController {
    constructor(private inventory: InventoryService) { }

    async store({ request, response }: HttpContext) {
        try {
            const payload: any = await request.validateUsing(InventoryCreateValidator)
            const inventory =await this.inventory.register(payload)
            return {
                message: "Inventory add successfully",
                inventory
            }
        } catch(error){
            return response.status(500).json({
                message: error
            })
        }
    }

    async index({response}: HttpContext) {
        try {
            const data = await this.inventory.findAll()
            return {
                message: "All data fetched successfully",
                data
            }
        }catch(error){
            return response.status(500).json({
                message: error
            })
        }
    }

    async show({ params, response }: HttpContext){
        try {
            const inventory = await this.inventory.find(params.id)
            return{
                message: "Data fetched successfully",
                 inventory
            }
        }catch(error){
            return response.status(500).json({
                message: error
            })
        }
    }

    async edit({request, params, response}: HttpContext){
        try {
            const payload = await request.validateUsing(InventoryUpdateValidator)
            const data = await this.inventory.update(payload, params.id)
            return{
                message: "Data update successfully",
                data
            }
        } catch(error){
            return response.status(500).json({
                message: error
            })
        }
    }

    async destroy({params, response}: HttpContext){
        try {
            await this.inventory.delete(params.id)
            return{
                message:"Data deleted successfully"
            }
        } catch(error){
            return response.status(500).json({
                message: error
            })
        }
    }
}