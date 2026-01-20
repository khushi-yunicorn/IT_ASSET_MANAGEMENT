import { AssetService } from '#services/asset_service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import ResponseHelper from '../utils/responseHelper.js';

@inject()
export default class AssetsController {
    constructor(private assetService: AssetService) { }
    async store({ request, response, i18n }: HttpContext) {
        try {
            const payload: any = request.all()
            const asset = await this.assetService.register(payload)
            return ResponseHelper.created(
                response,
                i18n.t('validator.assets.created'),
                asset,
            )
        } catch (error) {
            return ResponseHelper.badRequest(
                response,
                i18n.t('validator.assets.create_failed')
            )
        }
    }

    async index({ response, i18n }: HttpContext) {
        try {
            const assets = await this.assetService.findAll()
            return ResponseHelper.success(
                response,
                i18n.t('validator.assets.fetched'),
                assets
            )
        } catch (error) {
            return ResponseHelper.badRequest(
                response,
                i18n.t('validator.assets.fetch_failed')
            )
        }
    }

    async show({ params, response, i18n }: HttpContext) {
        try {
            const payload = params.id
            const asset = await this.assetService.find(payload)
            if (!asset) {
                return ResponseHelper.notFound(
                    response,
                    i18n.t('validator.assets.not_found')
                )
            }
            return ResponseHelper.success(
                response,
                i18n.t('validator.assets.fetched_one'),
                asset
            )
        } catch (error) {
            return ResponseHelper.badRequest(
                response,
                i18n.t('validator.assets.fetch_failed')
            )
        }
    }

    async edit({ request, params, response, i18n }: HttpContext) {
        try {
            const id = params.id
            const payload = request.all()
            const asset = await this.assetService.update(id, payload)
            if (!asset) {
                return ResponseHelper.notFound(
                    response,
                    i18n.t('validator.assets.not_found')
                )
            }
            return ResponseHelper.success(
                response,
                i18n.t('validator.assets.updated'),
                asset
            )
        } catch (error) {
            return ResponseHelper.badRequest(
                response,
                i18n.t('validator.assets.update_failed')
            )
        } 
    }

    async destroy({ params, response, i18n }: HttpContext) {
        try {
            const asset = await this.assetService.delete(params.id)
            if (!asset) {
                return ResponseHelper.notFound(
                    response,
                    i18n.t('validator.assets.not_found')
                )
            }
            return ResponseHelper.success(
                response,
                i18n.t('validator.assets.deleted'),
                asset
            )
        } catch (error) {
            return ResponseHelper.badRequest(
                response,
                i18n.t('validator.assets.delete_failed')
            )
        }
    }
}