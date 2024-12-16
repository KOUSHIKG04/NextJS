import { connectDB } from "@/db/dbconfig";
import { NextResponse, NextRequest } from "next/server";

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
