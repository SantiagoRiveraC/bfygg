import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify} from 'jose'



export async function middleware(req: NextRequest) {

    const secretKey = new TextEncoder().encode(process.env.SECRET);

    const token = req.headers.get("Authorization")?.split(" ")[1];
    // console.log(token)

    if (!token) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        await jwtVerify(token, secretKey);
        return NextResponse.next()
    } catch (error) {
        console.log(error)
        return new NextResponse("Acceso denegado: Token inválido", { status: 403 });
    }
}

export const config = {
    matcher: "/api/user/:path*",
};
