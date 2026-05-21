import Nav from "../nav/Nav";

import GitHubIcon from "../../assets/git.svg";
import LinkedInIcon from "../../assets/linkedin.svg";



export default function Sidebar() {
  return (
    <>
      <aside className="hidden md:flex w-64 h-screen border-r border-black/10 p-8 flex-col justify-between">
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-black leading-none tracking-tight">JJ</span>
            <span className="w-1.5 h-1.5 rounded-full --accent" />
          </div>
        </div>
        <Nav />
        <div className="text-xs text-black/40">
            <div className="socials  flex flex-col gap-6 ">
            <div className="text-black/50 hover:text-[#FF2D75] transition-colors duration-200">
              <a href="https://github.com/janjdev" target="_blank" rel="noopener noreferrer">
                <GitHubIcon alt="GitHub" className="inline w-10 h-10 mr-1 hover:fill-[#FF2D75] transition-colors duration-200" width={16} height={16} />
              </a>
            </div>
            <div>
              <a href="https://www.linkedin.com/in/janjdev/" target="_blank" rel="noopener noreferrer">
                <LinkedInIcon alt="LinkedIn" className="inline w-10 h-10 mr-1 hover:fill-[#FF2D75] transition-colors duration-200" width={16} height={16} />
              </a>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}