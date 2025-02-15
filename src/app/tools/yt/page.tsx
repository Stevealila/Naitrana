"use client"

import { useState } from "react"

const YouTubeTool = () => {
    const [videoUrl, setVideoUrl] = useState("")
    const [suggestions, setSuggestions] = useState<string>("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string>("")

    const handleFetchComments = async () => {
        setLoading(true)
        setError("")
        setSuggestions("")

        try {
            const response = await fetch("/api/youtube-comments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ videoUrl })
            })

            const data = await response.json()
            if (!response.ok) throw new Error(data.error || "Failed to fetch comments")

            setSuggestions(data.suggestions)
        } catch (err) {
            setError(err instanceof Error ? err.message : "An unknown error occurred") 
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-2xl mx-auto mt-10 p-4">
            <h1 className="text-2xl font-bold mb-4">YouTube Comment Analyzer</h1>

            <input
                type="text"
                placeholder="Enter YouTube URL"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                className="border p-2 w-full rounded-md"
            />
            <button
                onClick={handleFetchComments}
                className="mt-2 bg-blue-500 text-white p-2 rounded-md w-full"
                disabled={loading}
            >
                {loading ? "Fetching Comments..." : "Get Comments"}
            </button>

            {error && <p className="text-red-500 mt-2">{error}</p>}

            {suggestions && (
                <div className="mt-4">
                    <h2 className="text-lg font-semibold">AI Content Suggestions</h2>
                    <p className="p-2 bg-gray-100 rounded-md">{suggestions}</p>
                </div>
            )}
        </div>
    )
}

export default YouTubeTool
