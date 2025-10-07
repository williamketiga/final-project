import {
    writable
} from "svelte/store";
import {
    browser
} from "$app/environment";

const getInitialAuthState = () => {
    if (!browser) return {
        user: null,
        token: null,
        isAuthenticated: false
    }

    const token = localStorage.getItem('token')
    const userStr = localStorage.getItem('user')

    return {
        token,
        user: userStr ? JSON.parse(userStr) : null,
        isAuthenticated: !!token
    }
}

export const auth = writable(getInitialAuthState())

// call api login
export const login = async (email, password) => {
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })

        const result = await response.json()

        if (result.success) {
            auth.set({
                token: result.data.token,
                user: result.data.user,
                isAuthenticated: true
            })

            if (browser) {
                localStorage.setItem('token', result.data.token)
                localStorage.setItem('user', JSON.stringify(result.data.user))
            }

            return {
                success: true,
                data: result.data
            }
        } else {
            return {
                success: false,
                message: result.message
            }
        }
    } catch (error) {
        console.error("Login error ", error)
        return {success : false , message : "Something went wrong!"}
    }
}