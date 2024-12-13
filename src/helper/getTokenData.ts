import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const getTokenData = (req: NextRequest) => {
    try {

    const token = req.cookies.get('token')?.value || '';
    if (!token) {
        return "Please login again";
    }

    const decodedToken: any = jwt.verify(
        token, process.env.TOKEN_SECRET!
    );

    return decodedToken.id

    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        )
    }
}