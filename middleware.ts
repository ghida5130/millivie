import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const ua = request.headers.get("user-agent") || "";

    // 단순한 봇 필터
    if (/bot|crawler|spider|scraper|python|node-fetch|curl|axios/i.test(ua)) {
        return new NextResponse("Blocked bot", { status: 403 });
    }

    return NextResponse.next();
}
