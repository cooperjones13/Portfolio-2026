import Link from "next/link"
import { IoGlobeOutline, IoNewspaperOutline, IoOpenOutline } from "react-icons/io5";
import { SiAdobecreativecloud, SiArduino, SiClerk, SiExpress, SiFigma, SiGithub, SiNextdotjs, SiNodedotjs, SiReact, SiTypescript, SiWordpress } from "react-icons/si";
import { DatabaseZap } from "lucide-react";
import ImageCarousel from "@/components/ImageCarousel";
import VimeoEmbed from "@/components/VimeoEmbed";
import Header from "@/components/Header";

export default async function ProjectPage(props: PageProps<'/projects/[id]'>){


    const pageData = [
        {
            title: "Mosh",
            subtitle: "Full Stack Web Application",
            id: "1",
            images: [
                "/mosh-renders/home-render.png",
                "/mosh-renders/event-page-render.png",
                "/mosh-renders/messages-render.png",
                "/mosh-renders/my-profile-tab-render.png",
            ],
            imgAlt:"Screenshot of Mosh application",
            videoId: "1185227919",
            description: "MOSH is a social platform designed to enhance the concert experience. You can create or join groups, meet up before a show, and experience the energy of live music together with your new crew. Turn every concert into a social experience - find your show, find your people, and FIND YOUR MOSH!",
            tags: [
                {
                    name: "React",
                    icon: <SiReact />
                },
                {
                    name: "Typescript",
                    icon: <SiTypescript/>
                },
                {
                    name: "Next.js",
                    icon: <SiNextdotjs/>
                },
                {
                    name: "Clerk",
                    icon: <SiClerk/>
                },
                {
                    name: "Convex",
                    icon: <DatabaseZap size={16}/>
                }
            ],
            links:[
                {
                    name:"Live Site",
                    icon: <IoGlobeOutline/>,
                    url: "https://mosh-social.com"
                },
                {
                    name:"Dev Blog",
                    icon: <IoNewspaperOutline/>,
                    url: "https://blog.mosh-social.com"
                },
                {
                    name:"Github Repo",
                    icon: <SiGithub/>,
                    url: "https://github.com/cooperjones13/capstone"
                }
            ]
        },
        {
            title: "Radii",
            subtitle: "UX Design for Mobile Application",
            id: "2",
            images: ["/radii.png"],
            imgAlt:"Mock Layout for Application",
            videoId: undefined as string | undefined,
            description: "Radii is a concept for a social music-sharing and listening app built to make discovering and enjoying music with friends more seamless. Instead of relying on traditional streaming links, Radii creates a space where users can share tracks, explore what others are listening to, and even join real-time listening sessions together. \n \n The design process included user research, iterative interface sketches, and the creation of a high-fidelity Figma prototype focused on three core areas: a personalized music feed, a live listening feature, and a discovery page. To ground the concept in real functionality, I also developed a backend prototype using Node.js and the Spotify API, along with a structured data model for users, tracks, artists, albums, and playlists. \n \n Radii showcases a full product workflow - from identifying a problem in the way people share music to designing intuitive, connected experiences supported by real data integration.",
            tags: [
                {
                    name: "Figma",
                    icon: <SiFigma />
                },
                {
                    name: "Adobe CC",
                    icon: <SiAdobecreativecloud />
                },
                {
                    name: "Node.js",
                    icon: <SiNodedotjs />
                },
            ],
            links:[
                {
                    name:"Project Blog",
                    icon: <SiWordpress/>,
                    url: "https://cooperjonesdesign.wordpress.com/category/capstone/"
                },
            ]
        },
        {
            title: "Pastime",
            subtitle: "Digital Physical Interface",
            id: "3",
            images: ["/pastime.png"],
            imgAlt:"Screenshot of web component",
            videoId: undefined as string | undefined,
            description: "Pastime is a physical–digital system for exploring Major League Baseball team history and statistics. Users select a team by scanning a custom baseball embedded with an RFID chip and adjust the season using a sliding potentiometer. Data from the Arduino hardware is sent to an Express.js API, which interprets the inputs and provides the team ID, slider value, and color scheme. A React-based frontend then requests data from the MLB Stats API and updates the display in real time, creating a seamless interactive experience that connects physical interaction with live, API-driven information.",
            tags: [
                {
                    name:"React",
                    icon: <SiReact/>
                },
                {
                    name: "Arduino",
                    icon: <SiArduino/>
                },
                {
                    name: "Express",
                    icon: <SiExpress/>
                }
            ],
            links:[
                {
                    name:"Github Repo",
                    icon: <SiGithub/>,
                    url: "https://github.com/cooperjones13/object-react"
                },
                {
                    name:"Project Blog",
                    icon: <SiWordpress/>,
                    url: "https://cooperjonesdesign.wordpress.com/category/object/"
                },
            ]
        }
    ]

    const {id} = await props.params;
    const data = pageData.find(project => project.id === id)!
    




    return(
        <div className="min-h-screen">
            <Header/>
            <section className="flex flex-col justify-center items-center gap-10 px-10 py-10">
                <div className="flex flex-col lg:flex-row w-full max-w-400 gap-10 justify-center items-center lg:items-start">
                    <div className="flex flex-col gap-5 max-w-150 min-w-0 order-2 lg:order-1">
                        <h1 className="text-3xl font-bold serif tracking-wider">{data.title}</h1>
                        <strong>{data.subtitle}</strong>
                        <ul className="flex flex-row gap-3 flex-wrap">
                            {data.tags.map((tag, index)=>
                                <li key={index} className="flex flex-row justify-center items-center gap-2 border border-(--accent-lightgreen)/40 text-(--accent-lightgreen) text-sm px-3 py-1 rounded-full">
                                    {tag.icon} {tag.name}
                                </li>
                            )}
                        </ul>
                        <p style={{ whiteSpace: "pre-line" }}>{data.description}</p>
                        <div className="flex flex-row gap-5 flex-wrap">
                            {data.links.map((link, index)=>
                                <Link 
                                    href = {link.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    key={index} 
                                    className="flex flex-row justify-center items-center gap-2 bg-(--accent-darkgreen) p-2 rounded-md hover:bg-(--accent-lightgreen) hover:text-(--background)"
                                    >
                                    {link.icon} {link.name} <IoOpenOutline/>
                                </Link>
                            )}
                        </div>
                    </div>
                    <div className="w-full max-w-125 lg:min-w-[400px] lg:shrink-0 order-1 lg:order-2">
                        <ImageCarousel images={data.images} alt={data.imgAlt} />
                    </div>
                </div>

                {data.videoId &&
                    <VimeoEmbed videoId={data.videoId} title={`${data.title} demo video`} />
                }

            </section>
        </div>
    )
}