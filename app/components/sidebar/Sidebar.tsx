import Nav from "../nav/Nav";
import EmailSection from "../email-section/EmailSection";
import ThemeToggle from "../theme-toggle/ThemeToggle";
import Socials from "../socials/Socials";
import styles from "./Sidebar.module.css";



export default function Sidebar() {
  return (
    <>
      <aside className="hidden md:flex w-64 border-r theme-border surface-bg p-8 pointer-events-auto">
        <div className="flex h-full w-full flex-col justify-between">
          <div className="shrink-0 flex flex-row justify-between items-center">
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black leading-none tracking-tight text-[color:var(--primary-text)]">JJ</span>
              <span className="w-1.5 h-1.5 rounded-full --accent" />
            </div>
            <ThemeToggle compact />
          </div>

          <div className="flex flex-1 items-center py-10">
            <Nav />
          </div>

          <div className="shrink-0 pb-2 text-xs text-[color:var(--muted-text)] flex flex-col">
            <EmailSection className={` ${styles.jl} ml-[-30px]`} />
            <Socials direction="column" size="sm" className={`mt-5 ${styles.jl}`}/>
          </div>
        </div>
      </aside>
    </>
  );
}