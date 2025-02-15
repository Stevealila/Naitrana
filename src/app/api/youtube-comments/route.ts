import { NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

const YOUTUBE_API_KEY = process.env.GOOGLE_API_KEY
const GEMINI_API_KEY = process.env.GOOGLE_API_KEY

type Comment = {
    comment: string
    author_name: string
    author_channel: string
}

export async function POST(req: NextRequest) {
    try {
        const { videoUrl } = await req.json()
        if (!videoUrl) {
            return NextResponse.json({ error: "Video URL is required" }, { status: 400 })
        }

        const videoId = getYouTubeVideoId(videoUrl)
        if (!videoId) {
            return NextResponse.json({ error: "Invalid YouTube URL" }, { status: 400 })
        }

        const comments = await fetchYouTubeComments(videoId)
        const suggestions = await analyzeComments(comments)

        return NextResponse.json({ videoId, comments, suggestions })
    } catch (error) {
        console.error("Error:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}

function getYouTubeVideoId(url: string): string | null {
    try {
        const parsedUrl = new URL(url)
        const hostname = parsedUrl.hostname

        if (hostname.includes("youtube.com")) {
            return parsedUrl.searchParams.get("v")
        }
        if (hostname === "youtu.be") {
            return parsedUrl.pathname.substring(1)
        }
        if (parsedUrl.pathname.startsWith("/embed/")) {
            return parsedUrl.pathname.split("/")[2]
        }

        return null
    } catch (error) {
        console.error("Invalid URL:", error)
        return null
    }
}

async function fetchYouTubeComments(videoId: string): Promise<Comment[]> {
    const url = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet,replies&videoId=${videoId}&maxResults=100&order=relevance&key=${YOUTUBE_API_KEY}`

    const response = await fetch(url)
    if (!response.ok) throw new Error("Failed to fetch YouTube comments")

    const data = await response.json()
    return data.items.map((item: { snippet: { topLevelComment: { snippet: { textDisplay: string; authorDisplayName: string; authorChannelUrl: string } } } }) => ({
        comment: item.snippet.topLevelComment.snippet.textDisplay,
        author_name: item.snippet.topLevelComment.snippet.authorDisplayName,
        author_channel: item.snippet.topLevelComment.snippet.authorChannelUrl
    }))
}

async function analyzeComments(comments: Comment[]): Promise<string> {
    if (!GEMINI_API_KEY) throw new Error("Missing Gemini AI API key")

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })

    const prompt = `
        You are an expert in audience engagement and content strategy.
        Extract YouTube comments that suggest new video topics, improvements, or collaborations.
        If no such comments exist, return an empty array.

        Here are the comments:
        ${JSON.stringify(comments)}
    `

    const response = await model.generateContent(prompt)
    const result = await response.response
    return result.text()
}
