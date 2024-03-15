"use client";

import { api } from "~/trpc/react"
import GameScoreTable from "./_components/GameScoreTable";

function ResultsPage({ params }: { params: { sessionId: string } }) {
    const { data: sessionData, isLoading } = api.session.getById.useQuery({ sessionId: +params.sessionId })

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!sessionData) {
        return <div>Error! Session with this id was not found</div>
    }

    const date = `${`${sessionData.createdAt.getDate()}`.padStart(2, "0")}.${`${sessionData.createdAt.getMonth()}`.padStart(2, "0")}.${sessionData.createdAt.getFullYear()}.`
    const totalScore = sessionData.scores.reduce((prevVal: number, curentVal: number) => curentVal + prevVal, 0)
    const userName = sessionData.userName ?? '"nezināms lietotājs"'

    return (
        <div>
            <h1 className="text-h1 text-4xl">Lietotājs {userName}</h1>
            <div className="mb-8 text-lg">Spēlēja {date}</div>
            <h2 className="text-h2 text-3xl">Ieguva <span className="text-active">{totalScore}</span> no 800 punktiem.</h2>
            {/* <GameScoreTable completed_games={sessionData.completed_games} scores={sessionData.scores} /> */}
        </div>
    )
}
export default ResultsPage