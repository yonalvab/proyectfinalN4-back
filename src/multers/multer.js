import multer from "multer";

const storagePhotoPer = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'perfilPhoto/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})


export const fotoPerfil = multer({
    storage: storagePhotoPer,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpeg') {
            cb(null, true)
        } else {
            cb(new Error('solo se puede el formato jpg/jpeg de imagen'))
        }
    }
})

const storagePhotoInci = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'incidenciasPhoto/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

export const fotoIncidencia = multer({
    storage: storagePhotoInci,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpeg') {
            cb(null, true)
        } else {
            cb(new Error('solo se puede el formato jpg/jpeg de imagen'))
        }
    }
})