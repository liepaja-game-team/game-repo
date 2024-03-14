import Link from "next/link"
import { FaPlay } from "react-icons/fa";

function Home() {
    return (
        <div className="flex flex-col items-center">
            <div className="mt-16 mb-10 text-center">
                <h1 className="text-h1 text-5xl mb-2">Liepājas Līgas</h1>
                <p className="text-center">Spēlē par Liepāju</p>
            </div>

            <Link href="/game"
                className="text-2xl relative w-64"
            >
                <div className="pl-8 justify-between text-2xl flex items-center bg-info
                relative hover:translate-y-0.5 active:translate-y-1.5 transition-transform duration-200">
                    <span className="">Sākt spēlēt</span>
                    <span className="px-4 py-4 bg-info relative">
                        <FaPlay />
                        <span className="absolute inset-0 bg-primary opacity-20" />
                    </span>
                </div>
                <div className="absolute w-full -bottom-2 bg-info -z-20 h-1/3" >
                    <div className="bg-black absolute inset-0 opacity-40" />
                </div>
            </Link>
        </div>
    )
}
export default Home