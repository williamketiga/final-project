import { json } from "@sveltejs/kit";

export async function POST({request, cookies}) {
    try{
        const {email, password} = await request.json()
    }catch(error){

    }
}