import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import AssetAssignment from './asset_assignment.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class User extends BaseModel {
  static findAll() {
    throw new Error("Method not implemented.")
  }
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare email: string

  @column()
  declare contact_no: number

  @column()
  declare emp_code: number
  
  @column()
  declare gender: 'male' | 'female' | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column.dateTime()
  declare deletedAt: DateTime

  @hasMany(()=>AssetAssignment)
  declare asset_assignments: HasMany<typeof AssetAssignment>
}