import AssetAssignment from "#models/asset_assignment"

enum assetAssignment {
  Active = "Active",
  Return = "Returned",
  Lost = "Lost"
}

export class AssetAssignmentService {
  async register(payload: {
    asset_id: number,
    user_id: number
    status: assetAssignment
  }) {
    const asset_assignment = AssetAssignment.create({
      asset_id: payload.asset_id,
      user_id: payload.user_id,
      status: payload.status
    })
    return asset_assignment
  }

  async find(id: number) {
    const fetch = await AssetAssignment.query().where('id', id).preload('asset').preload('user')
    if (fetch) {
      return fetch
    }
  }

  async getAll() {
    const data = await AssetAssignment.query()
                                      .select(['id','user_id','asset_id'])
                                      .preload('user',(userQuery)=>{
                                        userQuery.select(['id','name'])
                                      })
                                      .preload('asset')
                                      
                                    
    return data
  }

  async update(payload: {}, id: number) {
    const data = await AssetAssignment.find(id)
    if (data) {
      data.merge(payload)
      data?.save()
      return data
    }
  }

  async delete(id: number) {
    const data = await AssetAssignment.find(id)
    if (data) {
      data.delete()
      return data
    }
  }
}