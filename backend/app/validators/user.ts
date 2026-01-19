import vine from '@vinejs/vine'

export const UserCreateValidator = vine.compile(
    vine.object({
        name: vine.string().minLength(3),
        email: vine.string().unique({
            table: 'users',
            column: 'email'
        }),
        contact_no: vine.number().positive(),
        emp_code: vine.number().positive(),
        gender: vine.enum(['male', 'female']).optional()
    })
)

export const UserUpdateValidator = vine.compile(
    vine.object({
        name: vine.string().minLength(3).optional(),
        email: vine.string().unique({
            table: 'users',
            column: 'email'
        }).optional(),
        contact_no: vine.number().optional(),
        emp_code: vine.number().positive().optional(),
        gender: vine.enum(['male', 'female']).optional()
    })
)