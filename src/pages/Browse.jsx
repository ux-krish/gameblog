import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import FilterBar from "../components/FilterBar";
import GameCard from "../components/common/GameCard";
import { useGames } from "../hooks/useGames";
import { FaSpinner } from "react-icons/fa";

const Browse = () => {
  const [params, setParams] = useSearchParams();
  const [sort, setSort] = useState(params.get("sort") || "-rating");
  const [from, setFrom] = useState(params.get("from") || "");
  const [to, setTo] = useState(params.get("to") || "");
  const [search, setSearch] = useState(params.get("q") || "");

  useEffect(() => {
    const next = new URLSearchParams();
    if (sort) next.set("sort", sort);
    if (from) next.set("from", from);
    if (to) next.set("to", to);
    if (search) next.set("q", search);
    setParams(next, { replace: true });
  }, [sort, from, to, search, setParams]);

  const apiParams = {
    ordering: sort,
    ...(from ? { dates: `${from},${to || new Date().toISOString().slice(0, 10)}` } : {}),
    ...(search ? { search, search_precise: true } : {}),
  };

  const { data, loading, hasMore, loadMore } = useGames(apiParams, 20);

  return (
    <div className="px-4 py-4 sm:px-6">
      <h1 className="mb-4 text-2xl font-extrabold text-stone-900 dark:text-white sm:text-3xl">
        Browse Games
      </h1>
      <FilterBar
        sort={sort}
        onSortChange={setSort}
        dates={{ from, to }}
        onDatesChange={({ from: f, to: t }) => {
          setFrom(f);
          setTo(t);
        }}
        extra={
          <div className="min-w-0">
            <label className="mb-1 block text-[10px] uppercase text-stone-500 dark:text-slate-400">
              Search
            </label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Title..."
              className="w-full rounded bg-slate-100 px-2 py-2 text-sm text-stone-900 dark:bg-slate-700 dark:text-white"
            />
          </div>
        }
      />

      <p className="mt-4 text-sm text-stone-600 dark:text-slate-400">
        Showing {data.length} game{data.length !== 1 ? "s" : ""}
      </p>

      <div className="mt-3 grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3 sm:grid-cols-[repeat(auto-fit,minmax(180px,1fr))] sm:gap-5 xl:grid-cols-[repeat(auto-fit,minmax(210px,1fr))]">
        {data.map((g) => (
          <GameCard key={g.id} game={g} />
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-6 text-violet-500">
          <FaSpinner className="animate-spin" size={24} />
        </div>
      ) : null}

      {!loading && hasMore && data.length > 0 ? (
        <div className="mt-6 flex justify-center">
          <button
            onClick={loadMore}
            className="rounded-full bg-violet-600 px-5 py-2 text-white hover:bg-violet-700"
          >
            Load More
          </button>
        </div>
      ) : null}

      {!loading && data.length === 0 ? (
        <p className="mt-12 text-center text-stone-500 dark:text-slate-400">
          No games match your filters.
        </p>
      ) : null}
    </div>
  );
};

export default Browse;
