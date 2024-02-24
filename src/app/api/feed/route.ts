import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest, res: NextResponse){
    const resp = await axios.get("https://librivox.org/api/feed/audiobooks")

    return NextResponse.json(resp.data)
}