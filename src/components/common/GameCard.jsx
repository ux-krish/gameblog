import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaDesktop, FaHeart, FaRegHeart, FaStar } from "react-icons/fa6";
import gsap from "gsap";
import { useWishlist } from "../../context/WishlistContext";
import { prefersReducedMotion } from "../../utils/motion";

const GameCard = ({ game, compact = false }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const saved = isInWishlist(game.id);
  const cardRef = useRef(null);

  useEffect(() => {
    if (!cardRef.current || prefersReducedMotion()) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { autoAlpha: 0, y: 26, scale: 0.965, rotateX: 5 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 0.55,
          delay: Math.min((game.id % 8) * 0.035, 0.22),
          ease: "power3.out",
        }
      );
    }, cardRef);

    return () => ctx.revert();
  }, [game.id]);

  const handleHeart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(game);
  };

  const handleEnter = () => {
    if (!cardRef.current || prefersReducedMotion()) return;
    gsap.to(cardRef.current, {
      y: -8,
      scale: 1.025,
      rotateX: 1.5,
      rotateY: -1.5,
      duration: 0.28,
      ease: "power2.out",
    });
    gsap.to(cardRef.current.querySelector("img"), {
      scale: 1.08,
      duration: 0.45,
      ease: "power2.out",
    });
  };

  const handleLeave = () => {
    if (!cardRef.current || prefersReducedMotion()) return;
    gsap.to(cardRef.current, {
      y: 0,
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      duration: 0.36,
      ease: "power3.out",
    });
    gsap.to(cardRef.current.querySelector("img"), {
      scale: 1,
      duration: 0.42,
      ease: "power3.out",
    });
  };

  return (
    <Link
      ref={cardRef}
      data-gsap-card
      to={`/game/${game.id}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="gsap-card group block h-full overflow-hidden rounded-lg bg-slate-200/90 shadow transition-shadow duration-300 ease-out hover:shadow-violet-500/30 dark:bg-slate-800"
    >
      <div className="relative">
        <img
          src={game.background_image || "/vite.svg"}
          alt={game.name}
          className={`w-full object-cover ${
            compact ? "aspect-[16/10]" : "aspect-[4/3] sm:aspect-[16/11]"
          }`}
        />
        <button
          onClick={handleHeart}
          aria-label="Toggle wishlist"
          className="absolute right-2 top-2 rounded-full bg-black/40 p-2 text-white backdrop-blur transition hover:bg-black/70"
        >
          {saved ? (
            <FaHeart className="text-pink-500" />
          ) : (
            <FaRegHeart className="text-white" />
          )}
        </button>
        {game.metacritic ? (
          <span
            className={`absolute left-2 top-2 rounded px-2 py-0.5 text-[11px] font-bold ${
              game.metacritic >= 75
                ? "bg-green-500 text-white"
                : game.metacritic >= 50
                ? "bg-yellow-500 text-black"
                : "bg-red-500 text-white"
            }`}
          >
            {game.metacritic}
          </span>
        ) : null}
      </div>

      <div className="p-3">
        <h3 className="line-clamp-1 text-[15px] font-bold text-stone-950 dark:text-white sm:text-[17px]">
          {game.name}
        </h3>
        <div className="mt-1 flex items-center justify-between gap-2 text-[12px] text-stone-700 dark:text-slate-300">
          <span className="flex min-w-0 items-center gap-1">
            <FaStar className="shrink-0 text-amber-400" />
            {game.rating?.toFixed(1) ?? "N/A"}
          </span>
          {game.released ? (
            <span className="shrink-0">{new Date(game.released).getFullYear()}</span>
          ) : null}
          {game.platforms?.length ? (
            <FaDesktop className="shrink-0 text-stone-700 dark:text-slate-300" />
          ) : null}
        </div>

        {game.parent_platforms && !compact ? (
          <div className="mt-2 flex flex-wrap gap-1">
            {game.parent_platforms.slice(0, 4).map((p) => (
              <span
                key={p.platform.id}
                className="rounded bg-slate-300 px-1.5 py-0.5 text-[10px] text-stone-800 dark:bg-slate-700 dark:text-slate-200"
              >
                {p.platform.name}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </Link>
  );
};

export default GameCard;
