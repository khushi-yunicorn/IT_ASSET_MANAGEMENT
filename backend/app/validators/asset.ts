import vine from '@vinejs/vine'

export const AssetCreateValidator = vine.compile(
    vine.object({
        asset_name: vine.string().minLength(3),
        asset_type: vine.enum(['Laptop', 'Monitor', 'Mouse', 'Keyboard','Charger']),
        serial_number: vine.string().minLength(6),
        status: vine.enum(['Available', 'Assigned','Maintenance']),
        inventory_id: vine.number().positive(),
        location: vine.string().trim()
    })
)

export const AssetUpdateValidator = vine.compile(
    vine.object({
        asset_name: vine.string().minLength(3).optional(),
        asset_type: vine.enum(['Laptop', 'Monitor', 'Mouse', 'Keyboard','Charger']).optional(),
        serial_number: vine.string().minLength(6).optional(),
        status: vine.enum(['Available', 'Assigned','Maintenance']).optional(),
        inventory_id: vine.number().positive().optional(),
        location: vine.string().trim().optional()
    })
)