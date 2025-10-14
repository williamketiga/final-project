import { json } from "@sveltejs/kit";
import { pool } from "$lib/server/database";
import bcrypt from "bcryptjs"
export async function POST({request}){
    try{
        const { username, email, password } = await request.json()
        const hashedPassword = await bcrypt.hash(password, 12)
        const [result] = await pool.execute('INSERT INTO user (username, email, password, created_at) VALUES (? ,? ,? ,NOW())', [username, email, hashedPassword])
        console.log(result);
        if (result){
            return json({
                success : true,
                message : "Register successful",
                data : {
                    id : result.insertId
                }
            },
            {
                status : 200
            })
        }
    } catch(err) {
        console.log(err);
    }
}