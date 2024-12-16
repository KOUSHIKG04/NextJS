import { connectDB } from "@/db/dbconfig";
import User from "@/model/userModel";
import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { log } from "node:console";


connectDB();

export async function POST(req: NextRequest) {

    const secret = process.env.TOKEN_SECRET || "defaultSecret";
    if (!secret) {
        return NextResponse.json(
            { error: "Internal server error: TOKEN_SECRET is missing" },
            { status: 500 }
        );
    }

    try {
        const reqBody = await req.json();
        const { email, password } = reqBody;

        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json(
                { error: "User does not exists" },
                { status: 400 }
            )
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 400 }
            )
        }

        const createTokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        }

        const token = jwt.sign(
            createTokenData,
            process.env.TOKEN_SECRET!,
            { expiresIn: "1d" }
        )

        const response = NextResponse.json({
            message: "User logged in  successfully",
            success: true
        }, { status: 200 })

        response.cookies.set("token", token, {
            httpOnly: true,
        })
 
        log(response)
        return response;


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
