"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { MusicStyle } from "../data/music-styles";

type MusicDetailsProps = {
  activeStyle: MusicStyle;
  onClose: () => void;
};

const DETAIL_VIEW_TIMEOUT_MS = 45_000;
const POSTER_TIMEOUT_MS = 3_000;

export default function MusicDetails({
  activeStyle,
  onClose,
}: MusicDetailsProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const posterCloseTimeoutRef = useRef<number | null>(null);
  const [hasVideoError, setHasVideoError] = useState(false);

  const resetVideo = useCallback(() => {
    const video = videoRef.current;

    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  }, []);

  const playVideo = useCallback(async () => {
    const video = videoRef.current;

    if (video) {
      video.currentTime = 0;
      try {
        await video.play();
      } catch {
        // Fall back to muted playback when the browser blocks autoplay with audio.
        video.muted = true;
        await video.play();
      }
    }
  }, []);

  const closeDetailView = useCallback(() => {
    if (posterCloseTimeoutRef.current !== null) {
      window.clearTimeout(posterCloseTimeoutRef.current);
      posterCloseTimeoutRef.current = null;
    }

    resetVideo();
    onClose();
  }, [onClose, resetVideo]);

  const showPoster = useCallback(() => {
    const video = videoRef.current;

    if (video) {
      video.pause();
      video.currentTime = 0;
      video.load();
    }

    if (posterCloseTimeoutRef.current !== null) {
      window.clearTimeout(posterCloseTimeoutRef.current);
    }

    posterCloseTimeoutRef.current = window.setTimeout(() => {
      closeDetailView();
    }, POSTER_TIMEOUT_MS);
  }, [closeDetailView]);

  useEffect(() => {
    if (!activeStyle) {
      return;
    }

    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeDetailView();
      }
    };

    const timeoutId = window.setTimeout(() => {
      closeDetailView();
    }, DETAIL_VIEW_TIMEOUT_MS);

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.clearTimeout(timeoutId);
      if (posterCloseTimeoutRef.current !== null) {
        window.clearTimeout(posterCloseTimeoutRef.current);
        posterCloseTimeoutRef.current = null;
      }
    };
  }, [activeStyle, closeDetailView]);

  useEffect(() => {
    if (!activeStyle) {
      return;
    }

    const video = videoRef.current;

    if (video) {
      video.load();
    }

    const timeoutId = window.setTimeout(() => {
      void playVideo();
    }, POSTER_TIMEOUT_MS);

    return () => {
      window.clearTimeout(timeoutId);
      resetVideo();
    };
  }, [activeStyle, playVideo, resetVideo]);

  return (
    <section
      className="detail-overlay absolute inset-0 z-20 flex min-h-screen flex-col overflow-y-auto p-3 md:p-4"
      style={{
        background: `linear-gradient(160deg, ${activeStyle.themeColors.background}, ${activeStyle.themeColors.accent})`,
        color: activeStyle.themeColors.foreground,
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`${activeStyle.title} detail view`}
    >
      <div
        className="absolute inset-0 opacity-25"
        style={{
          background:
            "radial-gradient(circle at top right, rgba(255,255,255,0.5), transparent 30%)",
        }}
      />

      <div className="detail-card relative z-10 flex min-h-[calc(100vh-1.5rem)] flex-col rounded-[2rem] border border-white/14 px-5 py-5 backdrop-blur-md md:min-h-[calc(100vh-2rem)] md:px-9 md:py-8">
        <div className="mb-6 flex items-center justify-between gap-4 md:mb-8">
          <p className="text-[10px] font-medium uppercase tracking-[0.42em] opacity-75 md:text-xs">
            Music of Puerto Rico
          </p>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeDetailView}
            className="rounded-full border border-white/25 bg-black/15 px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] backdrop-blur-sm transition hover:bg-black/25 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/60 md:text-sm"
            aria-label={`Close ${activeStyle.title} detail view`}
          >
            Close
          </button>
        </div>

        <div className="grid flex-1 gap-8 md:grid-cols-[minmax(0,0.92fr)_minmax(0,1.28fr)] md:items-center md:gap-10">
          <div className="flex max-w-xl flex-col justify-center gap-8 md:mx-auto">
            <div className="space-y-5">
              <h2 className="text-[2.7rem] font-semibold leading-none tracking-[-0.05em] md:text-7xl">
                {activeStyle.title}
              </h2>
              <p className="text-base leading-7 opacity-95 md:text-2xl md:leading-8">
                {activeStyle.summary}
              </p>
              <p className="text-base leading-7 opacity-90 md:text-xl md:leading-8">
                {activeStyle.description}
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-[1.75rem] border border-white/15 bg-black/20 shadow-[0_24px_70px_rgba(0,0,0,0.28)] backdrop-blur-sm">
            <div className="p-2 md:p-3">
              {activeStyle.videoSrc && !hasVideoError ? (
                <video
                  key={activeStyle.slug}
                  ref={videoRef}
                  className="aspect-video h-full w-full rounded-[1.2rem] bg-black object-cover"
                  controls
                  onEnded={showPoster}
                  onError={() => setHasVideoError(true)}
                  preload="auto"
                  playsInline
                  poster={activeStyle.posterSrc}
                >
                  <source src={activeStyle.videoSrc} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="flex aspect-video items-center justify-center rounded-[1.2rem] border border-dashed border-white/20 bg-black/30 px-6 text-center text-sm opacity-80 md:text-base">
                  Video unavailable. Restore the original files under `public/videos` to re-enable playback.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
