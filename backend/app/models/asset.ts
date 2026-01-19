import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import AssetAssignment from './asset_assignment.js'
import type{ BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Inventory from './inventory.js'

export default class Asset extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare asset_name: string

  @column() 
  declare asset_type: 'Laptop' | 'Monitor' | 'Mouse' | 'Keyboard' | 'Charger' | null

  @column()
  declare serial_number: string

  @column()
  declare status: 'Available' | 'Assigned' | 'Maintenance'

  @column()
  declare inventory_id:number | null

  @column()
  declare location:string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(()=>AssetAssignment)
  declare asset_assignments: HasMany<typeof AssetAssignment>

  @belongsTo(()=>Inventory, {
    foreignKey: 'inventory_id'
  })
  declare inventory: BelongsTo<typeof Inventory>
}