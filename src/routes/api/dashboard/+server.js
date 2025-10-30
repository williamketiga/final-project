import { json } from "@sveltejs/kit";
import { pool } from "$lib/server/database";
import bcrypt from "bcryptjs"
import { generateToken } from "$lib/jwt/jwt";
export async function GET(){
    const result = "SELECT * FROM post"
    if (result) {
        return json({
            success : true,
            message : "Post retrieved",
            data : result
        })
    }
}