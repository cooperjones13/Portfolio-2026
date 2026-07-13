import Link from "next/link"
import { SiGithub, SiLinkedin } from "react-icons/si"

export default function Footer() {
    const year = new Date().getFullYear()

    return (
        <footer className="flex flex-col items-center gap-4 w-full bg-(--background) border-t border-(--accent-darkgreen)/40 py-6 px-10 text-sm text-(--foreground)/70">
            <div className="flex flex-col sm:flex-row justify-between items-center w-full max-w-300 gap-4">
                <p>&copy; {year} Cooper Jones. All rights reserved.</p>
                <nav aria-label="Footer">
                    <ul className="flex flex-row gap-6">
                        <li>
                            <Link href="/#about" className="rounded-md hover:text-(--foreground) focus-visible:outline-2 focus-visible:outline-(--accent-tangerine) focus-visible:outline-offset-2 transition-colors">About</Link>
                        </li>
                        <li>
                            <Link href="/#projects" className="rounded-md hover:text-(--foreground) focus-visible:outline-2 focus-visible:outline-(--accent-tangerine) focus-visible:outline-offset-2 transition-colors">Projects</Link>
                        </li>
                        <li>
                            <Link href="/#contact" className="rounded-md hover:text-(--foreground) focus-visible:outline-2 focus-visible:outline-(--accent-tangerine) focus-visible:outline-offset-2 transition-colors">Contact</Link>
                        </li>
                    </ul>
                </nav>
                <div className="flex flex-row gap-4">
                    <Link
                        href="https://www.linkedin.com/in/cooper-jones-dev/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        className="rounded-md hover:text-(--foreground) focus-visible:outline-2 focus-visible:outline-(--accent-tangerine) focus-visible:outline-offset-2 transition-colors"
                    >
                        <SiLinkedin size={18}/>
                    </Link>
                    <Link
                        href="https://www.github.com/cooperjones13"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        className="rounded-md hover:text-(--foreground) focus-visible:outline-2 focus-visible:outline-(--accent-tangerine) focus-visible:outline-offset-2 transition-colors"
                    >
                        <SiGithub size={18}/>
                    </Link>
                </div>
            </div>
        </footer>
    )
}
