"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";
import { api } from "~/trpc/react";
import HashLoader from "react-spinners/HashLoader"

function Game() {
    const createMutation = api.session.create.useMutation()

    useEffect(() => {
        createMutation.mutate()
    }, [])

    if (createMutation.isSuccess) {
        redirect(`/game/${createMutation.data}`)
    }
    if (createMutation.isError) {
        redirect(`/`)
    }
    return (
        <div className="text-primary">
            Loading...
        </div>
    )
}
export default Game