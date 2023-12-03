import 'dotenv/config'

import cors from 'cors'
import express from 'express'
import { routes } from './router'
import { ConfigBases } from './config'

// PORT = A porta que a plataforma(vercel) de deploy vai oferecer --> colocar ela so na parte de produção da plataforma
const PORT = ConfigBases.cupcakes.baseUrls.port
// PRODORDEV = seudominion.com --> colocar ela so na parte de produção da plataforma(vercel)
const PRODORDEV = ConfigBases.cupcakes.baseUrls

const app = express()

app.use(express.json())
app.use(
  cors({
    origin: PRODORDEV as unknown as string,
    optionsSuccessStatus: 200,
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS']
  })
)

app.use('/', routes)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))