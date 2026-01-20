import { HttpContext } from '@adonisjs/core/http'
import { InventoryService } from "#services/inventory_service";
import { inject } from "@adonisjs/core";
import { InventoryUpdateValidator, InventoryCreateValidator } from '#validators/inventory';
import ResponseHelper from '../utils/responseHelper.js';

@inject()
export default class InventoriesController {
    constructor(private inventory: InventoryService) { }

    async store({ request, response, i18n }: HttpContext) {
        try {
            const payload: any = await request.validateUsing(InventoryCreateValidator)
            const inventory = await this.inventory.register(payload)
            return ResponseHelper.success(
                response,
                i18n.t('validator.inventories.created'),
                inventory
            )
        } catch (error) {
            return ResponseHelper.badRequest(
                response,
                i18n.t('validator.inventories.create_failed')
            )
        }
    }

    async index({ response, i18n }: HttpContext) {
        try {
            const data = await this.inventory.findAll()
            return ResponseHelper.success(
                response,
                i18n.t('validator.inventories.fetched'),
                data
            )
        } catch (error) {
            return ResponseHelper.badRequest(
                response,
                i18n.t('validator.inventories.fetch_failed')
            )
        }
    }

    async show({ params, response, i18n }: HttpContext) {
        try {
            const inventory = await this.inventory.find(params.id)
            if (!inventory) {
                return ResponseHelper.notFound(
                    response,
                    i18n.t('validator.inventories.not_found'),
                )
            }
            return ResponseHelper.success(
                response,
                i18n.t('validator.inventories.fetched_one'),
                inventory
            )
        } catch (error) {
            return ResponseHelper.badRequest(
                response,
                i18n.t('validator.inventories.fetch_failed')
            )
        }
    }

    async edit({ request, params, response, i18n }: HttpContext) {
        try {
            const payload = await request.validateUsing(InventoryUpdateValidator)
            const data = await this.inventory.update(payload, params.id)
            if (!data) {
                return ResponseHelper.notFound(
                    response,
                    i18n.t('validator.inventories.not_found'),
                )
            }
            return ResponseHelper.success(
                response,
                i18n.t('validator.inventories.updated'),
                data
            )
        } catch (error) {
            return ResponseHelper.badRequest(
                response,
                i18n.t('validator.inventories.update_failed')
            )
        }
    }

    async destroy({ params, response, i18n }: HttpContext) {
        try {
            const data = await this.inventory.delete(params.id)
            if (!data) {
                return ResponseHelper.notFound(
                    response,
                    i18n.t('validator.inventories.not_found'),
                )
            }
            return ResponseHelper.success(
                response,
                i18n.t('validator.inventories.deleted'),
                data
            )
        } catch (error) {
            return ResponseHelper.badRequest(
                response,
                i18n.t('validator.inventories.delete_failed')
            )
        }
    }
}