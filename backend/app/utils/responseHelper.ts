import type { HttpContext } from '@adonisjs/core/http'

export default class ResponseHelper {

    // Success Response (200 OK)
    public static success(
        response: HttpContext['response'],
        message: string,
        data: any = null,
    ) {
        return response.status(200).json({
            message,
            data,
            timestamp: new Date().toISOString(),
        })
    }

    // Created Response(201 created)
    public static created(
        response: HttpContext['response'],
        message: string,
        data: any = null) {
        return response.status(201).json({
            message,
            data,
            timestamp: new Date().toISOString(),
        })
    }

    // Bad Request (400)
    public static badRequest(
        response: HttpContext['response'],
        message: string
    ) {
        return response.status(400).json({
            message,
            timestamp: new Date().toISOString(),
        })
    }

    // Not found(404)
    public static notFound(
        response: HttpContext['response'],
        message: string = 'Resource not found',
    ) {
        return response.status(404).json({
            message,
            timestamp: new Date().toISOString(),
        })
    }
}