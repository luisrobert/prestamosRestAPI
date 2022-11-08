import { pool } from "../db.js";
export const ping = async (re,res)=>{
    const result = await pool.query('select * from cliente')
    res.json(result[0])
}