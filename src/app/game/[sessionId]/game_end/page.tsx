"use client";

import H1 from "~/app/_components/mdx/H1";
import H2 from "~/app/_components/mdx/H2";
import { api } from "~/trpc/react"

function UsernamePage({ params }: { params: { sessionId: string } }) {
    const { data: sessionData, isLoading } = api.session.getById.useQuery({ sessionId: +params.sessionId })

    if (isLoading) {
        return <div>Loading</div>
    }
    if (!sessionData) {
        return <div>Error! Session not found!</div>
    }
    const totalScore = sessionData.scores.reduce((prevVal: number, curentVal: number) => curentVal + prevVal, 0)
    return (
        <div className="">
            <H1>Jūs ieguvāt <span className="text-active">{totalScore}</span> no 800 punktiem.</H1>
            <H2>Jūs varat piešķirt lietotājvārdu šai sesijai, lai to varētu redzēt sesiju sarakstā.</H2>
            <div className="flex">
                <input type="text" className="bg-bgTertiary h-8" />
                <button>Iesniegt</button>
            </div>
        </div>
    )
}
export default UsernamePage