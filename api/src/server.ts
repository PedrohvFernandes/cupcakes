import 'dotenv/config'

import cors from 'cors'
import express from 'express'
import { routes } from './router'

// PORT = A porta que a plataforma(vercel) de deploy vai oferecer --> colocar ela so na parte de produção da plataforma
const PORT = process.env.PORT ?? 3333
// PRODORDEV = seudominion.com --> colocar ela so na parte de produção da plataforma(vercel)
const PRODORDEV = process.env.PRODORDEV ?? 'http://localhost:3000'

const app = express()

app.use(express.json())
app.use(
  cors({
    origin: PRODORDEV,
    optionsSuccessStatus: 200,
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS']
  })
)

app.use('/', routes)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))