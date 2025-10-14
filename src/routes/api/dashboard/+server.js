import { json } from "@sveltejs/kit";
import { pool } from "$lib/server/database.js";
import { generateToken } from "$lib/jwt/jwt.js";
import bcrypt from "bcryptjs";


export async function GET(){
    const result = "SELECT * FROM post"

    if(result){
        return json({
            success : true,
            message : "Post retrieved!",
            data : result
        })
    }
}