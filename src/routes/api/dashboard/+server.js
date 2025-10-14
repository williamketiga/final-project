import { json } from "@sveltejs/kit";
<<<<<<< HEAD
import { pool } from "$lib/server/database";
import bcrypt from "bcryptjs"
import { generateToken } from "$lib/jwt/jwt";
export async function GET(){
    const result = "SELECT * FROM post"
    if (result) {
        return json({
            success : true,
            message : "Post retrieved",
=======
import { pool } from "$lib/server/database.js";
import { generateToken } from "$lib/jwt/jwt.js";
import bcrypt from "bcryptjs";


export async function GET(){
    const result = "SELECT * FROM post"

    if(result){
        return json({
            success : true,
            message : "Post retrieved!",
>>>>>>> 57ed4c61591ef4424b8f75cd8c983b8910547664
            data : result
        })
    }
}