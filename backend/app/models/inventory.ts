import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Asset from './asset.js'
import type{ HasMany } from '@adonisjs/lucid/types/relations'

export default class Inventory extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare asset_name: string

  @column()
  declare asset_type: 'Laptop' | 'Monitor' | 'Mouse' | 'Keyboard' | 'Charger'

  @column()
  declare serial_number: string

  @column()
  declare vendor_name: string

  @column()
  declare quantity: number

  @column()
  declare status: 'InStock' | 'OutOfStock'
 
  @column.dateTime({ autoCreate: true })
  declare purchase_date: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(()=>Asset)
  declare assets: HasMany<typeof Asset>
}