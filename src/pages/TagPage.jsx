import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "../services/GlobalApi";
import GameCard from "../components/common/GameCard";
import { FaSpinner } from "react-icons/fa";
import { usePaginatedGames } from "../hooks/usePaginatedGames";

const TagPage = () => {
  const { id } = useParams();
  const [tag, setTag] = useState(null);
  const { data, loading, hasMore, loadMore } = usePaginatedGames(
    (page) => GlobalApi.getGamesByTag(id, { page }),
    [id]
  );

  useEffect(() => {
    GlobalApi.getTagById(id).then((r) => setTag(r.data));
  }, [id]);

  return (
    <div className="px-4 sm:px-6 py-4">
      <h1 className="text-3xl font-extrabold text-stone-900 dark:text-white mb-1">
        #{tag?.name || "Tag"}
      </h1>
      <p className="text-stone-600 dark:text-slate-400 mb-4">
        {tag?.games_count} games tagged
      </p>

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

export default TagPage;
