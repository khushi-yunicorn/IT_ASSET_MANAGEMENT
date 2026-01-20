import Inventory from "#models/inventory";

enum assetType {
  Laptop = 'Laptop',
  Monitor = 'Monitor',
  Mouse = "Mouse",
  Keyboard = "Keyboard",
  Charger = "Charger"
}

enum status {
  InStock = "InStock",
  OutOfStock = "OutOfStock"
}

interface CreateUserPayload {
  asset_name: string,
  asset_type?: assetType,
  serial_number: string,
  vendor_name: string,
  quantity: number,
  status: status
}

export class InventoryService {
  async register(payload: CreateUserPayload) {
    const data = await Inventory.create(payload)
    return data
  }

  async find(id: number) {
    const data = await Inventory.query().where('id', id)
    if (data) {
      return data
    }
  }

  async findAll() {
    const data = await Inventory.all()
    return data
  }

  async update(payload: any, id: number) {
    const inventory = await Inventory.find(id)
    if (inventory) {
      inventory.merge(payload)
      await inventory.save()
      return inventory
    }
  }

  async delete(id: number) {
    const data = await Inventory.find(id)
    if (data) {
      data.delete()
      return data
    }
  }
}