type VimeoEmbedProps = {
    videoId: string,
    title: string
}

export default function VimeoEmbed({ videoId, title }: VimeoEmbedProps) {
    return (
        <div className="relative w-125 max-w-[80vw] aspect-video overflow-hidden rounded-lg">
            <iframe
                src={`https://player.vimeo.com/video/${videoId}`}
                title={title}
                className="absolute inset-0 w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
            />
        </div>
    )
}
