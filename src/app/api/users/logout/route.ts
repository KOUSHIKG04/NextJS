import { connectDB } from "@/db/dbconfig";
import User from "@/model/userModel";
import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { log } from "node:console";


connectDB();

export async function GET(req: NextRequest) {

    try {
        const response = NextResponse.json({
            message: "Logout successful",
            success: true,
        })

        response.cookies.set("token", " ", { 
            httpOnly: true, 
            expires: new Date(0) 
        });

        return response

    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        )
    }
}
