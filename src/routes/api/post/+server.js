import { json } from "@sveltejs/kit";
import { pool } from "$lib/server/database";
import bcrypt from "bcryptjs"
export async function GET(request){
    try{
        const {caption,image_url} = await request.json()
        const [result] = await pool.execute(
                'INSERT INTO post (caption, user_id, image_url) VALUES (?, ?, ?)', [caption, user.id, image_url]
            )
        if (!result) {
            return json({
                success : true,
                message : "Post uploaded",
                data : result
            })
        }
        if (result) {
            return json({
                success : true,
                message : "Post failed",
                data : result
            })
        }
    } catch (e) {
        console.log(e)
    }
}