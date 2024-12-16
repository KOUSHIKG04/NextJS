import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

interface DecodedToken {
    id: string;
    username?: string;
    email?: string;
    iat?: number;
    exp?: number;
}

export const getTokenData = (req: NextRequest) => {
    try {

        const token = req.cookies.get('token')?.value || '';
        if (!token) {
            return "Please login again";
        }

        const decodedToken = jwt.verify(
            token,
            process.env.TOKEN_SECRET!
        ) as DecodedToken;

        return decodedToken.id

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