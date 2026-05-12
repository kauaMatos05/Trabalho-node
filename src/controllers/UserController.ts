import { Request, Response } from 'express'
import { UserRepository } from '../repositories/UserRepository'
import { createUserSchema, updateUserSchema } from '../schemas/userSchema'

export const UserController = {
  async findAll(req: Request, res: Response) {
    const users = await UserRepository.findAll()
    const usersWithoutPassword = users.map(({ senha, ...user }) => user)
    return res.json(usersWithoutPassword)
  },

  async findById(req: Request, res: Response) {
    const id = req.params['id'] as string
    const user = await UserRepository.findById(id)

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' })
    }

    const { senha, ...userWithoutPassword } = user
    return res.json(userWithoutPassword)
  },

  async create(req: Request, res: Response) {
    const parsed = createUserSchema.safeParse(req.body)

    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.flatten() })
    }

    const emailExists = await UserRepository.findByEmail(parsed.data.email)

    if (emailExists) {
      return res.status(400).json({ message: 'E-mail já cadastrado' })
    }

    const user = await UserRepository.create(parsed.data)
    const { senha, ...userWithoutPassword } = user
    return res.status(201).json(userWithoutPassword)
  },

  async update(req: Request, res: Response) {
    const id = req.params['id'] as string
    const parsed = updateUserSchema.safeParse(req.body)

    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.flatten() })
    }

    const userExists = await UserRepository.findById(id)

    if (!userExists) {
      return res.status(404).json({ message: 'Usuário não encontrado' })
    }

    if (parsed.data.email) {
      const emailExists = await UserRepository.findByEmail(parsed.data.email)
      if (emailExists && emailExists.id !== id) {
        return res.status(400).json({ message: 'E-mail já cadastrado' })
      }
    }

    const user = await UserRepository.update(id, parsed.data)
    const { senha, ...userWithoutPassword } = user!
    return res.json(userWithoutPassword)
  },

  async delete(req: Request, res: Response) {
    const id = req.params['id'] as string
    const userExists = await UserRepository.findById(id)

    if (!userExists) {
      return res.status(404).json({ message: 'Usuário não encontrado' })
    }

    await UserRepository.delete(id)
    return res.status(204).send()
  },
}