import { AppDataSource } from '../data-source'
import { User } from '../entities/User'
import { CreateUserDTO, UpdateUserDTO } from '../schemas/userSchema'

const userRepository = AppDataSource.getRepository(User)

export const UserRepository = {
  async findAll() {
    return userRepository.find()
  },

  async findById(id: string) {
    return userRepository.findOneBy({ id })
  },

  async findByEmail(email: string) {
    return userRepository.findOneBy({ email })
  },

  async create(data: CreateUserDTO) {
    const user = userRepository.create(data)
    return userRepository.save(user)
  },

  async update(id: string, data: UpdateUserDTO) {
    await userRepository.update(id, data as any)
    return userRepository.findOneBy({ id })
  },
  
  async delete(id: string) {
    return userRepository.delete(id)
  },
}