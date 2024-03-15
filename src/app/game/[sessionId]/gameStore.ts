import { create } from 'zustand'

type gameStore = {
    sessionId: number,
    setsessionId: (sessionId: number | undefined) => void
    gameId: number,
    setGameId: (gameId: number | undefined) => void
    isLast: boolean
    setIsLast: (isLast: boolean) => void
    refetch: () => any
    setRefetch: (refetch: () => void) => void
    collectedCakeSlices: [boolean, boolean, boolean, boolean]
    addCollectedCakeSlice: (cakeSliceId: number) => void
    resetCakeSlices: () => void
    showQuestion: boolean
    setShowQuestion: (showQuestion: boolean) => void
}

const useGameStore = create<gameStore>((set) => ({
    sessionId: 0,
    setsessionId: (sessionId: number | undefined) => set(() => ({ sessionId })),
    gameId: 0,
    setGameId: (gameId: number | undefined) => set(() => ({ gameId })),
    isLast: false,
    setIsLast: (isLast: boolean) => set(() => ({ isLast })),
    refetch: () => undefined,
    setRefetch: (refetch: () => void) => set(() => ({ refetch })),
    collectedCakeSlices: [false, false, false, false],
    addCollectedCakeSlice: (cakeSliceId: number) => set((state) => {
        const slices = state.collectedCakeSlices
        slices[cakeSliceId] = true
        return {
            collectedCakeSlices: slices
        }
    }),
    resetCakeSlices: () => set(() => ({
        collectedCakeSlices: [false, false, false, false]
    })),
    showQuestion: false,
    setShowQuestion: (showQuestion: boolean) => set(() => ({ showQuestion })),
}))

export default useGameStore