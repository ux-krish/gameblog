import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaDesktop, FaGamepad, FaRegCalendarAlt, FaStar } from "react-icons/fa";
import gsap from "gsap";
import { prefersReducedMotion } from "../utils/motion";

const HeroBanner = ({ slides = [] }) => {
  const [index, setIndex] = useState(0);
  const rootRef = useRef(null);

  useEffect(() => {
    if (slides.length < 2) return undefined;
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 7000);
    return () => clearInterval(t);
  }, [slides.length]);

  useEffect(() => {
    if (!rootRef.current || prefersReducedMotion()) return undefined;

    const activeSlide = rootRef.current.querySelector(`[data-hero-slide="${index}"]`);
    if (!activeSlide) return undefined;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      timeline
        .fromTo(
          activeSlide.querySelector("[data-hero-image]"),
          { scale: 1.12, xPercent: 1.5 },
          { scale: 1, xPercent: 0, duration: 1.6, ease: "power2.out" }
        )
        .fromTo(
          activeSlide.querySelectorAll("[data-hero-copy] > *"),
          { autoAlpha: 0, y: 28 },
          { autoAlpha: 1, y: 0, duration: 0.72, stagger: 0.08 },
          "-=1.08"
        )
        .fromTo(
          "[data-hero-dot]",
          { scale: 0.85, autoAlpha: 0.55 },
          { scale: 1, autoAlpha: 1, duration: 0.35, stagger: 0.035 },
          "-=0.52"
        );
    }, rootRef);

    return () => ctx.revert();
  }, [index, slides.length]);

  if (!slides.length) return null;

  return (
    <div
      ref={rootRef}
      className="relative h-[300px] w-full overflow-hidden rounded-lg sm:h-[400px] md:h-[480px]"
    >
      {slides.map((g, i) => (
        <div
          key={g.id}
          data-hero-slide={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <img
            data-hero-image
            src={g.background_image}
            alt={g.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div data-hero-copy className="absolute bottom-0 left-0 right-0 p-4 text-white sm:p-8">
            <div className="mb-2 flex flex-wrap items-center gap-2 text-xs sm:gap-3 sm:text-sm">
              {g.rating ? (
                <span className="flex items-center gap-1 rounded bg-amber-500/90 px-2 py-0.5 font-bold text-black">
                  <FaStar /> {g.rating.toFixed(1)}
                </span>
              ) : null}
              {g.released ? (
                <span className="flex items-center gap-1 rounded bg-white/20 px-2 py-0.5 backdrop-blur">
                  <FaRegCalendarAlt />
                  <span className="hidden sm:inline">{g.released}</span>
                </span>
              ) : null}
              {g.platforms?.length ? (
                <span className="flex items-center gap-1 rounded bg-white/20 px-2 py-0.5 backdrop-blur">
                  <FaDesktop /> {g.platforms.length}
                </span>
              ) : null}
            </div>

            <h1 className="mb-3 max-w-3xl text-2xl font-extrabold leading-tight drop-shadow-lg sm:text-4xl md:text-5xl">
              {g.name}
            </h1>

            {g.genres?.length ? (
              <div className="mb-4 flex flex-wrap gap-2">
                {g.genres.slice(0, 4).map((gn) => (
                  <Link
                    to={`/genre/${gn.id}`}
                    key={gn.id}
                    className="rounded bg-violet-600/80 px-2 py-1 text-xs transition hover:bg-violet-600"
                  >
                    {gn.name}
                  </Link>
                ))}
              </div>
            ) : null}

            <Link
              to={`/game/${g.id}`}
              className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-4 py-2 font-medium text-white transition hover:bg-violet-700 sm:px-5 sm:py-2.5"
            >
              <FaGamepad /> Explore
            </Link>
          </div>
        </div>
      ))}

      <div className="absolute bottom-3 right-4 z-10 flex gap-1.5 sm:right-5">
        {slides.map((_, i) => (
          <button
            key={i}
            data-hero-dot
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all ${
              i === index ? "w-8 bg-white" : "w-2 bg-white/50"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;
