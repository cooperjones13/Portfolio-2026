import Link from "next/link"
import { IoGlobeOutline, IoNewspaperOutline, IoOpenOutline } from "react-icons/io5";
import { SiAdobecreativecloud, SiArduino, SiClaude, SiClerk, SiExpress, SiFigma, SiGithub, SiNextdotjs, SiNodedotjs, SiReact, SiTypescript, SiVite, SiWordpress } from "react-icons/si";
import ConvexIcon from "@/components/icons/ConvexIcon";
import ImageCarousel from "@/components/ImageCarousel";
import VimeoEmbed from "@/components/VimeoEmbed";
import Header from "@/components/Header";

export default async function ProjectPage(props: PageProps<'/projects/[id]'>){


    const pageData = [
        {
            title: "Mosh",
            subtitle: "Full Stack Web Application",
            id: "mosh",
            images: [
                "/mosh-renders/home-render.png",
                "/mosh-renders/event-page-render.png",
                "/mosh-renders/messages-render.png",
                "/mosh-renders/my-profile-tab-render.png",
            ],
            imgAlt:"Screenshot of Mosh application",
            videoId: "1185227919",
            description: "MOSH is a social platform designed to enhance the concert experience. You can create or join groups, meet up before a show, and experience the energy of live music together with your new crew. Turn every concert into a social experience - find your show, find your people, and FIND YOUR MOSH!\n\nMy Role:\n• Led backend development on a 3-person team building Mosh, a mobile-first social app for concert attendees to connect at events.\n• Architected the app’s technical foundation: chose the Next.js, Convex, and Clerk stack and designed the Convex database schema.\n• Developed event and artist import workflows from the Ticketmaster API, with search by genre, artist lookup, and profile data.\n• Fixed authentication and privacy bugs to gate access to protected pages and DM threads; used Convex real-time updates for messaging.\n• Used GitHub Copilot and Claude to review pull requests across the team, catching bugs before merge.",
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
                    icon: <ConvexIcon size={16}/>
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
            title: "Tacked",
            subtitle: "Full Stack Job Search Platform",
            id: "tacked",
            images: [
                "/tacked-renders/01-board-light.png",
                "/tacked-renders/02-board-dark.png",
                "/tacked-renders/03-detail-empty.png",
                "/tacked-renders/04-detail-analyzed.png",
                "/tacked-renders/05-cover-letter.png",
                "/tacked-renders/06-interview-prep.png",
                "/tacked-renders/07-analytics.png",
                "/tacked-renders/08-resumes.png",
                "/tacked-renders/09-mobile-board.png",
            ],
            imgAlt: "Screenshot of Tacked application",
            videoId: undefined as string | undefined,
            description: "Tacked is a full-stack job tracker I built to get rid of the spreadsheet everyone ends up using during a job search. It's a Kanban board - Interested, Applied, Interview, Offer, Rejected - but the part I actually care about is the AI underneath it. Upload a resume and paste in a job description, and it scores your fit for that specific role, breaks down where you're strong and where you're not, drafts a tailored cover letter, and builds out an interview prep sheet with behavioral, technical, role-specific, and culture questions.\n\nThe resume analysis sends the actual PDF straight to Claude as a native document input instead of extracting the text first, so formatting and layout aren't lost before the model ever sees them. I used Anthropic's tool-use API to force the response into a fixed schema rather than hoping a parser can make sense of freeform text. The cover letter generator was the harder problem: I wrote a 12-rule prompt aimed squarely at the tells that give AI-written cover letters away - no em dashes, no \"not only X but also Y,\" no stock openers, no clichés - so what comes out actually reads like someone wrote it.\n\nUnderneath all of that is Convex, which pushes every update to the board in real time and keeps each user's data isolated server-side through Clerk auth. Dragging a card between stages updates the UI immediately and reconciles with the server after the fact, and every move gets logged to a history table that feeds the analytics view - weekly application volume, plus a live funnel across the pipeline.",
            tags: [
                {
                    name: "React",
                    icon: <SiReact/>
                },
                {
                    name: "Typescript",
                    icon: <SiTypescript/>
                },
                {
                    name: "Vite",
                    icon: <SiVite/>
                },
                {
                    name: "Convex",
                    icon: <ConvexIcon size={16}/>
                },
                {
                    name: "Clerk",
                    icon: <SiClerk/>
                },
                {
                    name: "Claude",
                    icon: <SiClaude/>
                }
            ],
            links:[
                {
                    name:"Live Site",
                    icon: <IoGlobeOutline/>,
                    url: "https://tacked.cooperjones.dev"
                },
                {
                    name:"Github Repo",
                    icon: <SiGithub/>,
                    url: "https://github.com/cooperjones13/interview-helper"
                }
            ]
        },
        {
            title: "Radii",
            subtitle: "UX Design for Mobile Application",
            id: "radii",
            images: [
                "/radii-renders/capstone-prototype-3.png",
                "/radii-renders/capstone-prototype-2.png",
                "/radii-renders/capstone-prototype-1.png",
                "/radii-renders/capstone-prototype-4.png",
                "/radii-renders/capstone-prototype-5.png",
            ],
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
            id: "pastime",
            images: ["/pastime.png"],
            imgAlt:"Screenshot of web component",
            videoId: "379934243",
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
                        {data.videoId &&
                            <div className="pt-5 w-full">
                                <VimeoEmbed videoId={data.videoId} title={`${data.title} demo video`} />
                            </div>
                        }
                    </div>
                    <div className="w-full max-w-125 lg:min-w-[400px] lg:shrink-0 order-1 lg:order-2">
                        <ImageCarousel images={data.images} alt={data.imgAlt} />
                    </div>
                </div>

            </section>
        </div>
    )
}