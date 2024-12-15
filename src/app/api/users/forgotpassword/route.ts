import { connectDB } from "@/db/dbconfig";
import User from "@/model/userModel";
import { NextResponse, NextRequest } from "next/server";
import { sendEmail } from "@/helper/mailer";

connectDB();


export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json(); 
        const { email } = reqBody;

        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json(
                { error: "No Such users exist" }, 
                { status: 404 }
            )
        }

        await sendEmail({ 
            email, 
            emailType: "RESET", 
            userID: user._id 
        })

        return NextResponse.json(
            {
                message: "Password recovery email sent Successfully",
                success: true
            }
        )
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        )
    }
}