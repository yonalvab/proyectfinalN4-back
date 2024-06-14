/* import { SECRET_KEY } from "../config/config.js"; */
import { pool } from '../config/db.js';
import dayjs from 'dayjs';

export const registrarIncidencia = async (req, res) => {
    const { descripcion, lugar } = req.body
    let { estado } = req.body

    const imagenInci = req.file ? req.file.filename : null
    const usuarioId = req.userId;

    try {
        if (!usuarioId || !descripcion || !lugar) {
            return res.status(400).json({ message: 'Falta informacion' })
        }

        if (!estado) {
            estado = 'no abierto'
        }

        const fechaFormateada = dayjs().format('YYYY-MM-DD HH:mm:ss');
        console.log(fechaFormateada);

        const dataInci = {
            usuario_id: usuarioId,
            descripcion,
            lugar,
            estado,
            fecha_reporte: fechaFormateada,
            imagen: imagenInci
        }

        const [result] = await pool.query('INSERT INTO incidencias (usuario_id, descripcion, lugar, estado, fecha_reporte, imagen) VALUES (?, ?, ?, ?, ?, ?)', [usuarioId, descripcion, lugar, estado, fechaFormateada, imagenInci])


        return res.status(201).json({ incidencia: dataInci, id: result.insertId });
    } catch (error) {
        console.log('Error', error)
        return res.status(500).json({ message: 'Error Interno' })
    }
}

export const misIncidencias = async (req, res) => {
    try {
        const userId = req.userId;

        const [rows] = await pool.query(`
            SELECT 
                incidencias.id, 
                usuarios.nombre AS usuario_nombre, 
                incidencias.descripcion, 
                incidencias.lugar, 
                incidencias.estado, 
                incidencias.fecha_reporte, 
                incidencias.imagen 
            FROM 
                incidencias 
            JOIN 
                usuarios ON incidencias.usuario_id = usuarios.id 
            WHERE 
                incidencias.usuario_id = ?`,
            [userId]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'No se encontraron incidencias para este usuario' });
        }
        return res.json(rows);
    } catch (error) {
        console.error('Error al obtener la información:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
}

export const actualizarIncidencia = async (req, res) => {
    const { id } = req.params;
    const { descripcion, lugar, estado, fecha_reporte, imagen } = req.body;

    try {

        const [existingIncidencia] = await pool.query('SELECT * FROM incidencias WHERE id = ?', [id]);
        if (existingIncidencia.length === 0) {
            return res.status(404).json({ message: 'Incidencia no encontrada' });
        }

        let query = 'UPDATE incidencias SET';
        const fields = [];
        const params = [];

        if (descripcion) {
            fields.push('descripcion = ?');
            params.push(descripcion);
        }
        if (lugar) {
            fields.push('lugar = ?');
            params.push(lugar);
        }
        if (estado) {
            fields.push('estado = ?');
            params.push(estado);
        }
        if (fecha_reporte) {

            const fechaFormateada = dayjs(fecha_reporte).format('YYYY-MM-DD HH:mm:ss');
            fields.push('fecha_reporte = ?');
            params.push(fechaFormateada);
        }
        if (imagen) {
            fields.push('imagen = ?');
            params.push(imagen);
        }

        if (fields.length === 0) {
            return res.status(400).json({ message: 'No se proporcionaron campos para actualizar' });
        }

        query += ' ' + fields.join(', ') + ' WHERE id = ?';
        params.push(id);

        await pool.query(query, params);

        return res.status(200).json({ message: 'Incidencia actualizada correctamente' });
    } catch (error) {
        console.error('Error al actualizar la incidencia:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const eliminarIncidencia = async (req, res) => {
    const { id } = req.params;

    try {
        // Verificar si la incidencia existe
        const [existingIncidencia] = await pool.query('SELECT * FROM incidencias WHERE id = ?', [id]);
        if (existingIncidencia.length === 0) {
            return res.status(404).json({ message: 'Incidencia no encontrada' });
        }

        // Ejecutar la consulta para eliminar la incidencia
        await pool.query('DELETE FROM incidencias WHERE id = ?', [id]);

        return res.status(200).json({ message: 'Incidencia eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar la incidencia:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};
