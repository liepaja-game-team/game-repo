import Link from "next/link"
import { FaPlay } from "react-icons/fa";
import MainButton from "./_components/MainButton";
import SecondaryButton from "./_components/SecondaryButton";

function Home() {
    return (
        <div className="flex flex-col items-center">
            <div className="mt-16 mb-10 text-center">
                <h1 className="text-h1 text-5xl mb-2">Liepājas Līgas</h1>
                <p className="text-center">Spēlē par Liepāju</p>
            </div>

            <div className="flex gap-4 items-center">
                <MainButton href="/game">
                    Sākt spēli
                </MainButton>
                <SecondaryButton href="/about" className="translate-y-1">
                    Par spēli
                </SecondaryButton>
            </div>
        </div>
    )
}
export default Home