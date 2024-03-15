import Link, { LinkProps } from "next/link"

interface SecondaryButton extends LinkProps {
    className?: string
    children: React.ReactNode
}
export default function SecondaryButton(props: SecondaryButton) {

    const { className, children, href, ...rest } = props

    return (
        <Link href={href} {...rest} className={`border-2 border-inactive text-inactive hover:text-primary 
                hover:border-primary transition-colors duration-300 text-xl flex 
                items-center px-4 rounded-lg text-center max-w-48 py-2 ${className}`}>
            {children}
        </Link>
    )
}