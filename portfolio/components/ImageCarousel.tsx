"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { IoChevronBack, IoChevronForward } from "react-icons/io5"

type ImageCarouselProps = {
    images: string[],
    alt: string,
    autoRotateMs?: number
}

export default function ImageCarousel({ images, alt, autoRotateMs = 4000 }: ImageCarouselProps) {
    const n = images.length
    const slides = n > 1 ? [images[n - 1], ...images, images[0]] : images

    const [current, setCurrent] = useState(1)
    const [transitionEnabled, setTransitionEnabled] = useState(true)
    const [isPaused, setIsPaused] = useState(false)
    const [isAnimating, setIsAnimating] = useState(false)

    const activeIndex = ((current - 1) % n + n) % n

    const goPrev = () => {
        if (isAnimating) return
        setIsAnimating(true)
        setTransitionEnabled(true)
        setCurrent((c) => c - 1)
    }
    const goNext = () => {
        if (isAnimating) return
        setIsAnimating(true)
        setTransitionEnabled(true)
        setCurrent((c) => c + 1)
    }
    const goTo = (i: number) => {
        if (isAnimating || i === activeIndex) return
        setIsAnimating(true)
        setTransitionEnabled(true)
        setCurrent(i + 1)
    }

    const handleTransitionEnd = () => {
        if (current === 0) {
            setTransitionEnabled(false)
            setCurrent(n)
        } else if (current === n + 1) {
            setTransitionEnabled(false)
            setCurrent(1)
        }
        setIsAnimating(false)
    }

    useEffect(() => {
        if (n <= 1 || isPaused) return
        const id = setInterval(goNext, autoRotateMs)
        return () => clearInterval(id)
    }, [n, isPaused, autoRotateMs, current])

    if (n <= 1) {
        return (
            <div className="relative aspect-square w-full max-w-125 overflow-hidden rounded-lg bg-(--accent-darkgreen)">
                <Image
                    src={images[0]}
                    fill
                    alt={alt}
                    sizes="100%"
                    className="object-contain"
                    priority
                />
            </div>
        )
    }

    return (
        <div
            className="flex flex-col gap-3 w-full max-w-125"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-(--accent-darkgreen)">
                <div
                    className={`flex h-full ${transitionEnabled ? "transition-transform duration-500 ease-in-out" : ""}`}
                    style={{ width: `${slides.length * 100}%`, transform: `translateX(-${current * (100 / slides.length)}%)` }}
                    onTransitionEnd={handleTransitionEnd}
                >
                    {slides.map((src, i) => (
                        <div key={i} className="relative h-full shrink-0" style={{ width: `${100 / slides.length}%` }}>
                            <Image
                                src={src}
                                fill
                                alt={`${alt} ${((i - 1 + n) % n) + 1} of ${n}`}
                                sizes="100%"
                                className="object-contain"
                                priority={i === 1}
                            />
                        </div>
                    ))}
                </div>
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
                        onClick={() => goTo(i)}
                        aria-label={`Go to image ${i + 1}`}
                        className={`h-2 w-2 rounded-full transition-colors ${i === activeIndex ? "bg-(--accent-lightgreen)" : "bg-(--accent-darkgreen)"}`}
                    />
                ))}
            </div>
        </div>
    )
}
