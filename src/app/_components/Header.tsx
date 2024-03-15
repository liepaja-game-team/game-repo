import Link from "next/link";
import { FaRobot, FaGithub } from "react-icons/fa";
import A from "./mdx/A";

export default async function Header() {

    return (
        <header className="py-4 px-4 md:mb-16 bg-bgSecondary absolute w-full">
            <div className="container mx-auto xl:max-w-6xl flex justify-between items-center">
                <Link href={`/`} className="block">
                    <h1 className='text-2xl sm:text-3xl md:text-4xl text-h1 flex items-center gap-2 md:gap-4'>
                        Liepājas Līgas
                    </h1>
                </Link>
                <nav>
                    <ul className="flex gap-x-6 text-xl items-center">
                        <li><A noIcon href={`/leaderboard`}>Top 10</A></li>
                        <li><A noIcon href={`/about`}>Par spēli</A></li>
                        <li className="text-4xl">
                            <Link
                                className="text-primary opacity-75 hover:text-primary 
                                hover:opacity-90 active:opacity-100 transition-all
                                duration-300"
                                target="_blank"
                                href="https://github.com/liepaja-game-team/game-repo">
                                <FaGithub />
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );

}