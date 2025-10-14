import { json } from "@sveltejs/kit";
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
        const [users] = await pool.execute(
            "SELECT * FROM user WHERE email = ?",
            [email]
        )
        const user = users[0]
        if (!user) {
            return json(
                {
                    success : false,
                    message : "Incorrect email"
                },
                {
                    status : 401
                }
            )
        }
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
        )
    }
}