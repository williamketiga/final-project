import { writable } from "svelte/store";
import { browser } from "$app/environment";
const getInitialAuthState = () => {
    if (!browser) return{
        user : null,
        token : null,
        isAuthenticated : false
    }
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')
    return{
        token,
        user : userStr ? JSON.parse(userStr) : null,
        isAuthenticated : !!token
    }
}
export const auth = writable(getInitialAuthState())
export const login = async(email, password) => {
    try{
        const response = await fetch('/api/login', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({email, password})
        })
        const result = await response.json()
        if (result.success) {
            auth.set({
                user : result.data.user,
                token : result.data.token,
                isAuthenticated : true
            })
            if (browser) {
                localStorage.setItem('token', result.data.token)
                localStorage.setItem('user', JSON.stringify(result.data.user))
            }
            return{
                success : true,
                data : result.data
            }
        } else {
            return{
                success : false,
                message : result.message
            }
        }
    } catch(err) {
        console.log(err);
        return{
            success : false,
            message : "Error"
        }
    }
}