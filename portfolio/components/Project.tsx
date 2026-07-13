import Image from "next/image"
import Link from "next/link"

type ProjectProps = {
    title: string,
    imgSrc: string,
    id: string
}


export default function Project({title, imgSrc, id}:ProjectProps){

    return (
        <Link 
            className="flex flex-col justify-center items-center text-center gap-5"
            href={`/projects/${id}`}
            prefetch
        >
            <div className="relative aspect-square w-90 max-w-[80vw] container overflow-hidden rounded-lg">
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
            <span className="text-xl">{title}</span>
        </Link>
    )
}