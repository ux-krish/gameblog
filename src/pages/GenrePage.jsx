import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "../services/GlobalApi";
import GameCard from "../components/common/GameCard";
import { FaSpinner } from "react-icons/fa";

const usePaginatedGames = (fetchFn, deps = []) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setData([]);
    setPage(1);
    setHasMore(true);
    loadPage(1, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  const loadPage = async (n, replace = false) => {
    setLoading(true);
    try {
      const r = await fetchFn(n);
      setHasMore(r.data.next !== null);
      setData((prev) => (replace ? r.data.results : [...prev, ...r.data.results]));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      const next = page + 1;
      setPage(next);
      loadPage(next);
    }
  };

  return { data, loading, hasMore, loadMore };
};

const GenrePage = () => {
  const { id } = useParams();
  const [genre, setGenre] = useState(null);
  const { data, loading, hasMore, loadMore } = usePaginatedGames(
    (page) => GlobalApi.getGamesByGenre(id, { page }),
    [id]
  );

  useEffect(() => {
    GlobalApi.getGenreById(id).then((r) => setGenre(r.data));
  }, [id]);

  return (
    <div className="px-4 sm:px-6 py-4">
      {genre ? (
        <div className="mb-4">
          <h1 className="text-3xl font-extrabold text-stone-900 dark:text-white">
            {genre.name} Games
          </h1>
          <p className="text-stone-600 dark:text-slate-400">
            {genre.games_count} games in this genre
          </p>
        </div>
      ) : null}

      <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3 sm:grid-cols-[repeat(auto-fit,minmax(180px,1fr))] sm:gap-5 xl:grid-cols-[repeat(auto-fit,minmax(210px,1fr))]">
        {data.map((g) => (
          <GameCard key={g.id} game={g} />
        ))}
      </div>

      {loading && (
        <div className="flex justify-center py-6 text-violet-500">
          <FaSpinner className="animate-spin" size={24} />
        </div>
      )}

      {!loading && hasMore && data.length > 0 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={loadMore}
            className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-2 rounded-full"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default GenrePage;
