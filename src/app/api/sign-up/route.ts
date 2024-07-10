import dbConnect from "@/lib/dbConnect"
import UserModel from "@/model/User"
import bcrypt from 'bcryptjs'

import {sendverificationEmail} from "@/helpers/sendVerificationEmail"

export async function POST (request: Request){
    await dbConnect()

    try {

        const {username, email, password }= await request.json()

        const existingUserVerifiedByUsername =   await  UserModel.findOne({
                username,
                isverified:true
        })

        if (existingUserVerifiedByUsername){
                return Response.json({
                        success :false ,
                        message : "Username is already taken"
                },{status:400})
        }

        const existingUserByEmail = await UserModel.findOne({email})

        if (existingUserByEmail){
            true // todo back here 
        }
        else {
           const hashedPassword =  await bcrypt.hash(password,10)
            const expiryDate = new Date()
           expiryDate.setHours(expiryDate.getHours()+1)
        }

        new UserModel({
            username,
            email,
         

        })
        
    } catch (error) {
        console.error("error registering user",error)    
        return Response.json({
            success :false ,
            message:"error registering user"
        },
        {
            status :500
        }
    
    )
    }
}