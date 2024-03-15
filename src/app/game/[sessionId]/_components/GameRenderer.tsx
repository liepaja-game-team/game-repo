"use client";

import { api } from "~/trpc/react";
import Markdown from 'react-markdown'
import mdxComponents from "~/app/_components/mdx/_mdxComponents";
import rehypeRaw from 'rehype-raw'
import AnswerPicker from "./AnswerPicker";
import H1 from "~/app/_components/mdx/H1";
import useGameStore from "../gameStore";

function GameRenderer({ display }: { display: boolean }) {
    const gameId = useGameStore(state => state.gameId)
    const { data: gameData, error } = api.game.getById.useQuery({ gameId: gameId })

    if (error) {
        return <div className={`${display ? "" : "hidden"}`}>Error: {error.message}</div>
    }
    if (!gameData) {
        return <div className={`${display ? "" : "hidden"}`}>Loading...</div>
    }

    return (
        <div className={`${display ? "" : "hidden"}`}>
            <H1>{gameData.title}</H1>
            <Markdown components={mdxComponents} rehypePlugins={[rehypeRaw]}>
                {gameData.content}
            </Markdown>
            <AnswerPicker answers={gameData.answers} />
        </div>
    )
}
export default GameRenderer