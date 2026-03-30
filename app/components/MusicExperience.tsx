"use client";

import { useState } from "react";
import type { MusicStyle, MusicStyleSlug } from "../data/music-styles";
import MusicDetails from "./MusicDetails";

type MusicExperienceProps = {
  styles: MusicStyle[];
};

export default function MusicExperience({ styles }: MusicExperienceProps) {
  const [activeSlug, setActiveSlug] = useState<MusicStyleSlug | null>(null);
  const activeStyle = styles.find((style) => style.slug === activeSlug) ?? null;

  return (
    <div className="experience-shell relative min-h-screen overflow-hidden text-stone-100">
      <div className="grid min-h-screen grid-cols-1 grid-rows-4 gap-px bg-white/8 md:grid-cols-2 md:grid-rows-2">
        {styles.map((style) => (
          <button
            key={style.slug}
            type="button"
            onClick={() => setActiveSlug(style.slug)}
            className="genre-panel group relative flex min-h-[24vh] flex-col justify-center overflow-hidden border border-white/10 px-5 py-5 text-left transition duration-300 ease-out hover:border-white/25 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/60 md:min-h-[calc(50vh-0.5rem)] md:px-8 md:py-7"
            style={{
              background: `linear-gradient(145deg, ${style.themeColors.background}, ${style.themeColors.accent})`,
              color: style.themeColors.foreground,
            }}
            aria-label={`Open ${style.title}`}
          >
            <div className="pointer-events-none absolute inset-x-5 top-5 z-0 flex items-center justify-between opacity-90 md:inset-x-8 md:top-7">
              <span className="rounded-full border border-white/18 bg-black/10 px-3 py-1 text-[10px] uppercase tracking-[0.35em] backdrop-blur-sm">
                {style.shortLabel}
              </span>
            </div>

            <div className="relative z-10 max-w-xl space-y-3">
              <h2 className="max-w-[10ch] text-[2.45rem] font-semibold leading-none tracking-[-0.04em] md:text-[4.6rem]">
                {style.title}
              </h2>
              <p className="max-w-md text-sm leading-6 opacity-90 md:text-[1.02rem] md:leading-7">
                {style.summary}
              </p>
            </div>
          </button>
        ))}
      </div>

      {activeStyle ? (
        <MusicDetails
          key={activeStyle.slug}
          activeStyle={activeStyle}
          onClose={() => setActiveSlug(null)}
        />
      ) : null}
    </div>
  );
}
