import { AssetAssignmentService } from '#services/asset_assignment_service'
import { AssetAssignmentCreateValidator, AssetAssignmentUpdateValidator } from '#validators/asset_assignment'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import ResponseHelper from '../utils/responseHelper.js'

@inject()
export default class AssetAssignmentsController {
    constructor(private assetAssignmentService: AssetAssignmentService) { }

    async store({ request, response, i18n }: HttpContext) {
        try {
            const payload: any = await request.validateUsing(AssetAssignmentCreateValidator)
            const asset_assignment = await this.assetAssignmentService.register(payload)
            return ResponseHelper.created(
                response,
                i18n.t('validator.asset_assignment.created'),
                asset_assignment
            )
        } catch (error) {
            return ResponseHelper.badRequest(
                response,
                i18n.t('validator.asset_assignment.create_failed')
            )
        }
    }

    async show({ params, response, i18n }: HttpContext) {
        try {
            const id = params.id
            const fetch = await this.assetAssignmentService.find(id)
            if (!fetch) {
                return ResponseHelper.notFound(
                    response,
                    i18n.t('validator.asset_assignment.not_found')
                )
            }
            return ResponseHelper.success(
                response,
                i18n.t('validator.asset_assignment.fetched_one'),
                fetch
            )
        } catch (error) {
            return ResponseHelper.badRequest(
                response,
                i18n.t('validator.asset_assignment.fetch_failed')
            )
        }
    } 

    async index({ response, i18n }: HttpContext) {
        try {
            const data = await this.assetAssignmentService.getAll()
            return ResponseHelper.success(
                response,
                i18n.t('validator.asset_assignment.fetched'),
                data
            )
        } catch (error) {
            return ResponseHelper.badRequest(
                response,
                i18n.t('validator.asset_assignment.fetch_failed')
            )
        }
    }

    async edit({ request, params, response, i18n }: HttpContext) {
        try {
            const payload = await request.validateUsing(AssetAssignmentUpdateValidator)
            const update = await this.assetAssignmentService.update(payload, params.id)
            if (!update) {
                return ResponseHelper.notFound(
                    response,
                    i18n.t('validator.asset_assignment.not_found')
                )
            }
            return ResponseHelper.success(
                response,
                i18n.t('validator.asset_assignment.updated'),
                update
            )
        } catch (error) {
            return ResponseHelper.badRequest(
                response,
                i18n.t('validator.asset_assignment.update_failed')
            )
        }
    }

    async destroy({ params, response, i18n }: HttpContext) {
        try {
            const id = params.id
            const asset = await this.assetAssignmentService.delete(id)
            if (!asset) {
                return ResponseHelper.notFound(
                    response,
                    i18n.t('validator.asset_assignment.not_found')
                )
            }
            return ResponseHelper.success(
                response,
                i18n.t('validator.asset_assignment.deleted'),
                asset
            )
        } catch (error) {
            return ResponseHelper.badRequest(
                response,
                i18n.t('validator.asset_assignment.delete_failed')
            )
        }
    }
}