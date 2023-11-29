import { fastify } from 'fastify'
import { fastifyCors } from '@fastify/cors'

const app = fastify()

// PORT = A porta que a plataforma(vercel) de deploy vai oferecer --> colocar ela so na parte de produção da plataforma
const PORT = process.env.PORT ?? 3333
// PRODORDEV = seudominion.com --> colocar ela so na parte de produção da plataforma(vercel)
const PRODORDEV = process.env.PRODORDEV ?? 'http://localhost:3000'

app.register(fastifyCors, {
  origin: PRODORDEV
})

app
  .listen({
    port: PORT as number,
  })
  .then(address => {
    console.log(`server listening on ${address}`)
  })
  .catch(err => {
    console.log(err)
  })
