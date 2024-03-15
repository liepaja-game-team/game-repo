import { useEffect, useState } from "react"
import { api } from "~/trpc/react"

type GameScoreTable = {
    completed_games: number[]
    scores: number[]
}

function GameScoreTable({ completed_games, scores }: GameScoreTable) {

    return (
        <div>test2</div>
    )
}
export default GameScoreTable