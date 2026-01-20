import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'asset_assignments'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('asset_id')
            .unsigned().notNullable()
            .references('id').inTable('assets')
            .onDelete('CASCADE')
      table.integer('user_id')
            .unsigned().notNullable()
            .references('id').inTable('users')
            .onDelete('CASCADE').index()
      table.enum('status', ['Active', 'Returned', 'Lost']).defaultTo('Active')
      table.timestamp('assigned_date')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}