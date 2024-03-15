import { api } from "~/trpc/react"
import useGameStore from "../gameStore"

type AnswerPickerProps = {
    answers: string[],
}

function AnswerPicker({ answers }: AnswerPickerProps) {
    const gameId = useGameStore(state => state.gameId)
    const sessionId = useGameStore(state => state.sessionId)
    const refetch = useGameStore(state => state.refetch)
    return (
        <div className="grid grid-cols-2 grid-rows-2 w-full gap-4 pt-10" >
            {answers.map((answer, i) => {
                const sendAnswerMutation = api.game.sendAnswer.useMutation()

                async function HandleAnswerButtonClick() {
                    await sendAnswerMutation.mutateAsync({ sessionId: sessionId, gameId: gameId, answerIndex: i })
                    refetch()
                }
                return <AnswerButton onClick={HandleAnswerButtonClick} >{answer}</AnswerButton>
            })}
        </div>
    )
}

function AnswerButton({ children, onClick }: { children: React.ReactNode, onClick: () => void }) {
    return (
        <button
            className="aspect-[3/1] bg-info"
            onClick={onClick}
        >
            {children}
        </button>
    )
}
export default AnswerPicker