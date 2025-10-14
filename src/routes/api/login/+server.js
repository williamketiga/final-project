import { json } from "@sveltejs/kit";
<<<<<<< HEAD
import { pool } from "$lib/server/database";
import bcrypt from "bcryptjs"
import { generateToken } from "$lib/jwt/jwt";
export async function POST({request, cookies}) {
    try{
        const {email, password} = await request.json()
        if (!email || !password){
            return json(
                {
                    success : false,
                    message : "Email and password required"
                },
                {
                    status : 400
                }
            )
        }
=======
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

>>>>>>> 57ed4c61591ef4424b8f75cd8c983b8910547664
        const [users] = await pool.execute(
            "SELECT * FROM user WHERE email = ?",
            [email]
        )
<<<<<<< HEAD
        const user = users[0]
        if (!user) {
            return json(
                {
                    success : false,
                    message : "Incorrect email"
=======

        const user = users[0]
        if(!user){
            return json(
                {
                    success : false,
                    message : 'Incorrect email!'
>>>>>>> 57ed4c61591ef4424b8f75cd8c983b8910547664
                },
                {
                    status : 401
                }
            )
        }
<<<<<<< HEAD
        const isValidPassword = await bcrypt.compare(password, user.password)
        if (!isValidPassword) {
            return json(
                {
                    success : false,
                    message : "Incorrect password"
                },
                {
                    status : 401
                }
            )
        }
        const token = generateToken({
            userId : user.id,
            email : user.email,
            username : user.username
        })
        cookies.set('token', token, {
            httpOnly : true,
            sameSite : 'strict',
            maxAge : 60 * 60 * 24 * 7,
            path : '/'
        })
        return json(
            {
                success : true,
                message : "Login successful",
                data : {
                    token,
                    user : {
                        id : user.id,
                        username : user.username,
                        email : user.email
                    }
                }
            }
        )
    } catch(err) {
        console.error(err);
        return json(
            {
                success : false,
                message : "Error"
            },
            {
                status : 500
            }
=======
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
>>>>>>> 57ed4c61591ef4424b8f75cd8c983b8910547664
        )
    }
}