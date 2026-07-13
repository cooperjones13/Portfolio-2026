"use client"

import { useState } from "react"
import Image from "next/image"
import { IoChevronBack, IoChevronForward } from "react-icons/io5"

type ImageCarouselProps = {
    images: string[],
    alt: string
}

export default function ImageCarousel({ images, alt }: ImageCarouselProps) {
    const [index, setIndex] = useState(0)

    if (images.length <= 1) {
        return (
            <div className="relative aspect-square w-full max-w-125 overflow-hidden rounded-lg bg-(--accent-darkgreen)">
                <Image
                    src={images[0]}
                    fill
                    alt={alt}
                    sizes="100%"
                    className="object-contain"
                />
            </div>
        )
    }

    const goPrev = () => setIndex((i) => (i - 1 + images.length) % images.length)
    const goNext = () => setIndex((i) => (i + 1) % images.length)

    return (
        <div className="flex flex-col gap-3 w-full max-w-125">
            <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-(--accent-darkgreen)">
                <Image
                    src={images[index]}
                    fill
                    alt={`${alt} ${index + 1} of ${images.length}`}
                    sizes="100%"
                    className="object-contain"
                />
                <button
                    type="button"
                    onClick={goPrev}
                    aria-label="Previous image"
                    className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center justify-center bg-(--background)/70 hover:bg-(--accent-lightgreen) hover:text-(--background) rounded-full p-2 transition-colors"
                >
                    <IoChevronBack />
                </button>
                <button
                    type="button"
                    onClick={goNext}
                    aria-label="Next image"
                    className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center bg-(--background)/70 hover:bg-(--accent-lightgreen) hover:text-(--background) rounded-full p-2 transition-colors"
                >
                    <IoChevronForward />
                </button>
            </div>
            <div className="flex flex-row justify-center gap-2">
                {images.map((_, i) => (
                    <button
                        key={i}
                        type="button"
                        onClick={() => setIndex(i)}
                        aria-label={`Go to image ${i + 1}`}
                        className={`h-2 w-2 rounded-full transition-colors ${i === index ? "bg-(--accent-lightgreen)" : "bg-(--accent-darkgreen)"}`}
                    />
                ))}
            </div>
        </div>
    )
}
