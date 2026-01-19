import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Asset from './asset.js'


export default class AssetAssignment extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare asset_id: number
 
  @column()
  declare user_id: number

  @column()
  declare return_date: DateTime

  @column()
  declare status: 'Active' | 'Returned' | 'Lost'

  @column.dateTime({ autoCreate: true })
  declare assigned_date: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User, {
    foreignKey: 'user_id',
  })
  declare user: BelongsTo<typeof User>

  @belongsTo(()=>Asset, {
    foreignKey: 'asset_id'
  })
  declare asset: BelongsTo<typeof Asset>
}