import { getTokenData } from "@/helper/getTokenData";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/db/dbconfig";


connectDB();

export async function GET(req: NextRequest) {

    try {
        const userID = 
        await getTokenData(req);

        const user = await User.findOne(
            { 
                _id: userID 
            }
        ).select("-password");

        return NextResponse.json({
            messaage: "User found", data: user
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