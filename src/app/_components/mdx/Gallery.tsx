type GalleryProps = {
    img1: string,
    img2: string,
    img3: string,
    img4: string,
}

function Gallery({ img1, img2, img3, img4 }: GalleryProps) {
    return (
        <div className="grid grid-cols-2 grid-rows-2 gap-4">
            <figure className="relative">
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-4xl">
                    1. attēls
                </span>
                <div className="absolute w-full h-full bg-bgBase opacity-20" />
                <img src={img1} loading="lazy" className="object-coverw-full h-full" />
            </figure>
            <figure className="relative">
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-4xl">
                    2. attēls
                </span>
                <div className="absolute w-full h-full bg-bgBase opacity-20" />
                <img src={img2} loading="lazy" className="object-coverw-full h-full" />
            </figure>
            <figure className="relative">
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-4xl">
                    3. attēls
                </span>
                <div className="absolute w-full h-full bg-bgBase opacity-20" />
                <img src={img3} loading="lazy" className="object-coverw-full h-full" />
            </figure>
            <figure className="relative">
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-4xl">
                    4. attēls
                </span>
                <div className="absolute w-full h-full bg-bgBase opacity-20" />
                <img src={img4} loading="lazy" className="object-coverw-full h-full" />
            </figure>
        </div>
    )
}
export default Gallery