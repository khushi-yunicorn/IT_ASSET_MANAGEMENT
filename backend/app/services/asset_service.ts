import Asset from "#models/asset"
import Inventory from "#models/inventory";

enum assetType {
  Laptop = 'Laptop',
  Monitor = 'Monitor',
  Mouse = "Mouse",
  Keyboard = "Keyboard",
  Charger = "Charger"
}

enum assetStatus {
  Available = 'Available',
  Assigned = 'Assigned',
  Maintenance = 'Maintenance'
}

interface CreateUserPayload {
  asset_name: string,
  asset_type?: assetType,
  serial_number: string,
  status?: assetStatus,
  inventory_id: number,
  location: string
}

export class AssetService {
  async register(payload: CreateUserPayload) {
    const inventory = await Inventory.find(payload.inventory_id)
    const asset = Asset.create({
      asset_name: inventory?.asset_name,
      asset_type: inventory?.asset_type,
      serial_number: inventory?.serial_number,
      status: payload.status,
      inventory_id: payload.inventory_id,
      location: payload.location,
    })
    return asset
  }

  async find(id: number) {
    const asset = await Asset.query().where('id', id).preload('inventory')
    if (asset){
      return asset
    }
  }

  async findAll() {
    const assets = Asset.query().preload('inventory')
    return assets
  }

  async update(id: number, payload: {}) {
    const asset = await Asset.find(id)
    if (asset) {
      asset.merge(payload)
      await asset.save()
      return asset
    }
  }

  async delete(id: number) {
    const asset = await Asset.findOrFail(id)
    if (asset) {
      asset.delete()
      return asset
    }
  }
}