import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypeHighlight from 'rehype-highlight';
import remarkMdxImages from 'remark-mdx-images'
import remarkGfm from 'remark-gfm'
import { visit } from 'unist-util-visit'
import mdxComponents from './_mdxComponents'

function MDXRemoteWrapper({ source }: { source: string }) {
    return (
        <MDXRemote source={source}
            options={{
                mdxOptions: {
                    rehypePlugins: [
                        addRawCode,
                        // @ts-expect-error: Something wrong with type definitions    
                        rehypeHighlight,
                        addRawToPre
                    ],
                    // @ts-expect-error: Something wrong with type definitions
                    remarkPlugins: [remarkMdxImages, remarkGfm],
                    format: 'mdx',
                }
            }}
            components={mdxComponents} />
    )
}
export default MDXRemoteWrapper

const addRawCode = () => (tree: any) => {
    visit(tree, (node) => {
        if (node?.type === "element" && node?.tagName === "pre") {
            const [codeEl] = node.children;

            if (codeEl.tagName !== "code") return;
            node.raw = codeEl.children?.[0]!.value;
            node.lang = ((codeEl.properties?.className?.[0]) as string).split('-')[1]
        }
    })
}

const addRawToPre = () => (tree: any) => {
    visit(tree, (node) => {
        if (node?.type === "element" && node?.tagName === "pre") {
            node.properties.raw = node.raw;
            node.properties.lang = node.lang;
        }
    })
}