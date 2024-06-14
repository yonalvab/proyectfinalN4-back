import { config } from "dotenv"

config()

export const DB_HOST = process.env.DB_HOST || 'localhost'
export const DB_USER = process.env.DB_USER || 'root'
export const DB_PASSWORD = process.env.DB_PASSWORD || ''
export const DB_DATABASE = process.env.DB_DATABASE || 'proyectfinal4'
export const DB_PORT = process.env.DB_PORT || 3306
export const PORT = process.env.PORT || 3000
export const SECRET_KEY = process.env.SECRET_KEY
export const FRONT_URL = process.env.FRONT_URL || '*'