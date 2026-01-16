import User from "#models/user"

export class UserService {
  async create( payload: { 
    name: string
    email: string
    contact_no: number
    emp_code: number
  })
  {
    const user = User.create(payload)
      return user
  }

  async find(id: number){
    const user = await User.find(id)

    return user
  }

  async findAll(){
    const users = await User.all()
    return users
  }

  async update( id: number, payload:{}){
    const user = await User.find(id)

        if(!user){
            return {
                message: "User doesn't exist"
            }
        }
        user.merge(payload)
        console.log(user);
        await user.save()

        return user
  }

  async delete( id: number){

    const user = await User.findOrFail(id)
    console.log(user);

    user?.delete()

    return user

  }
}