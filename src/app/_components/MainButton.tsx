import Link, { LinkProps } from "next/link"
import { FaPlay } from "react-icons/fa"

interface MainButtonProps extends LinkProps {
    className?: string
    children: React.ReactNode
}
export default function MainButton(props: MainButtonProps) {

    const { className, children, href, ...rest } = props

    return (
        <Link href={href} {...rest}
            className={`text-2xl relative w-64 ${className} h-full`}
        >
            <div className="pl-8 justify-between text-2xl flex items-center bg-info
                relative hover:translate-y-0.5 active:translate-y-1.5 transition-transform duration-200">
                <span className="">{children}</span>
                <span className="px-4 py-4 bg-info relative">
                    <FaPlay />
                    <span className="absolute inset-0 bg-primary opacity-20" />
                </span>
            </div>
            <div className="absolute w-full -bottom-2 bg-info -z-20 h-1/3" >
                <div className="bg-black absolute inset-0 opacity-40" />
            </div>
        </Link>
    )
}