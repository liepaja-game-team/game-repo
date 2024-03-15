"use client";

import { api } from "~/trpc/react"

function ResultsPage({ params }: { params: { sessionId: string } }) {
    const { data: sessionData, isLoading } = api.session.getById.useQuery({ sessionId: +params.sessionId })

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!sessionData) {
        return <div>Error! Session with this id was not found</div>
    }

    return (
        <div>
            <p>Scores {JSON.stringify(sessionData.scores)}</p>
        </div>
    )
}
export default ResultsPage