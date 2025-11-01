import { json } from "@sveltejs/kit";
import { pool } from "$lib/server/database";
import bcrypt from "bcryptjs"
export async function GET(){
    try{
        const [result] = await pool.execute(
                'SELECT * FROM post'
            )
        if (result) {
            return json({
                success : true,
                message : "Post unretrieved",
                data : result
            })
        }
        if (result) {
            return json({
                success : true,
                message : "Post retrieved",
                data : result
            })
        }
    } catch(e) {
        console.log(e)
    }
}