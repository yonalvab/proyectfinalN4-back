import express from 'express'
import cors from 'cors'
import { FRONT_URL, PORT } from './src/config/config.js'
import { allUsuarios, getMyInfo, registerUser, validarUser } from './src/controllers/routers.controller.js'
import { fotoPerfil } from './src/multers/multer.js'
import incidenciasRoutes from './src/Routes/incidenciasRouter.js'
import { validarToken } from './src/middleware/middleware.js'

const app = express()
app.use(cors({
    origin: FRONT_URL,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.post('/', validarUser)

app.post('/register', fotoPerfil.single('imagen'), registerUser)

app.get('/bandejadmin', allUsuarios)

app.get('/myinfo', validarToken, getMyInfo)

//aqui pondre para crear y los filtrados, crud
app.use('/api/incidencias', incidenciasRoutes)


app.listen(PORT, () => console.log(`server running in http://localhost:${PORT}`))