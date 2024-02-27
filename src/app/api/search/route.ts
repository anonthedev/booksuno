import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse){
    const filter = req.nextUrl.searchParams.get("filter")!;
    const query = req.nextUrl.searchParams.get("query")!;
    const resp = await axios.get(`https://librivox.org/api/feed/audiobooks/${filter}/%5E${query}`)
    return NextResponse.json(resp.data)
}