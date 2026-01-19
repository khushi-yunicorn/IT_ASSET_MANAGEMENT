import User from "#models/user"

enum gender {
  male = 'male',
  female = 'female'
}

export class UserService {
  async create(payload: {
    name: string
    email: string
    contact_no: number
    emp_code: number
    gender: gender
  }) {
    const user = User.create(payload)
    console.log(user);
    return user
  }

  async find(id: number) {
    const user = await User.find(id)
    return user
  }

  async findAll() {
    const users = await User.all()
    return users
  }

  async update(payload: any, id: number) {
    const user = await User.find(id)
    if (!user) {
      return {
        message: "User doesn't exist"
      }
    }
    user.merge(payload)
    await user.save()
    return user
  }

  async delete(id: number) {
    const user = await User.findOrFail(id)
    user?.delete()
    return user
  }
}