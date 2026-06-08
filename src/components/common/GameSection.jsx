import { Link } from "react-router-dom";
import GameCard from "./GameCard";

const gridClass =
  "grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3 sm:grid-cols-[repeat(auto-fit,minmax(180px,1fr))] sm:gap-5 xl:grid-cols-[repeat(auto-fit,minmax(210px,1fr))]";

export const Skeleton = ({ count = 5 }) => (
  <div className={gridClass}>
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className="h-[230px] animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800 sm:h-[300px]"
      />
    ))}
  </div>
);

const Section = ({ title, link, children }) => (
  <section className="mt-8">
    <div className="mb-4 flex items-center justify-between gap-3">
      <h2 className="min-w-0 text-lg font-bold text-stone-950 dark:text-white sm:text-2xl">
        {title}
      </h2>
      {link ? (
        <Link
          to={link}
          className="shrink-0 text-sm font-medium text-violet-600 hover:underline dark:text-violet-400"
        >
          View all
        </Link>
      ) : null}
    </div>
    {children}
  </section>
);

const Grid = ({ games, compact, empty = "No games found." }) => {
  if (!games?.length) {
    return (
      <p className="py-6 text-sm text-stone-600 dark:text-slate-400">{empty}</p>
    );
  }

  return (
    <div className={gridClass}>
      {games.map((g) => (
        <GameCard key={g.id} game={g} compact={compact} />
      ))}
    </div>
  );
};

export { Section, Grid };
export default Grid;
