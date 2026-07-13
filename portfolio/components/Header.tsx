"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Header(){
    const pathname = usePathname()

    const handleAnchorClick = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (pathname !== "/") return
        const target = document.getElementById(id)
        if (!target) return
        e.preventDefault()
        target.scrollIntoView({ behavior: "smooth" })
        history.pushState(null, "", `/#${id}`)
    }

    return (
        <header className="sticky top-0 z-50 flex flex-row justify-center w-full bg-(--background)/80 backdrop-blur-sm border-b border-(--accent-darkgreen)/40">
            <div className="flex flex-row justify-center md:justify-between w-full max-w-300 h-20 items-center mx-10">
                <Link href="/" className="hidden flex-col justify-center items-center md:flex">
                    <Image src={"/logo-white.png"} alt="Cooper Jones Logo" width={35} height={35}/>
                </Link>
                <ul className="flex flex-row gap-4">
                    <li>
                        <Link
                            href="/#about"
                            onClick={handleAnchorClick("about")}
                            className="px-5 py-2 underline decoration-2 underline-offset-5 decoration-transparent hover:decoration-(--accent-tangerine) transition"
                        >
                            About
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/#projects"
                            onClick={handleAnchorClick("projects")}
                            className="px-5 py-2 underline decoration-2 underline-offset-5 decoration-transparent hover:decoration-(--accent-tangerine) transition"
                        >
                            Projects
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/#contact"
                            onClick={handleAnchorClick("contact")}
                            className="px-5 py-2 underline decoration-2 underline-offset-5 decoration-transparent hover:decoration-(--accent-tangerine) transition"
                        >
                            Contact
                        </Link>
                    </li>
                </ul>
            </div>
        </header>
    )
}
