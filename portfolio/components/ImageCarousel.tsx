"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { IoChevronBack, IoChevronForward, IoClose, IoExpand } from "react-icons/io5"
import { useReducedMotion } from "@/hooks/useReducedMotion"

type ImageCarouselProps = {
    images: string[],
    alt: string,
    autoRotateMs?: number
}

export default function ImageCarousel({ images, alt, autoRotateMs = 4000 }: ImageCarouselProps) {
    const n = images.length
    const slides = n > 1 ? [images[n - 1], ...images, images[0]] : images
    const prefersReducedMotion = useReducedMotion()

    const [current, setCurrent] = useState(1)
    const [transitionEnabled, setTransitionEnabled] = useState(true)
    const [isPaused, setIsPaused] = useState(false)
    const [isAnimating, setIsAnimating] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const activeIndex = ((current - 1) % n + n) % n

    const step = (delta: number) => {
        if (isAnimating) return
        if (prefersReducedMotion) {
            // No transition will fire, so jump straight to the wrapped slide
            // instead of routing through the animated clone-slide dance.
            setCurrent((c) => (((c - 1 + delta) % n + n) % n) + 1)
            return
        }
        setIsAnimating(true)
        setTransitionEnabled(true)
        setCurrent((c) => c + delta)
    }
    const goPrev = () => step(-1)
    const goNext = () => step(1)
    const goTo = (i: number) => {
        if (isAnimating || i === activeIndex) return
        if (prefersReducedMotion) {
            setCurrent(i + 1)
            return
        }
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
        if (n <= 1 || isPaused || isModalOpen || prefersReducedMotion) return
        const id = setInterval(goNext, autoRotateMs)
        return () => clearInterval(id)
    }, [n, isPaused, isModalOpen, prefersReducedMotion, autoRotateMs, current])

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

    // With reduced motion, jump straight to a non-animating transform whenever
    // the animating flag is cleared without a transitionend event to catch it.
    useEffect(() => {
        if (prefersReducedMotion) setTransitionEnabled(false)
    }, [prefersReducedMotion])

    if (n <= 1) {
        return (
            <>
                <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    aria-label="Open larger image"
                    className="group relative aspect-square w-full max-w-125 overflow-hidden rounded-lg bg-(--accent-darkgreen) cursor-zoom-in focus-visible:outline-2 focus-visible:outline-(--accent-tangerine) focus-visible:outline-offset-2"
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
                    className="group absolute inset-0 z-10 cursor-zoom-in focus-visible:outline-2 focus-visible:outline-(--accent-tangerine) focus-visible:-outline-offset-2"
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
                    className="absolute z-10 left-2 top-1/2 -translate-y-1/2 flex items-center justify-center bg-(--background)/70 hover:bg-(--accent-lightgreen) hover:text-(--background) focus-visible:outline-2 focus-visible:outline-(--accent-tangerine) focus-visible:outline-offset-2 rounded-full p-2 transition-colors"
                >
                    <IoChevronBack />
                </button>
                <button
                    type="button"
                    onClick={goNext}
                    aria-label="Next image"
                    className="absolute z-10 right-2 top-1/2 -translate-y-1/2 flex items-center justify-center bg-(--background)/70 hover:bg-(--accent-lightgreen) hover:text-(--background) focus-visible:outline-2 focus-visible:outline-(--accent-tangerine) focus-visible:outline-offset-2 rounded-full p-2 transition-colors"
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
                        aria-current={i === activeIndex}
                        className={`h-2 w-2 rounded-full focus-visible:outline-2 focus-visible:outline-(--accent-tangerine) focus-visible:outline-offset-2 transition-colors ${i === activeIndex ? "bg-(--accent-lightgreen)" : "bg-(--accent-darkgreen)"}`}
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
    const dialogRef = useRef<HTMLDivElement>(null)
    const closeButtonRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        const previouslyFocused = document.activeElement as HTMLElement | null
        closeButtonRef.current?.focus()
        return () => {
            previouslyFocused?.focus()
        }
    }, [])

    useEffect(() => {
        const handleTabTrap = (e: KeyboardEvent) => {
            if (e.key !== "Tab") return
            const focusables = dialogRef.current?.querySelectorAll<HTMLElement>('button')
            if (!focusables || focusables.length === 0) return
            const list = Array.from(focusables)
            const first = list[0]
            const last = list[list.length - 1]
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault()
                last.focus()
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault()
                first.focus()
            }
        }
        document.addEventListener("keydown", handleTabTrap)
        return () => document.removeEventListener("keydown", handleTabTrap)
    }, [])

    return (
        <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={alt}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6"
            onClick={onClose}
        >
            <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Close larger image"
                className="absolute top-4 right-4 flex items-center justify-center bg-(--background)/70 hover:bg-(--accent-lightgreen) hover:text-(--background) focus-visible:outline-2 focus-visible:outline-(--accent-tangerine) focus-visible:outline-offset-2 rounded-full p-2 transition-colors"
            >
                <IoClose size={24} />
            </button>
            {onPrev && (
                <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); onPrev() }}
                    aria-label="Previous image"
                    className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center bg-(--background)/70 hover:bg-(--accent-lightgreen) hover:text-(--background) focus-visible:outline-2 focus-visible:outline-(--accent-tangerine) focus-visible:outline-offset-2 rounded-full p-3 transition-colors"
                >
                    <IoChevronBack size={20} />
                </button>
            )}
            {onNext && (
                <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); onNext() }}
                    aria-label="Next image"
                    className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center bg-(--background)/70 hover:bg-(--accent-lightgreen) hover:text-(--background) focus-visible:outline-2 focus-visible:outline-(--accent-tangerine) focus-visible:outline-offset-2 rounded-full p-3 transition-colors"
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
