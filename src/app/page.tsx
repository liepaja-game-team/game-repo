"use client";

import { api } from "~/trpc/react"

function Home() {
    const { data: session, isLoading } = api.post.testDb.useQuery({ sessionId: 1 })

    if (isLoading) {
        return <div>Loading...</div>
    }
    if (!session) {
        return <div>session not found</div>
    }

    return (
        <div className="">
            <div>
                <p>ID: {session.id}</p>
                <p>UserName: {session.userName}</p>
            </div>
        </div>
    )
}
export default Home