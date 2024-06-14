import jwt from 'jsonwebtoken'
import { SECRET_KEY } from "../config/config.js";

export const validarToken = (req, res, next) => {
    try {

        const { authorization } = req.headers

        if (!authorization) {
            return res.status(403).json({ message: 'Envia un token' })
        }

        const token = authorization.split(' ')[1];

        if (!token) {
            return res.status(403).json({ message: 'Token inválido' });
        }

        const decoded = jwt.verify(token, SECRET_KEY);
        req.userId = decoded.id;
        next()
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(400).json({ message: 'Token invalido' })
        }
        return res.status(500).json({ message: 'Error interno del servidor' })
    }
}