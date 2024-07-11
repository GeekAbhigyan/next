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

        const verifyCode = Math.floor(100000 + Math.random()*90000 ).toString()

        if (existingUserByEmail){
            if (existingUserByEmail.isverified){
                return Response.json(
                    {
                      success: false,
                      message:"email already exist with this user",
                    },
                    { status: 400 }
                  );
             }
            else{
                const hashedPassword = bcrypt.hash(password,10)
                    existingUserByEmail.password = hashedPassword;
                    existingUserByEmail.verifycode = verifyCode;
                    existingUserByEmail.verifycodeExpiry = new Date(Date.now()+ 3600000);
                    await existingUserByEmail.save()

                }
        }
        else {
           const hashedPassword =  await bcrypt.hash(password,10)
            const expiryDate = new Date()
           expiryDate.setHours(expiryDate.getHours()+1)
      

       const newUser =  new UserModel({
            username,
            email,
            password : hashedPassword,
            verifyCode,
            verifycodeExpiry:expiryDate,
            isverified : false ,
            isAccepting :true,
            messages :[],
 });
 await newUser.save();
    }
      // Send verification email
      const emailResponse = await sendverificationEmail(
        email,
        username,
        verifyCode
      );
      if (!emailResponse.success) {
        return Response.json(
          {
            success: false,
            message: emailResponse.message,
          },
          { status: 500 }
        );
      }
  
      return Response.json(
        {
          success: true,
          message: 'User registered successfully. Please verify your account.',
        },
        { status: 201 }
      );
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