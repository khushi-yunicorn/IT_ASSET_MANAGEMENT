import { AssetAssignmentService } from '#services/asset_assignment_service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class AssetAssignmentsController {
    constructor(private assetAssignmentService: AssetAssignmentService){}

    async store({request, response}: HttpContext){
        try{

            const payload = request.only(['asset_id', 'user_id', 'status'])
            const asset_assignment = await this.assetAssignmentService.register(payload) 

            console.log(asset_assignment);
            return{
                message:"Asset Assigned successfully",
                asset_assignment
            }
        }

        catch(error){
            return {
                message: "Unable to assign the asset to user"
            } 
        }
    }

    async show({params}: HttpContext){
        try{
            const id = params.id

            const fetch = await this.assetAssignmentService.find(id)
            return {
                message: "Data fetch successfully",
                fetch
            }
        }

        catch(error){
            return{
                message: "Unable to fetch the data"
            }
        }

    }

    async index(){
        try{
            const data = await this.assetAssignmentService.findAll()
            return{
                message: "All data fetched successfully",
                data
            }
        }

        catch(error){
            return{
                message: "Unable to fetch the data"
            }
        }
    }

    async edit({request, params}: HttpContext){
        try{
            const payload = request.all()
            const update = await this.assetAssignmentService.update(payload, params.id)
            return{
                message: "Data update successfully",
                update
            }
        }

        catch(error){
            return {
                message: "Unable to update the data"
            }
        }

    }

    async destroy({params}:HttpContext){
        try{
            const id = params.id
            const data = await this.assetAssignmentService.delete(id)
            return{
                message: "Data deleted successfully"
            }

        }

        catch(error){
            return{
                messsage: "Unable to delete the data"
            }
        }
    }
}