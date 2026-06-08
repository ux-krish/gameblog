import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import GlobalApi from "../services/GlobalApi";
import GameCard from "../components/common/GameCard";
import { FaSpinner } from "react-icons/fa";

const Search = () => {
  const [params] = useSearchParams();
  const q = params.get("q") || "";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!q) return;
    setLoading(true);
    GlobalApi.searchGames(q)
      .then((r) => setResults(r.data.results || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [q]);

  return (
    <div className="px-4 sm:px-6 py-4">
      <h1 className="text-2xl font-extrabold text-stone-900 dark:text-white mb-1">
        Search results
      </h1>
      <p className="text-stone-600 dark:text-slate-400 mb-4">
        {q ? `Results for "${q}"` : "Type a query in the search bar above."}
      </p>

      {loading ? (
        <div className="flex justify-center py-10 text-violet-500">
          <FaSpinner className="animate-spin" size={28} />
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3 sm:grid-cols-[repeat(auto-fit,minmax(180px,1fr))] sm:gap-5 xl:grid-cols-[repeat(auto-fit,minmax(210px,1fr))]">
          {results.map((g) => (
            <GameCard key={g.id} game={g} />
          ))}
        </div>
      )}

      {!loading && q && results.length === 0 && (
        <p className="text-center text-stone-500 dark:text-slate-400 mt-12">
          No results found.
        </p>
      )}
    </div>
  );
};

export default Search;
