"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { IoChevronBack, IoChevronForward, IoClose, IoExpand } from "react-icons/io5"

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
    const [isModalOpen, setIsModalOpen] = useState(false)

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
        if (n <= 1 || isPaused || isModalOpen) return
        const id = setInterval(goNext, autoRotateMs)
        return () => clearInterval(id)
    }, [n, isPaused, isModalOpen, autoRotateMs, current])

    useEffect(() => {
        if (!isModalOpen) return
        document.body.style.overflow = "hidden"
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsModalOpen(false)
            if (e.key === "ArrowLeft") goPrev()
            if (e.key === "ArrowRight") goNext()
        }
        window.addEventListener("keydown", handleKey)
        return () => {
            document.body.style.overflow = ""
            window.removeEventListener("keydown", handleKey)
        }
    }, [isModalOpen, isAnimating])

    if (n <= 1) {
        return (
            <>
                <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    aria-label="Open larger image"
                    className="group relative aspect-square w-full max-w-125 overflow-hidden rounded-lg bg-(--accent-darkgreen) cursor-zoom-in"
                >
                    <Image
                        src={images[0]}
                        fill
                        alt={alt}
                        sizes="100%"
                        className="object-contain"
                        priority
                    />
                    <span className="absolute bottom-2 right-2 flex items-center justify-center bg-(--background)/70 group-hover:bg-(--accent-lightgreen) group-hover:text-(--background) rounded-full p-2 transition-colors">
                        <IoExpand />
                    </span>
                </button>
                {isModalOpen && (
                    <ImageModal
                        src={images[0]}
                        alt={alt}
                        onClose={() => setIsModalOpen(false)}
                    />
                )}
            </>
        )
    }

    return (
        <div
            className="flex flex-col gap-3 w-full max-w-125"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-(--accent-darkgreen)">
                <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    aria-label="Open larger image"
                    className="group absolute inset-0 z-10 cursor-zoom-in"
                >
                    <span className="absolute bottom-2 right-2 flex items-center justify-center bg-(--background)/70 group-hover:bg-(--accent-lightgreen) group-hover:text-(--background) rounded-full p-2 transition-colors">
                        <IoExpand />
                    </span>
                </button>
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
                    className="absolute z-10 left-2 top-1/2 -translate-y-1/2 flex items-center justify-center bg-(--background)/70 hover:bg-(--accent-lightgreen) hover:text-(--background) rounded-full p-2 transition-colors"
                >
                    <IoChevronBack />
                </button>
                <button
                    type="button"
                    onClick={goNext}
                    aria-label="Next image"
                    className="absolute z-10 right-2 top-1/2 -translate-y-1/2 flex items-center justify-center bg-(--background)/70 hover:bg-(--accent-lightgreen) hover:text-(--background) rounded-full p-2 transition-colors"
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
            {isModalOpen && (
                <ImageModal
                    src={images[activeIndex]}
                    alt={`${alt} ${activeIndex + 1} of ${n}`}
                    onClose={() => setIsModalOpen(false)}
                    onPrev={n > 1 ? goPrev : undefined}
                    onNext={n > 1 ? goNext : undefined}
                />
            )}
        </div>
    )
}

type ImageModalProps = {
    src: string,
    alt: string,
    onClose: () => void,
    onPrev?: () => void,
    onNext?: () => void,
}

function ImageModal({ src, alt, onClose, onPrev, onNext }: ImageModalProps) {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6"
            onClick={onClose}
        >
            <button
                type="button"
                onClick={onClose}
                aria-label="Close larger image"
                className="absolute top-4 right-4 flex items-center justify-center bg-(--background)/70 hover:bg-(--accent-lightgreen) hover:text-(--background) rounded-full p-2 transition-colors"
            >
                <IoClose size={24} />
            </button>
            {onPrev && (
                <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); onPrev() }}
                    aria-label="Previous image"
                    className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center bg-(--background)/70 hover:bg-(--accent-lightgreen) hover:text-(--background) rounded-full p-3 transition-colors"
                >
                    <IoChevronBack size={20} />
                </button>
            )}
            {onNext && (
                <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); onNext() }}
                    aria-label="Next image"
                    className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center bg-(--background)/70 hover:bg-(--accent-lightgreen) hover:text-(--background) rounded-full p-3 transition-colors"
                >
                    <IoChevronForward size={20} />
                </button>
            )}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={src}
                alt={alt}
                className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
                onClick={(e) => e.stopPropagation()}
            />
        </div>
    )
}
