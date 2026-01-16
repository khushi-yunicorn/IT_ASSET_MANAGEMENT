import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary
      table.string('name').notNullable()
      table.string('email').notNullable().unique()
      table.bigInteger('contact_no').notNullable()
      table.integer('emp_code').notNullable().unique()

      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.timestamp('deleted_at').defaultTo(null)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}