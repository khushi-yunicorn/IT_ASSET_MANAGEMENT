import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'inventories'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('asset_name').notNullable()

      table.enum('asset_type', ['Laptop',  'Monitor', 'Mouse', 'Keyboard', 'Charger', null]).defaultTo(null)

      table.string('serial_number').notNullable()
      table.string('vendor_name').notNullable()

      table.integer('quantity').defaultTo(1)

      table.enum('status', ['InStock', 'OutOfStock']).defaultTo('InStock')

      table.timestamp('purchase_date')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}