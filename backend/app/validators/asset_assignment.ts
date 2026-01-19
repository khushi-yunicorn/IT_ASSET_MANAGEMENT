import vine from '@vinejs/vine'

export const AssetAssignmentCreateValidator = vine.compile(
    vine.object({
        asset_id: vine.number().positive(),
        user_id: vine.number().positive(),
        status: vine.enum(['Active','Returned','Lost']),
    })
)

export const AssetAssignmentUpdateValidator = vine.compile(
    vine.object({
        asset_id: vine.number().positive().optional(),
        user_id: vine.number().positive().optional(),
        status: vine.enum(['Active','Returned','Lost']).optional(),
    })
)