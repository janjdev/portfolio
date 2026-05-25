import {HeroTextItems} from "./HeroTextItems";
import RotatingWord from "../rotating-text/RotatingText";


type HeroTextProps = {
  items: HeroTextItems[];
  containerClassName?: string;
  leadClassName?: string;
  wordClassName?: string;
};

export default function HeroText({ items=HeroTextItems, containerClassName, leadClassName, wordClassName }: HeroTextProps) {
  return (
    <div className={`flex flex-col gap-6 ${containerClassName || ''}`}>
      {items.map((item, idx) => (
        <div key={idx} className="text-3xl md:text-4xl lg:text-6xl font-black">
          <span className={`text-[color:var(--primary-text)] ${leadClassName || ''}`}>{item.lead} </span>
          <span className={`text-[color:var(--accent)] ${wordClassName || ''}`}>
            <RotatingWord
                  startDelay={2000}
                  words={item.words}
                  effect="typing"
                  timingMode="alternate"
                  instanceIndex={idx}
                  visibleDuration={6000}
                  enterDuration={350}
                  exitDuration={300}
                  alternateOffset={2000}
                />
          </span>
        </div>
      ))}
    </div>
  );
}