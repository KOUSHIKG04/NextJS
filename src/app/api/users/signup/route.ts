import { connectDB } from "@/db/dbconfig";
import User from "@/model/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helper/mailer";

connectDB();

interface SignupRequestBody {
    username: string;
    email: string;
    password: string;
}

export async function POST(req: NextRequest) {
    try {
        const reqBody: SignupRequestBody = await req.json();
        const { username, email, password } = reqBody;

        const user = await User.findOne({ email })
        if (user) {
            return NextResponse.json(
                { error: "User already exists" },
                { status: 400 }
            )
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        })

        const savedUser = await newUser.save();

        await sendEmail({ 
            email, 
            emailType: "VERIFY", 
            userID: savedUser._id 
        });

        return NextResponse.json({
            message: "User created successfully",
            success: true, savedUser
        }, { status: 200 })


    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }
        return NextResponse.json(
            { error: "Unknown error occurred" },
            { status: 500 }
        );
    }
}
