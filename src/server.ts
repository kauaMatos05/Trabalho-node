import 'reflect-metadata'
import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import { AppDataSource } from './data-source'
import { userRoutes } from './routes/userRoutes'

const app = express()
app.use(express.json())

app.use('/users', userRoutes)

const PORT = process.env.PORT || 3000

AppDataSource.initialize()
  .then(() => {
    console.log('Banco de dados conectado!')
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`)
    })
  })
  .catch((err) => {
    console.error('Erro ao conectar no banco:', err)
  })