import { connectDB } from "@/db/dbconfig";
import User from "@/model/userModel";
import { NextResponse, NextRequest } from "next/server";
import { log } from "node:console";

connectDB();

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json(); const { token } = reqBody
        log(token);

        const user = await User.findOne({ 
            verifyToken: token, 
            verifyTokenExpiry: { $gt: Date.now() } 
        });

        if (!user) {
            return NextResponse.json(
                { error: "Invalid token" }, 
                { status: 400 }
            )
        }
        log(user);

        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        user.isVerfied = true;
        await user.save();

        return NextResponse.json({
            message: "Email verified successfully",
            success: true
        })


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