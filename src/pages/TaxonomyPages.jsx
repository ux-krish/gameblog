import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GlobalApi from "../services/GlobalApi";
import { FaBuilding, FaCode, FaShoppingCart, FaUserTie } from "react-icons/fa";

const useTaxonomy = (fn) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fn()
      .then((r) => setData(r.data.results || []))
      .catch(console.error)
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { data, loading };
};

const Card = ({ to, name, count, image, sub }) => (
  <Link
    to={to}
    className="group block bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow hover:shadow-violet-500/30 hover:scale-[1.02] transition"
  >
    {image ? (
      <div
        className="h-32 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      />
    ) : (
      <div className="h-32 bg-gradient-to-br from-violet-500 to-fuchsia-500" />
    )}
    <div className="p-3">
      <p className="font-bold text-stone-900 dark:text-white line-clamp-1">{name}</p>
      {sub ? <p className="text-xs text-stone-500 mt-0.5 line-clamp-1">{sub}</p> : null}
      {count != null ? (
        <p className="text-xs text-violet-600 dark:text-violet-400 mt-1">
          {count} games
        </p>
      ) : null}
    </div>
  </Link>
);

const Skeleton = () => (
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
    {Array.from({ length: 8 }).map((_, i) => (
      <div
        key={i}
        className="bg-slate-200 dark:bg-slate-800 h-48 rounded-xl animate-pulse"
      />
    ))}
  </div>
);

export const PublishersPage = () => {
  const { data, loading } = useTaxonomy(GlobalApi.getPublishers);
  return (
    <div className="px-4 sm:px-6 py-4">
      <h1 className="text-2xl font-extrabold text-stone-900 dark:text-white mb-4 flex items-center gap-2">
        <FaBuilding /> Publishers
      </h1>
      {loading ? <Skeleton /> : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {data.map((p) => (
            <Card
              key={p.id}
              to={`/publisher/${p.id}`}
              name={p.name}
              count={p.games_count}
              image={p.image_background}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const DevelopersPage = () => {
  const { data, loading } = useTaxonomy(GlobalApi.getDevelopers);
  return (
    <div className="px-4 sm:px-6 py-4">
      <h1 className="text-2xl font-extrabold text-stone-900 dark:text-white mb-4 flex items-center gap-2">
        <FaCode /> Developers
      </h1>
      {loading ? <Skeleton /> : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {data.map((d) => (
            <Card
              key={d.id}
              to={`/developer/${d.id}`}
              name={d.name}
              count={d.games_count}
              image={d.image_background}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const CreatorsPage = () => {
  const { data, loading } = useTaxonomy(GlobalApi.getCreators);
  return (
    <div className="px-4 sm:px-6 py-4">
      <h1 className="text-2xl font-extrabold text-stone-900 dark:text-white mb-4 flex items-center gap-2">
        <FaUserTie /> Creators
      </h1>
      {loading ? <Skeleton /> : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {data.map((c) => (
            <Card
              key={c.id}
              to={`/creator/${c.id}`}
              name={c.name}
              count={c.games_count}
              image={c.image}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const StoresPage = () => {
  const { data, loading } = useTaxonomy(GlobalApi.getStores);
  return (
    <div className="px-4 sm:px-6 py-4">
      <h1 className="text-2xl font-extrabold text-stone-900 dark:text-white mb-4 flex items-center gap-2">
        <FaShoppingCart /> Stores
      </h1>
      {loading ? <Skeleton /> : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {data.map((s) => (
            <a
              key={s.id}
              href={`https://${s.domain}`}
              target="_blank"
              rel="noreferrer"
              className="block bg-white dark:bg-slate-800 rounded-xl p-4 shadow hover:shadow-violet-500/30 transition"
            >
              {s.image_background ? (
                <div
                  className="h-20 bg-cover bg-center rounded-lg mb-2"
                  style={{ backgroundImage: `url(${s.image_background})` }}
                />
              ) : null}
              <p className="font-bold text-stone-900 dark:text-white">{s.name}</p>
              <p className="text-xs text-violet-600 dark:text-violet-400">
                Visit {s.domain}
              </p>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};
