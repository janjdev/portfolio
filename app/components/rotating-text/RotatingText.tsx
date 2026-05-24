"use client";

import { useEffect, useState } from "react";

type DisplayEffect = "reveal" | "typing";
type TimingMode = "sync" | "alternate" | "custom";

type Phase = "entering" | "visible" | "exiting";

type RotatingWordProps = {
  words: string[];

  effect?: DisplayEffect;

  /**
   * How long the word stays fully visible before exit begins.
   */
  visibleDuration?: number;

  /**
   * How long the enter animation takes.
   * This should match the CSS animation duration.
   */
  enterDuration?: number;

  /**
   * How long the exit animation takes.
   * This should match the CSS animation duration.
   */
  exitDuration?: number;

  /**
   * Initial delay before this instance starts running.
   */
  startDelay?: number;

  /**
   * Controls how multiple RotatingWord instances are timed.
   */
  timingMode?: TimingMode;

  /**
   * Used by alternate mode.
   */
  instanceIndex?: number;

  /**
   * Delay added per instance in alternate mode.
   */
  alternateOffset?: number;

  /**
   * Used by custom mode.
   */
  customOffset?: number;

  className?: string;
};

type RotatingWordState = {
  index: number;
  phase: Phase;
};

/**
 * Shared across all RotatingWord instances in this module.
 * This keeps multiple instances on the same timeline.
 */
const timelineStart = Date.now();

export default function RotatingWord({
  words,
  effect = "reveal",
  visibleDuration = 1800,
  enterDuration = 350,
  exitDuration = 300,
  startDelay = 0,
  timingMode = "sync",
  instanceIndex = 0,
  alternateOffset = 900,
  customOffset = 0,
  className = "",
}: RotatingWordProps) {
  const [state, setState] = useState<RotatingWordState>({
    index: 0,
    phase: "entering",
  });

  useEffect(() => {
    if (words.length <= 1) return;

    let animationFrameId: number;

    const cycleDuration = enterDuration + visibleDuration + exitDuration;

    let offset = startDelay;

    if (timingMode === "alternate") {
      offset += instanceIndex * alternateOffset;
    }

    if (timingMode === "custom") {
      offset += customOffset;
    }

    const update = () => {
      const elapsed = Date.now() - timelineStart - offset;

      if (elapsed < 0) {
        setState((currentState) => {
          if (currentState.index === 0 && currentState.phase === "entering") {
            return currentState;
          }

          return {
            index: 0,
            phase: "entering",
          };
        });

        animationFrameId = window.requestAnimationFrame(update);
        return;
      }

      const cyclePosition = elapsed % cycleDuration;
      const cycleCount = Math.floor(elapsed / cycleDuration);
      const nextIndex = cycleCount % words.length;

      let nextPhase: Phase = "visible";

      if (cyclePosition < enterDuration) {
        nextPhase = "entering";
      } else if (cyclePosition < enterDuration + visibleDuration) {
        nextPhase = "visible";
      } else {
        nextPhase = "exiting";
      }

      setState((currentState) => {
        if (
          currentState.index === nextIndex &&
          currentState.phase === nextPhase
        ) {
          return currentState;
        }

        return {
          index: nextIndex,
          phase: nextPhase,
        };
      });

      animationFrameId = window.requestAnimationFrame(update);
    };

    animationFrameId = window.requestAnimationFrame(update);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [
    words.length,
    visibleDuration,
    enterDuration,
    exitDuration,
    startDelay,
    timingMode,
    instanceIndex,
    alternateOffset,
    customOffset,
  ]);

  const animationClass = getAnimationClass(effect, state.phase);

  return (
    <span
      key={`${state.index}-${state.phase}`}
      className={`inline-block ${animationClass} ${className}`}
    >
      {words[state.index]}
    </span>
  );
}

function getAnimationClass(effect: DisplayEffect, phase: Phase) {
  if (phase === "visible") {
    return "";
  }

  if (effect === "typing") {
    return phase === "entering" ? "animate-typeIn" : "animate-typeOut";
  }

  return phase === "entering" ? "animate-revealIn" : "animate-revealOut";
}