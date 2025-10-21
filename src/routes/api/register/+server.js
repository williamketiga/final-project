import { json } from "@sveltejs/kit";
import { pool } from "$lib/server/database";
import bcrypt from "bcryptjs";


export async function POST({request}){

    try{
        console.log("POST api/register");
        const {username,email,password} = await request.json()

        const hashedPassword = await bcrypt.hash(password,12)
        const [result] = await pool.execute(
            'INSERT INTO user (username, email, password, created_at) VALUES (? , ?, ?,NOW())', [username,email, hashedPassword]
        )

        return json({
            success : true,
            message : 'Register Successfull!',
            data : {
                id: result.insertId
            }
        })
        
    }catch(e){
        console.error(e)
    }
}