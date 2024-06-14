import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from "../config/config.js";
import { pool } from '../config/db.js';


export const validarUser = async (req, res) => {
    const { email, password } = req.body

    console.log(req.body)

    if (!email || !password) {
        return res.status(400).json({ message: 'Email y contraseña son requeridos' });
    }

    try {
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ? ', [email])
        console.log('Datos recibidos:', req.body);

        if (rows.length === 0) {
            return res.status(400).json({ message: 'No hay una cuenta relacionada con este email o contraseña' });
        }

        const contrasenahasheada = rows[0].password
        const isPasswordValid = await bcrypt.compare(password, contrasenahasheada);
        if (isPasswordValid) {
            delete rows[0].password
        }
        const token = jwt.sign({ id: rows[0].id }, SECRET_KEY, { expiresIn: '1h' });

        return res.json({ token, data: rows[0] });
    } catch (error) {
        return res.status(500).json({ message: 'Error en el servidor' });
    }
}

export const registerUser = async (req, res) => {
    const { nombre, email, password } = req.body;
    const imagen = req.file ? req.file.filename : null;

    if (!nombre || !email || !password) {
        return res.status(400).json({
            message: 'Rellena todos los campos obligatorios'
        });
    }

    if (!email.includes('@')) {
        return res.status(400).json({
            message: 'Este email no es válido'
        });
    }

    if (password.length < 8) {
        return res.status(400).json({
            message: 'Se requieren mínimo 8 caracteres'
        });
    }

    const tieneUpperCase = /[A-Z]/.test(password);
    if (!tieneUpperCase) {
        return res.status(400).json({
            message: 'La contraseña debe contener al menos una letra mayúscula'
        });
    }

    try {
        const [existingUser] = await pool.query('SELECT id FROM usuarios WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({
                message: 'El email ya está registrado'
            });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const [result] = await pool.query(
            'INSERT INTO usuarios (nombre, email, password, imagen) VALUES (?, ?, ?, ?)',
            [nombre, email, hashedPassword, imagen]
        );

        res.status(201).json({
            id: result.insertId,
            nombre,
            email,
            imagen
        });
    } catch (error) {
        console.error('Error al crear el usuario', error);
        return res.status(500).json({
            message: 'Algo salió mal'
        });
    }
};

export const allUsuarios = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT incidencias.id, usuarios.nombre AS usuario_nombre, incidencias.descripcion, incidencias.lugar, incidencias.estado, incidencias.fecha_reporte, incidencias.imagen FROM incidencias JOIN usuarios ON incidencias.usuario_id = usuarios.id')
        res.json(rows)
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
}

export const getMyInfo = async (req, res) => {
    try {
        const userId = req.userId;

        // Consultar la base de datos para obtener la información del usuario
        const [usuario] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [userId]);

        if (usuario.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        return res.json(usuario[0]);
    } catch (error) {
        console.error('Error al obtener la información del usuario:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};
