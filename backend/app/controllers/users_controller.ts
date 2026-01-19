import { UserService } from '#services/user_service'
import { UserValidator } from '#validators/user';
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class UsersController {
    constructor(private userService: UserService) { }

    async store({ request, response }: HttpContext) {
        try {
            const payload:any = await request.validateUsing(UserValidator)
            const user = await this.userService.create(payload)

            return response.status(201).json({
                user,
                message: "Successfully created"
            })
        }
        catch(error){
            return response.status(500).json({
                message: error
            })
        }
    }

    async index({ params, response }: HttpContext) {
        try {
            const payload = params.id
            const findUser = await this.userService.find(payload)
            return {
                message: "Data Fetched Successfully",
                findUser
            }
        }
        catch(error){
            return response.status(500).json({
                message: error
            })
        }
    }

    async show({response}: HttpContext) {
        try {
            const users = await this.userService.findAll()
            return {
                message: "All Data fetch successfully",
                users
            }
        }
        catch(error){
            return response.status(500).json({
                message: error
            })
        }
    }

    async edit({ request, params, response}: HttpContext) {
        try {
            const id = params.id
            const payload: any = request.all()
            const users = await this.userService.update(id, payload)
            return {
                message: "Data updated successfully",
                users
            }
        }
        catch(error){
            return response.status(500).json({
                message: error
            })
        }
    }

    async destroy({ params, response }: HttpContext) {
        try {
            await this.userService.delete(params.id)
            return {
                message: "User Deleted Successfully",
            }
        }
        catch(error){
            return response.status(500).json({
                message: error
            })
        }
    }
}