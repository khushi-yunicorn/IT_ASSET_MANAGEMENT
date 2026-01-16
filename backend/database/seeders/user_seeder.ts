import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Inventory from '#models/inventory'
export default class extends BaseSeeder {
  async run() {
    const inventories = [
      {
        asset_name: 'LOGITECH',
        asset_type: 'Keyboard',
        serial_number: 'LG-KB-1001',
        vendor_name: 'Peripheral Store',
        quantity: 15
      },
      {
        asset_name: 'DELL',
        asset_type: 'Keyboard',
        serial_number: 'DL-KB-1002',
        vendor_name: 'Dell Accessories',
        quantity: 20
      },
      {
        asset_name: 'HP',
        asset_type: 'Keyboard',
        serial_number: 'HP-KB-1003',
        vendor_name: 'HP Store',
        quantity: 10
      },
      {
        asset_name: 'LENOVO',
        asset_type: 'Keyboard',
        serial_number: 'LN-KB-1004',
        vendor_name: 'Lenovo Hub',
        quantity: 12
      },
      {
        asset_name: 'LOGITECH',
        asset_type: 'Mouse',
        serial_number: 'LG-MS-2001',
        vendor_name: 'Peripheral Store',
        quantity: 30
      },
      {
        asset_name: 'DELL',
        asset_type: 'Mouse',
        serial_number: 'DL-MS-2002',
        vendor_name: 'Dell Accessories',
        quantity: 25
      },
      {
        asset_name: 'HP',
        asset_type: 'Mouse',
        serial_number: 'HP-MS-2003',
        vendor_name: 'HP Store',
        quantity: 18
      },
      {
        asset_name: 'LENOVO',
        asset_type: 'Mouse',
        serial_number: 'LN-MS-2004',
        vendor_name: 'Lenovo Hub',
        quantity: 22
      },
      {
        asset_name: 'DELL',
        asset_type: 'Laptop',
        serial_number: 'DL-LP-3001',
        vendor_name: 'Dell Official',
        quantity: 5
      },
      {
        asset_name: 'HP',
        asset_type: 'Laptop',
        serial_number: 'HP-LP-3002',
        vendor_name: 'HP Official',
        quantity: 4
      },
      {
        asset_name: 'LENOVO',
        asset_type: 'Laptop',
        serial_number: 'LN-LP-3003',
        vendor_name: 'Lenovo Official',
        quantity: 6
      },
      {
        asset_name: 'APPLE',
        asset_type: 'Laptop',
        serial_number: 'AP-LP-3004',
        vendor_name: 'Apple Store',
        quantity: 3
      },
      {
        asset_name: 'DELL',
        asset_type: 'Moniter',
        serial_number: 'DL-MN-4001',
        vendor_name: 'Display Zone',
        quantity: 8
      },
      {
        asset_name: 'SAMSUNG',
        asset_type: 'Moniter',
        serial_number: 'SM-MN-4002',
        vendor_name: 'Samsung Display',
        quantity: 10
      },
      {
        asset_name: 'LG',
        asset_type: 'Moniter',
        serial_number: 'LG-MN-4003',
        vendor_name: 'LG Display',
        quantity: 7
      },
      {
        asset_name: 'ACER',
        asset_type: 'Moniter',
        serial_number: 'AC-MN-4004',
        vendor_name: 'Acer Displays',
        quantity: 6
      },
      {
        asset_name: 'DELL',
        asset_type: 'Charger',
        serial_number: 'DL-CH-5001',
        vendor_name: 'Dell Accessories',
        quantity: 20,
      },
      {
        asset_name: 'HP',
        asset_type: 'Charger',
        serial_number: 'HP-CH-5002',
        vendor_name: 'HP Store',
        quantity: 15,
      },
      {
        asset_name: 'LENOVO',
        asset_type: 'Charger',
        serial_number: 'LN-CH-5003',
        vendor_name: 'Lenovo Hub',
        quantity: 18,
      },
      {
        asset_name: 'GENERIC',
        asset_type: 'Charger',
        serial_number: 'GN-CH-5004',
        vendor_name: 'Local Vendor',
        quantity: 25
      },
    ]

    for (const item of inventories) {
      const exist = await Inventory.query()
        .where('asset_name', item.asset_name)
        .where('asset_type', item.asset_type)
        .where('serial_number', item.serial_number)
        .where('vendor_name', item.vendor_name)
        .where('quantity', item.quantity)
        .first()
        if (!exist) {
        await Inventory.create( item )
      }
    }
  }
}