"use client";

import { api } from "~/trpc/react";
import calcSessionTimeString from "~/utils/calcSessionTime";

function Leaderboard() {
    const { data: top10, isLoading } = api.session.getTop10.useQuery()

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!top10) {
        return <div>No session where found!</div>
    }

    return (
        <div>
            <table>
                <thead>
                    <th>Lietotājvārds</th>
                    <th>Punkti</th>
                    <th>Laiks</th>
                </thead>
                {top10.map(session => {
                    const timeString = calcSessionTimeString(session.latestScoreTime, session.createdAt)
                    return <tbody>
                        <td className="text-h2">
                            {session.userName ?? "Nezināms Lietotājs"}
                        </td>
                        <td>
                            <span className="text-active">{session.totalScore}</span>/800
                        </td>
                        <td>{timeString}</td>
                    </tbody>
                })}
            </table>
        </div >
    )
}
export default Leaderboard