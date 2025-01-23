import express, { Application } from 'express'
import router from './routes'
import { errorHandler } from './middlewares'
import cookieparser from "cookie-parser";
import cors from 'cors'
import { corsOptions } from './config/cors';

const app: Application = express()
app.use(cors(corsOptions))
app.use(cookieparser())

app.use(express.json())

app.use('/api', router)

app.use(errorHandler)

app.get('/prueba', (req, res) => {
    res.send('HOLA MUNDO CON NODE Y EXPRESS')
})

export default app

