import vine from '@vinejs/vine'

export const InventoryCreateValidator = vine.compile(
    vine.object({
        asset_name: vine.string().minLength(3),
        asset_type: vine.enum(['Laptop', 'Monitor', 'Mouse', 'Keyboard','Charger']),
        serial_number: vine.string().minLength(6),
        vendor_name: vine.string().trim(),
        quantity: vine.number().positive(),
        status: vine.enum(['InStock','OutOfStock'])
    })
)

export const InventoryUpdateValidator = vine.compile(
    vine.object({
        asset_name: vine.string().minLength(3).optional(),
        asset_type: vine.enum(['Laptop', 'Monitor', 'Mouse', 'Keyboard','Charger']).optional(),
        serial_number: vine.string().minLength(6).optional(),
        vendor_name: vine.string().trim().optional(),
        quantity: vine.number().positive().optional(),
        status: vine.enum(['InStock','OutOfStock']).optional()
    })
)