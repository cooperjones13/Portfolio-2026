import ContactForm from "@/components/ContactForm";
import Header from "@/components/Header";
import LogoLoop from "@/components/LogoLoop";
import Project from "@/components/Project";
import TriangleMesh from "@/components/TriangleMesh";
import Link from "next/link";
import {
  SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiPython, SiHtml5, SiCss3, SiKotlin, SiCplusplus,
  SiNodedotjs, SiMysql, SiClerk, SiFigma, SiGit, SiGithubcopilot, SiPostman, SiClaude,
  SiLinkedin, SiGithub,
} from "react-icons/si";


export default function Home() {

    const iconColor = "#ABC4B7"

    const techLogos = [
      // Languages
      { node: <SiJavascript color={iconColor} tabIndex={-1} className="drop-shadow-md/10"/>, title: "JavaScript", href: "https://developer.mozilla.org/docs/Web/JavaScript" },
      { node: <SiTypescript color={iconColor} tabIndex={-1} className="drop-shadow-md/10"/>, title: "TypeScript", href: "https://www.typescriptlang.org" },
      { node: <SiPython color={iconColor} tabIndex={-1} className="drop-shadow-md/10"/>, title: "Python", href: "https://www.python.org" },
      { node: <SiHtml5 color={iconColor} tabIndex={-1} className="drop-shadow-md/10"/>, title: "HTML", href: "https://developer.mozilla.org/docs/Web/HTML" },
      { node: <SiCss3 color={iconColor} tabIndex={-1} className="drop-shadow-md/10"/>, title: "CSS", href: "https://developer.mozilla.org/docs/Web/CSS" },
      { node: <SiKotlin color={iconColor} tabIndex={-1} className="drop-shadow-md/10"/>, title: "Kotlin", href: "https://kotlinlang.org" },
      { node: <SiCplusplus color={iconColor} tabIndex={-1} className="drop-shadow-md/10"/>, title: "C++", href: "https://isocpp.org" },
      // Frameworks & Libraries
      { node: <SiReact color={iconColor} tabIndex={-1} className="drop-shadow-md/10"/>, title: "React", href: "https://react.dev" },
      { node: <SiNextdotjs color={iconColor} tabIndex={-1} className="drop-shadow-md/10"/>, title: "Next.js", href: "https://nextjs.org" },
      { node: <SiNodedotjs color={iconColor} tabIndex={-1} className="drop-shadow-md/10"/>, title: "Node.js", href: "https://nodejs.org" },
      // Databases
      { node: <SiMysql color={iconColor} tabIndex={-1} className="drop-shadow-md/10"/>, title: "MySQL", href: "https://www.mysql.com" },
      // Tools
      { node: <SiClerk color={iconColor} tabIndex={-1} className="drop-shadow-md/10"/>, title: "Clerk", href: "https://clerk.com" },
      { node: <SiFigma color={iconColor} tabIndex={-1} className="drop-shadow-md/10"/>, title: "Figma", href: "https://figma.com" },
      { node: <SiGit color={iconColor} tabIndex={-1} className="drop-shadow-md/10"/>, title: "Git", href: "https://git-scm.com" },
      { node: <SiGithubcopilot color={iconColor} tabIndex={-1} className="drop-shadow-md/10"/>, title: "GitHub Copilot", href: "https://github.com/features/copilot" },
      { node: <SiPostman color={iconColor} tabIndex={-1} className="drop-shadow-md/10"/>, title: "Postman", href: "https://www.postman.com" },
      { node: <SiClaude color={iconColor} tabIndex={-1} className="drop-shadow-md/10"/>, title: "Claude", href: "https://claude.com" },
    ];

  return (
    <div>
      <Header/>
      <section className="relative flex flex-col min-h-[calc(100vh-5rem)] w-full items-center justify-center text-center gap-7 overflow-hidden">
        <TriangleMesh/>
        <h2 className="relative z-10 text-8xl text-(--foreground) serif">
          Cooper Jones
        </h2>
        <p className="relative z-10 text-4xl">
          Front End Web Developer
        </p>
        <div className="relative z-10 flex flex-row flex-wrap gap-10 justify-center">
          <Link
              href="https://www.linkedin.com/in/cooper-jones-dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-(--accent-darkgreen) w-50 text-center p-3 flex flex-row justify-center items-center gap-5 text-xl hover:bg-(--accent-lightgreen) transition hover:text-(--accent-darkgreen) rounded-lg drop-shadow-sm/50"
              >
                  <SiLinkedin/>
                  LinkedIn
              </Link>
              <Link
                href="https://www.github.com/cooperjones13"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-(--accent-darkgreen) w-50 text-center p-3 flex flex-row justify-center items-center gap-5 text-xl hover:bg-(--accent-lightgreen) transition hover:text-(--accent-darkgreen) rounded-lg drop-shadow-sm/50"
                >
                    <SiGithub/>
                    Github
              </Link>
        </div>
      </section>
      <section id="about" className="flex flex-col min-h-100 w-full items-center justify-center text-center gap-10 bg-(--accent-darkgreen) py-15 scroll-mt-20">
        <div className="flex flex-col text-left max-w-300 gap-5 mx-10">
          <h2 className="text-5xl serif">About Me</h2>
          <p>
            I’m a front-end-focused software engineer finishing my B.S. in Creative Technology and Design at the University of Colorado Boulder, with production experience building in React, Next.js, and TypeScript across internships and a live capstone. As a Front End Developer Intern at Lingoport, I served as the team’s primary front-end engineer, building React components and coordinating with backend engineers on data flow and API design. I’m also leading backend development on Mosh, a mobile-first social app for concert-goers, where I architected the Next.js, Convex, and Clerk stack from the ground up. I enjoy owning features from design through deployment and collaborating closely with backend and product teams to build interfaces that are both intuitive and reliable.
          </p>
        </div>
        <LogoLoop
          logos={techLogos}
          logoHeight={80}
          gap={60}
          scaleOnHover={true}
          speed={80}
          fadeOut={true}
          fadeOutColor="#3B5447"
        />
      </section>
      <section id="projects" className="flex flex-col min-h-100 w-full items-center justify-center text-center gap-10 bg-(--background) py-15 scroll-mt-20">
        <div className="flex flex-col text-left max-w-300 gap-10 mx-10">
          <h2 className="text-5xl serif">Projects</h2>
          <div className="flex flex-wrap justify-center gap-10">
              <Project title="Mosh" imgSrc="/mosh-final-logo.png" id={1}/>
              <Project title="Radii" imgSrc="/radii.png" id={2}/>
              <Project title="PASTIME" imgSrc="/pastime.png" id={3}/>
          </div>
        </div>
      </section> 
      <section id="contact" className="flex flex-col min-h-100 w-full items-center justify-center text-center gap-10 bg-(--accent-darkgreen) py-15 scroll-mt-20">
        <div className="flex flex-col text-left max-w-300 w-full gap-5 px-10">
          <h2 className="text-4xl serif">Contact</h2>
          <div className="flex md:justify-between justify-center w-full items-start flex-wrap gap-5">
            <ContactForm/>
            <div className="flex flex-col gap-10 justify-around">
              <Link
              href="https://www.linkedin.com/in/cooper-jones-dev/"
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-(--background) w-50 text-center p-3 flex flex-row justify-center items-center gap-5 text-xl hover:bg-(--accent-lightgreen) transition hover:text-(--background) rounded-lg drop-shadow-sm/50"
              >
                  <SiLinkedin/>
                  LinkedIn
              </Link>
              <Link
                href="https://www.github.com/cooperjones13"
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-(--background) w-50 text-center p-3 flex flex-row justify-center items-center gap-5 text-xl hover:bg-(--accent-lightgreen) transition hover:text-(--background) rounded-lg drop-shadow-sm/50"
                >
                    <SiGithub/>
                    Github
              </Link>
            
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
