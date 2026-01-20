import { UserService } from '#services/user_service'
import { UserCreateValidator, UserUpdateValidator } from '#validators/user';
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import ResponseHelper from '../utils/responseHelper.js';

@inject()
export default class UsersController {
    constructor(private userService: UserService) { }

    async store({ request, response, i18n }: HttpContext) {
        try {
            const payload: any = await request.validateUsing(UserCreateValidator)
            const user = await this.userService.create(payload)
            return ResponseHelper.created(
                response,
                i18n.t('validator.users.created'),
                user
            )
        } catch (error) {
            return ResponseHelper.badRequest(
                response,
                i18n.t('validator.users.create_failed')
            )
        }
    }
 
    async show({ params, response, i18n }: HttpContext) {
        try {
            const payload = params.id
            const findUser = await this.userService.find(payload)
            if (!findUser) {
                return ResponseHelper.notFound(
                    response,
                    i18n.t('validator.users.not_found')
                )
            }
            return ResponseHelper.success(
                response,
                i18n.t('validator.users.fetched_one'),
                findUser
            )
        } catch (error) {
            return ResponseHelper.badRequest(
                response,
                i18n.t('validator.users.fetch_failed')
            )
        }
    }

    async index({ response, i18n }: HttpContext) {
        try {
            const users = await this.userService.findAll()
            return ResponseHelper.success(
                response,
                i18n.t('validator.users.fetched'),
                users
            )
        } catch (error) {
            return ResponseHelper.badRequest(
                response,
                i18n.t('validator.users.fetch_failed')
            )
        }
    }

    async edit({ request, params, response, i18n }: HttpContext) {
        try {
            const id = params.id
            const payload: any = await request.validateUsing(UserUpdateValidator)
            const user = await this.userService.update(payload, id)
            if (!user) {
                return ResponseHelper.notFound(
                    response,
                    i18n.t('validator.users.not_found')
                )
            }
            return ResponseHelper.success(
                response,
                i18n.t('validator.users.updated'),
                user
            )
        } catch (error) {
            return ResponseHelper.badRequest(
                response,
                i18n.t('validator.users.update_failed')
            )
        }
    }

    async destroy({ params, response, i18n }: HttpContext) {
        try {
            const user = await this.userService.delete(params.id)
            return ResponseHelper.success(
                response,
                i18n.t('validator.users.deleted'),
                user
            )
        } catch (error) {
            return ResponseHelper.badRequest(
                response,
                i18n.t('validator.users.delete_failed')
            )
        }
    }
}