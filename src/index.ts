import app from './app'
import http from 'http'
import { connectDB } from './config'
import { envs } from './config'

// Puerto del server desde el .env.dev
const PORT: string = process.env.PORT || '8000'

const main = async () => {
    // console.log('ESTO ES LO QUE ME LLEGA', envs.JWT_SEED)
    // CREACIÓN DEL SERVER PASANDOLE COMO PARÁMETRO EL APP 
    const server = http.createServer(app)

    // Conexíon a la base de datos
    await connectDB()


    // Corriendo el servidor
    server.listen(PORT, () => {
        console.log(`Servidor corriendo en http:localhost:${PORT}`)
    })
}

// Ejecutando la función main
main()
