"use client";
import { createContext, useContext, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useMotionPreference } from "../../lib/use-motion-preference";
import { Pause, Play } from "lucide-react";
const Playback = createContext({ playing: false, reduced: false });
export function useSystemPlayback() {
  return useContext(Playback);
}
export function SystemPanel({
  title,
  number,
  children,
  kind,
}: {
  title: string;
  number: number;
  children: React.ReactNode;
  kind: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { amount: 0.12 });
  const reduced = useMotionPreference();
  const [paused, setPaused] = useState(false);
  const playing = visible && !paused && !reduced;
  return (
    <Playback.Provider value={{ playing, reduced }}>
      <div ref={ref} className={"system-panel " + kind} data-playing={playing}>
        <div className="system-toolbar">
          <span>
            <i className="status-dot" /> SYSTEM / 0{number + 1}
          </span>
          <span>{title}</span>
          <button
            className="motion-toggle"
            type="button"
            onClick={() => setPaused(!paused)}
            aria-label={
              (paused ? "Play" : "Pause") +
              " system " +
              (number + 1) +
              " animation"
            }
            aria-pressed={paused}
            disabled={reduced}
          >
            {paused ? <Play size={12} /> : <Pause size={12} />}
            <span>
              {reduced ? "REDUCED MOTION" : paused ? "PAUSED" : "MOTION"}
            </span>
          </button>
        </div>
        {children}
        <div className="system-footnote">
          <span>INTERACTIVE ARCHITECTURE STUDY</span>
          <span>Illustrative presentation · not live telemetry</span>
        </div>
      </div>
    </Playback.Provider>
  );
}
