export default function Ol({ children }: { children?: React.ReactNode }) {
    return <ol className="mdx-ol list-inside list-decimal space-y-1 mb-4 [&>li]:marker:text-active [&>li]:pb-2">
        {children}
    </ol>
}
