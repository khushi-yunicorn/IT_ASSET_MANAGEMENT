import vine from '@vinejs/vine'

export const UserValidator = vine.compile(
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