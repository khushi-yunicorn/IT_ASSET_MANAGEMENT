import { UserService } from '#services/user_service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class UsersController {
    constructor(private userService: UserService) { }

    async store({ request }: HttpContext) {
        try {
            const payload = request.only(['name', 'email', 'contact_no', 'emp_code'])
            const user = await this.userService.create(payload)

            return {
                user,
                message: "Successfully created"
            }
        }
        catch(error){
            return{
                message: "Failed to create user"
            }
        }
    }

    async index({ params }: HttpContext) {
        try {
            const payload = params.id

            const findUser = await this.userService.find(payload)

            return {
                message: "Data Fetched Successfully",
                findUser
            }

        }
        catch (error) {
            return {
                message: 'Invalid data',
                error
            }
        }
    }

    async show() {
        try {
            const users = await this.userService.findAll()
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

    async edit({ request, params }: HttpContext) {
        try {
            const id = params.id
            console.log(params);

            const payload = request.all()

            const users = await this.userService.update(id, payload)
            return {
                message: "Data updated successfully",
                users
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
            await this.userService.delete(params.id)
            return {
                message: "User Deleted Successfully",
            }
        }
        catch (error) {
            return {
                message: "User not deleted"
            }
        }
    }
}