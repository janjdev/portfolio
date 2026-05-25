import  HeroText from "../components/hero-text/HeroText";
import ArrowUpRightIcon from "../assets/arrow-up-right.svg";
import DownloadIcon from "../assets/download.svg";
import ThemeImage from "../components/theme-image/ThemeImage";


export default function Home() {
  return (
    <main className="h-full relative w-full">
      <section className="px-6 pt-15 pb-14 md:px-10 lg:px-16 flex flex-col gap-6">
        <div className="eyebrow text-xs md:text-2xl lg:text-base flex flex-col md:flex-row gap-1 uppercase tracking-[3px] --extra-bold">
          <span className="text-[color:var(--greeting-text)]">Hello, I&apos;m</span>
          <span className="text-[color:var(--accent)]">January Johnson</span>
        </div>
        <HeroText />
        <p>
         I’m a full-stack software engineer working across user-facing applications, backend systems, data workflows, deployment automation, and AI-supported tools. My experience includes production feature work, full-stack application ownership, database-driven systems, CI/CD, containers, and cloud deployment. Current work extends that foundation into RAG, AI-assisted pipelines, and practical AI workflows for modern applications.
        </p>
        <div className="mt-10 flex w-full flex-col md:flex-row gap-5 justify-between">
          <a
            href="#projects"
            className="group flex h-14 items-center justify-between border border-[color:var(--primary-text)] px-6 text-xs font-bold uppercase tracking-[0.22em] text-[color:var(--primary-text)] transition-colors hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
          >
            <span>View Selected Work</span>

            <ArrowUpRightIcon
              aria-hidden="true"
              className="h-5 w-5 text-[color:var(--accent)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>

          <a
            href="/January-Johnson-Resume.pdf"
            download
            className="group flex h-9 items-center justify-between border-b border-[color:var(--primary-text)] px-6 text-xs font-bold uppercase tracking-[0.22em] text-[color:var(--primary-text)] transition-colors hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
          >
            <span>Download Resume</span>

            <DownloadIcon
              aria-hidden="true"
              className="h-5 w-5 transition-transform group-hover:translate-y-0.5"
            />
          </a>
        </div>
    </section>
    <div className="w-15 h-15 pointer-events-all rounded-full border-2 border-[color:var(--primary-text)] absolute bottom-4 lg:top-4 right-4 background-[color:var(--background)] hidden md:flex  ">
          <ThemeImage
            lightSrc="/logo-light.svg"
            darkSrc="/logo-dark.svg"
            alt="Janjdev Logo"
            className="mx-w-full h-full absolute mx-auto left-0 top-0"
          />
        </div>
    </main>
  );
}
