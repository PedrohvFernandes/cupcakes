export default {
  cupcakes: {
    baseUrls: {
      frontend:  process.env.PRODORDEV ?? 'http://127.0.0.1:5173',
      port: process.env.PORT ?? 3333
    }
  }
}