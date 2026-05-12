import { Router } from 'express'
import { UserController } from '../controllers/UserController'

export const userRoutes = Router()

userRoutes.get('/', UserController.findAll)
userRoutes.get('/:id', UserController.findById)
userRoutes.post('/', UserController.create)
userRoutes.patch('/:id', UserController.update)
userRoutes.delete('/:id', UserController.delete)