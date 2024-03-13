"use client";

import { useState } from "react";
import { api } from "~/trpc/react"

function Home() {
    const { data: session, isLoading, refetch } = api.session.getById.useQuery({ sessionId: 1 })
    const updateUsername = api.session.addUserName.useMutation()
    const [userName, setUserName] = useState('')

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
            <div>
                <input type="text" value={userName}
                    className="bg-transparent outline-none border focus:border-2"
                    onChange={(e) => {
                        setUserName(e.target.value)
                    }} />
                <button onClick={async () => {
                    await updateUsername.mutateAsync({ id: 1, userName: userName })
                    void refetch()
                }}>
                    Add Username
                </button>
            </div>
        </div>
    )
}
export default Home