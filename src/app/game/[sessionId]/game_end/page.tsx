"use client";

import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import SecondaryButton from "~/app/_components/SecondaryButton";
import H1 from "~/app/_components/mdx/H1";
import H2 from "~/app/_components/mdx/H2";
import { api } from "~/trpc/react"

function UsernamePage({ params }: { params: { sessionId: string } }) {
    const [error, setError] = useState("")
    const { data: sessionData, isLoading } = api.session.getById.useQuery({ sessionId: +params.sessionId })
    const addUserNameMutation = api.session.addUserName.useMutation()

    if (isLoading) {
        return <div>Loading</div>
    }
    if (!sessionData) {
        return <div>Error! Session not found!</div>
    }
    const totalScore = sessionData.scores.reduce((prevVal: number, curentVal: number) => curentVal + prevVal, 0)

    const addUsernameAction = async (formData: FormData) => {

        if ((formData.get('body') as string).length >= 32) {
            setError("Lietotājvārds nevar būt lielāks par 32 simboliem!")
            return
        }
        if ((formData.get('body') as string).length <= 2) {
            setError("Lietotājvārdam jābūt vismaz 2 simboli garam")
            return
        }

        await addUserNameMutation.mutateAsync({
            id: +params.sessionId,
            userName: formData.get("body") as string
        })
        redirect(`/game/${params.sessionId}/results`)
    }
    return (
        <div className="flex flex-col">
            <H1>Paldies par spēli! Jūs ieguvāt <span className="text-active">{totalScore}</span> no 800 punktiem.</H1>
            <div className="bg-bgTertiary py-4 px-8 min-h-36 ">
                <h2 className="text-h2 mb-2">Jūs varat piešķirt lietotājvārdu šai sesijai, lai to varētu redzēt sesiju sarakstā.</h2>
                <div className="justify-between flex flex-col 
            md:flex-row items-center gap-4 max-w-4xl self-center ">
                    <form action={addUsernameAction}>
                        <div className="flex relative">
                            <input name="body" type="text" className="text-xl md:text-2xl bg-transparent 
                        focus:outline-none border-2 border-inactive rounded-l-2xl px-4 py-1 
                        max-w-100 min-w-32 w-full" />
                            <button type="submit" className="px-2 bg-info rounded-r-2xl">Iesniegt</button>
                            <div className="text-lg text-error absolute bottom-0 translate-y-full">{error}</div>
                        </div>
                    </form>
                    <div className="">vai</div>
                    <SecondaryButton href="/" className="md:py-0 lg:py-2">
                        Atpakaļ titullapa
                    </SecondaryButton>
                </div>
            </div>
        </div>
    )
}
export default UsernamePage