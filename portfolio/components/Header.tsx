"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useReducedMotion } from "@/hooks/useReducedMotion"

export default function Header(){
    const pathname = usePathname()
    const prefersReducedMotion = useReducedMotion()

    const handleAnchorClick = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (pathname !== "/") return
        const target = document.getElementById(id)
        if (!target) return
        e.preventDefault()
        target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" })
        history.pushState(null, "", `/#${id}`)
    }

    return (
        <>
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-(--accent-lightgreen) focus:text-(--background) focus:px-4 focus:py-2 focus:rounded-md"
            >
                Skip to content
            </a>
            <header className="sticky top-0 z-50 flex flex-row justify-center w-full bg-(--background)/80 backdrop-blur-sm border-b border-(--accent-darkgreen)/40">
                <div className="flex flex-row justify-center md:justify-between w-full max-w-300 h-20 items-center mx-10">
                    <Link href="/" className="hidden flex-col justify-center items-center md:flex rounded-md focus-visible:outline-2 focus-visible:outline-(--accent-tangerine) focus-visible:outline-offset-2">
                        <Image src={"/logo-white.png"} alt="Cooper Jones Logo" width={35} height={35}/>
                    </Link>
                    <nav aria-label="Primary">
                        <ul className="flex flex-row gap-4">
                            <li>
                                <Link
                                    href="/#about"
                                    onClick={handleAnchorClick("about")}
                                    className="px-5 py-2 rounded-md underline decoration-2 underline-offset-5 decoration-transparent hover:decoration-(--accent-tangerine) focus-visible:decoration-(--accent-tangerine) focus-visible:outline-2 focus-visible:outline-(--accent-tangerine) focus-visible:outline-offset-2 transition"
                                >
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/#projects"
                                    onClick={handleAnchorClick("projects")}
                                    className="px-5 py-2 rounded-md underline decoration-2 underline-offset-5 decoration-transparent hover:decoration-(--accent-tangerine) focus-visible:decoration-(--accent-tangerine) focus-visible:outline-2 focus-visible:outline-(--accent-tangerine) focus-visible:outline-offset-2 transition"
                                >
                                    Projects
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/#contact"
                                    onClick={handleAnchorClick("contact")}
                                    className="px-5 py-2 rounded-md underline decoration-2 underline-offset-5 decoration-transparent hover:decoration-(--accent-tangerine) focus-visible:decoration-(--accent-tangerine) focus-visible:outline-2 focus-visible:outline-(--accent-tangerine) focus-visible:outline-offset-2 transition"
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    )
}
