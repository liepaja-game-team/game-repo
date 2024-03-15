"use client";

import Image from "next/image"
import H1 from "~/app/_components/mdx/H1"
import useGameStore from "../gameStore";

function CakePicker({ display }: { display: boolean }) {

    return (
        <div className={`${display ? "": "hidden"}`}>
            <H1>Izvēlies gabaliņu, lai sāktu spēlēt!</H1>
            <div className="grid grid-rows-2 grid-cols-2 w-fit m-auto gap-">
                <CakeSliceButton
                    index={0}
                    className="hover:-translate-x-4 hover:-translate-y-4">
                    <Image src="/images/cake1.webp" alt="tortes gabals" width={250} height={250} />
                </CakeSliceButton>
                <CakeSliceButton
                    index={1}
                    className="hover:translate-x-4 hover:-translate-y-4">
                    <Image src="/images/cake2.webp" alt="tortes gabals" width={250} height={250} />
                </CakeSliceButton>
                <CakeSliceButton
                    index={2}
                    className="hover:-translate-x-4 hover:translate-y-4">
                    <Image src="/images/cake3.webp" alt="tortes gabals" width={250} height={250} />
                </CakeSliceButton>
                <CakeSliceButton
                    index={3}
                    className="hover:translate-x-4 hover:translate-y-4">
                    <Image src="/images/cake4.webp" alt="tortes gabals" width={250} height={250} />
                </CakeSliceButton>
            </div>
        </div>
    )
}

function CakeSliceButton({ children, className, index, }:
    { children: React.ReactNode, className?: string, index: number, }) {
    const collectedSlices = useGameStore(state => state.collectedCakeSlices)
    const addCollectedCakeSlice = useGameStore(state => state.addCollectedCakeSlice)
    const setShowQuestion = useGameStore(state => state.setShowQuestion)

    function HandleSliceClick() {
        addCollectedCakeSlice(index)
        setShowQuestion(true)
    }

    return (
        <button
            disabled={collectedSlices[index]}
            onClick={HandleSliceClick}
            className={`transition-transform duration-300 
            ${!collectedSlices[index] ? "hover:cursor-pointer" : "opacity-0"} 
            ${className}`}
        >
            {children}
        </button>
    )
}

export default CakePicker