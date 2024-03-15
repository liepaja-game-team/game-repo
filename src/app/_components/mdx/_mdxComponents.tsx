import { MDXRemote } from 'next-mdx-remote/rsc'
import Blockquote from '~/app/_components/mdx/Blockquote'
import H1 from '~/app/_components/mdx/H1'
import H2 from '~/app/_components/mdx/H2'
import H3 from '~/app/_components/mdx/H3'
import P from '~/app/_components/mdx/P'
import Strong from '~/app/_components/mdx/Strong'
import Ul from '~/app/_components/mdx/Ul'
import Image from "next/image"
import Pre from "~/app/_components/mdx/Pre"
import Code from "~/app/_components/mdx/Code"
import A from './A'
import Gallery from './Gallery'
import Ol from './Ol'

const mdxComponents = {
    h1: H1,
    h2: H2,
    h3: H3,
    p: P,
    strong: Strong,
    blockquote: Blockquote,
    pre: Pre,
    ul: Ul,
    ol: Ol,
    Image: Image,
    code: Code,
    a: A,
    gallery: Gallery
}

export default mdxComponents