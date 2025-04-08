import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify} from 'jose'



export async function middleware(req: NextRequest) {

    if (req.nextUrl.pathname === "/api/user/create") {
        return NextResponse.next();
    }

    const secretKey = new TextEncoder().encode(process.env.SECRET);

    const token = req.headers.get("Authorization")?.split(" ")[1];

    if (!token) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const { payload } = await jwtVerify(token, secretKey);
        const requestHeaders = new Headers(req.headers)
        requestHeaders.set('X-user-id', payload.id as string)
        requestHeaders.set('X-user-Role', payload.role as string)

        return NextResponse.next({ request: { headers: requestHeaders}})
        
    } catch {
        return new NextResponse("Access denied: Invalid token", { status: 403 });
    }
}

export const config = {
    matcher: [
        "/api/user/:path*",
        "/api/user/auth"
    ]
};
