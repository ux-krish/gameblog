import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "../services/GlobalApi";
import GameCard from "../components/common/GameCard";
import { FaSpinner } from "react-icons/fa";
import { usePaginatedGames } from "../hooks/usePaginatedGames";

export const DeveloperPage = () => {
  const { id } = useParams();
  const [dev, setDev] = useState(null);
  const { data, loading, hasMore, loadMore } = usePaginatedGames(
    (page) => GlobalApi.getGamesByDeveloper(id, { page }),
    [id]
  );
  useEffect(() => {
    GlobalApi.getDeveloperById(id).then((r) => setDev(r.data));
  }, [id]);

  return (
    <div className="px-4 sm:px-6 py-4">
      <h1 className="text-3xl font-extrabold text-stone-900 dark:text-white mb-1">
        {dev?.name || "Developer"}
      </h1>
      <p className="text-stone-600 dark:text-slate-400 mb-4">
        {dev?.games_count} games developed
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
          <button onClick={loadMore} className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-2 rounded-full">
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export const CreatorPage = () => {
  const { id } = useParams();
  const [creator, setCreator] = useState(null);
  const { data, loading, hasMore, loadMore } = usePaginatedGames(
    (page) => GlobalApi.getGamesByCreator(id, { page }),
    [id]
  );
  useEffect(() => {
    GlobalApi.getCreatorById(id).then((r) => setCreator(r.data));
  }, [id]);

  return (
    <div className="px-4 sm:px-6 py-4">
      <div className="flex items-center gap-4 mb-4">
        {creator?.image ? (
          <img src={creator.image} alt="" className="w-20 h-20 rounded-full object-cover" />
        ) : null}
        <div>
          <h1 className="text-3xl font-extrabold text-stone-900 dark:text-white">
            {creator?.name || "Creator"}
          </h1>
          <p className="text-stone-600 dark:text-slate-400">
            {creator?.games_count} games
          </p>
        </div>
      </div>
      {creator?.description ? (
        <p className="text-stone-700 dark:text-slate-300 mb-4 max-w-3xl">
          {creator.description}
        </p>
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
          <button onClick={loadMore} className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-2 rounded-full">
            Load More
          </button>
        </div>
      )}
    </div>
  );
};
