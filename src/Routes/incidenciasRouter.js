import express from 'express'
import { fotoIncidencia } from '../multers/multer.js'
import { actualizarIncidencia, eliminarIncidencia, misIncidencias, registrarIncidencia } from '../controllers/controller.incidencias.js'
import { validarToken } from '../middleware/middleware.js'

const route = express.Router()

route.post('/subirInci', fotoIncidencia.single('imagenInci'), validarToken, registrarIncidencia)

route.get('/misIncidentes', validarToken, misIncidencias)

route.patch('/updateincidencia/:id', actualizarIncidencia)

route.delete('/deleteincidencia/:id', eliminarIncidencia)

export default route;