import {resend} from "@/lib/resend";

import VerificationEmail from "../../emails/sendverificationEmail";

import { ApiResponse } from "@/types/ApiResposse";
export async function sendverificationEmail(
    email:string,
    username:string,
    verifycode:string
): Promise<ApiResponse> {

    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Next App | verification Code ',
            react:VerificationEmail({username,otp:
                verifycode}),
          });
        return {success:true , message:'verification email sent successfully'}
        
    } catch (emailError) {

        console.log("error sending verification email",emailError)
        return {success:false, message :"failed to send verification email"}
        
    }


    
}