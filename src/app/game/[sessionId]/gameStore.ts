import { create } from 'zustand'

type gameStore = {
    sessionId: number,
    setsessionId: (sessionId: number | undefined) => void
    gameId: number,
    setGameId: (gameId: number | undefined) => void
    isLast: boolean
    setIsLast: (isLast: boolean) => void
    refetch: () => void
    setRefetch: (refetch: () => void) => void
}

const useGameStore = create<gameStore>((set) => ({
    sessionId: 0,
    setsessionId: (sessionId: number | undefined) => set(() => ({ sessionId })),
    gameId: 0,
    setGameId: (gameId: number | undefined) => set(() => ({ gameId })),
    isLast: false,
    setIsLast: (isLast: boolean) => set(() => ({ isLast })),
    refetch: () => { },
    setRefetch: (refetch: () => void) => set(() => ({ refetch })),
}))

export default useGameStore