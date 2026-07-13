import Image from "next/image"
import Link from "next/link"

type ProjectProps = {
    title: string,
    imgSrc: string,
    id: string,
    description: string,
    tags: string[],
}


export default function Project({title, imgSrc, id, description, tags}:ProjectProps){

    return (
        <Link
            className="flex flex-row items-center gap-8 w-full text-left rounded-lg p-4 -m-4 hover:bg-(--accent-darkgreen)/20 focus-visible:outline-2 focus-visible:outline-(--accent-tangerine) focus-visible:outline-offset-2 transition"
            href={`/projects/${id}`}
            prefetch
        >
            <div className="relative aspect-square w-40 sm:w-48 shrink-0 overflow-hidden rounded-lg">
                <Image
                src={imgSrc}
                fill
                alt=""
                quality={70}
                sizes="100%"
                className="object-cover blur-sm scale-110"
            />
            <Image
                src={imgSrc}
                fill
                alt=""
                sizes="100%"
                className="object-contain scale-90 hover:scale-95 transition-transform duration-400"
            />
            </div>
            <div className="flex flex-col gap-2 min-w-0">
                <h3 className="text-xl serif">{title}</h3>
                <p className="text-sm text-(--foreground)/80">{description}</p>
                <ul className="flex flex-row gap-2 flex-wrap">
                    {tags.map((tag) =>
                        <li key={tag} className="border border-(--accent-lightgreen)/40 text-(--accent-lightgreen) text-xs px-3 py-1 rounded-full">
                            {tag}
                        </li>
                    )}
                </ul>
            </div>
        </Link>
    )
}
