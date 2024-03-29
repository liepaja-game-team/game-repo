"use client"

import { api } from "~/trpc/react"
import GameRenderer from "./_components/GameRenderer"
import { redirect } from "next/navigation"
import useGameStore from "./gameStore"
import CakePicker from "./_components/CakePicker"
import { useState } from "react"

function SessionPage({ params }: { params: { sessionId: string } }) {
    const setsessionId = useGameStore(state => state.setsessionId)
    const setGameId = useGameStore(state => state.setGameId)
    const setIsLast = useGameStore(state => state.setIsLast)
    const setRefetch = useGameStore(state => state.setRefetch)
    const showQuestion = useGameStore(state => state.showQuestion)

    const { data: gameIdData, error, isError, refetch } = api.game.getNewGame.useQuery({ sessionId: +params.sessionId }, {
        retry: false,
        refetchOnWindowFocus: false
    })

    if (isError) {
        if (error.message == "This session already has max amount played games") {
            redirect(`/game/${params.sessionId}/results`)
        }
        redirect("/")
    }

    if (!gameIdData) {
        return <div>Loading...</div>
    }
    setsessionId(+params.sessionId)
    setGameId(gameIdData.gameID)
    setIsLast(gameIdData.isLast)
    setRefetch(() => { void refetch() })


    return (
        <>
            <GameRenderer display={showQuestion} />
            <CakePicker display={!showQuestion} />
        </>
    )
}
export default SessionPage