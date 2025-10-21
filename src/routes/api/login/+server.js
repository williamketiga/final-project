import { json } from "@sveltejs/kit";
import { pool } from "$lib/server/database.js";
import { generateToken } from "$lib/jwt/jwt.js";
import bcrypt from "bcryptjs";

export async function POST({request, cookies}) {
    try{
        const {email, password} = await request.json()

        // kalau kosong ini validasi
        if(!email || !password){
            return json(
                {
                    success:false,
                    message : "Email and password required!",
                },
                {
                    status:400
                }
            )
        
        }

        const [users] = await pool.execute(
            "SELECT * FROM user WHERE email = ?",
            [email]
        )

        const user = users[0]
        if(!user){
            return json(
                {
                    success : false,
                    message : 'Incorrect email!'
                },
                {
                    status : 401
                }
            )
        }
        // Password validation
        const isValidPassword = await bcrypt.compare(password,user.password)
        if(!isValidPassword){
            return json(
                {success : false, message : "Password wrong!"},
                {status : 401}
            )
        }

        // Generate token
        const token = generateToken({
            userId : user.id,
            email:user.email,
            username : user.username
        })

        // Set cookie
        cookies.set('token',token, {
            httpOnly : true,
            sameSite : 'strict',
            maxAge : 60 * 60 * 24 * 7, // 7 hari
            path : '/'
        })

        // return response
        return json({
            success: true,
            message :'Login Successfull!',
            data : {
                token,
                user: {
                    id : user.id,
                    username : user.username,
                    email : user.email
                }
            }
        })

    }catch(error){
        console.error('Login error!', error)
        return json(
            { success : false, message : 'Something went wrong'},
            { status : 500}
        )
    }
}