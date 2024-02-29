import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { DOMParser } from "xmldom";

export async function GET(req: NextRequest, res: NextResponse) {
  const id = req.nextUrl.searchParams.get("bookId")!;
  const resp = await axios.get(`https://librivox.org/rss/${id}`);

  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(resp.data, "text/xml");

    const bookTitle = xmlDoc.getElementsByTagName("title")[0].textContent;
    const bookDesc = xmlDoc.getElementsByTagName("description")[0].textContent;

    const episodes = xmlDoc.getElementsByTagName("item");
    const epInfo = Array.from(episodes).map((episode) => {
        const epTitle = episode.getElementsByTagName("title")[0].textContent
        const epURL = episode.getElementsByTagName("media:content")[0].getAttribute("url")
        const epDurationNode = episode.getElementsByTagName("itunes:duration")[0]
        const epDuration = epDurationNode.textContent?.trim()
        return { epTitle, epURL, epDuration };
    });

    return NextResponse.json({
        bookTitle,
        bookDesc,
        episodes: epInfo
    });
  } catch (error) {
    console.error("Error fetching or parsing RSS data:", error);
  }

}
