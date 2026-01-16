import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'assets'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('asset_name').notNullable

      table.enum('asset_type', ['Laptop', 'Monitor', 'Mouse', 'Keyboard', 'Charger'])

      table.string('serial_number').notNullable

      table.enum('status', ['Available', 'Assigned', 'Maintenance']).defaultTo('Available')

      table.integer('inventory_id')
            .unsigned().notNullable()
            .references('id').inTable('inventories')
            .onDelete('CASCADE')

      table.string('location').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}