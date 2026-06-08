import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import GlobalApi from "../services/GlobalApi";
import { useWishlist } from "../context/WishlistContext";
import GameCard from "../components/common/GameCard";
import {
  FaStar,
  FaHeart,
  FaRegHeart,
  FaDesktop,
  FaCalendarAlt,
  FaBuilding,
  FaCode,
  FaStore,
  FaTrophy,
  FaExternalLinkAlt,
  FaYoutube,
  FaReddit,
  FaTwitch,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Tab = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-3 py-2 text-sm font-medium border-b-2 transition ${
      active
        ? "border-violet-600 text-violet-600"
        : "border-transparent text-stone-600 dark:text-slate-300 hover:text-violet-500"
    }`}
  >
    {children}
  </button>
);

const GameDetails = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [screenshots, setScreenshots] = useState([]);
  const [trailers, setTrailers] = useState([]);
  const [stores, setStores] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [additions, setAdditions] = useState([]);
  const [suggested, setSuggested] = useState([]);
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("about");
  const { isInWishlist, toggleWishlist, addRecent } = useWishlist();

  useEffect(() => {
    window.scrollTo(0, 0);
    const load = async () => {
      setLoading(true);
      try {
        const gameRes = await GlobalApi.getGameById(id);
        setGame(gameRes.data);
        addRecent(gameRes.data);

        const [ss, tr, st, ach, add, sug, ser] = await Promise.allSettled([
          GlobalApi.getGameScreenshots(id),
          GlobalApi.getGameTrailers(id),
          GlobalApi.getGameStores(id),
          GlobalApi.getGameAchievements(id),
          GlobalApi.getGameAdditions(id),
          GlobalApi.getGameSuggested(id),
          GlobalApi.getGameGameSeries(id),
        ]);
        setScreenshots(ss.status === "fulfilled" ? ss.value.data.results : []);
        setTrailers(tr.status === "fulfilled" ? tr.value.data.results : []);
        setStores(st.status === "fulfilled" ? st.value.data.results : []);
        setAchievements(ach.status === "fulfilled" ? ach.value.data.results : []);
        setAdditions(add.status === "fulfilled" ? add.value.data.results : []);
        setSuggested(sug.status === "fulfilled" ? sug.value.data.results : []);
        setSeries(ser.status === "fulfilled" ? ser.value.data.results : []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading || !game) {
    return (
      <div className="p-10 text-center text-stone-500 dark:text-slate-400">
        Loading...
      </div>
    );
  }

  const saved = isInWishlist(game.id);

  return (
    <div className="text-stone-900 dark:text-slate-100">
      {/* hero */}
      <div
        className="relative h-[320px] sm:h-[420px] bg-cover bg-center"
        style={{ backgroundImage: `url(${game.background_image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 p-5 sm:p-8 text-white max-w-4xl">
          <h1 className="text-3xl sm:text-5xl font-extrabold drop-shadow mb-2">
            {game.name}
          </h1>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            {game.rating ? (
              <span className="flex items-center gap-1 bg-amber-500/90 text-black px-2 py-0.5 rounded font-bold">
                <FaStar /> {game.rating.toFixed(1)}
              </span>
            ) : null}
            {game.metacritic ? (
              <span
                className={`px-2 py-0.5 rounded font-bold ${
                  game.metacritic >= 75
                    ? "bg-green-500"
                    : game.metacritic >= 50
                    ? "bg-yellow-500 text-black"
                    : "bg-red-500"
                }`}
              >
                Metacritic: {game.metacritic}
              </span>
            ) : null}
            {game.released ? (
              <span className="flex items-center gap-1 bg-white/20 backdrop-blur px-2 py-0.5 rounded">
                <FaCalendarAlt /> {game.released}
              </span>
            ) : null}
            <button
              onClick={() => toggleWishlist(game)}
              className="ml-2 flex items-center gap-1 bg-pink-500 hover:bg-pink-600 px-3 py-1 rounded"
            >
              {saved ? <FaHeart /> : <FaRegHeart />}{" "}
              {saved ? "Saved" : "Add to Wishlist"}
            </button>
          </div>
        </div>
      </div>

      {/* tabs */}
      <div className="border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 overflow-x-auto">
        <div className="flex gap-1">
          <Tab active={tab === "about"} onClick={() => setTab("about")}>About</Tab>
          <Tab active={tab === "media"} onClick={() => setTab("media")}>
            Media ({screenshots.length})
          </Tab>
          <Tab active={tab === "trailers"} onClick={() => setTab("trailers")}>
            Trailers ({trailers.length})
          </Tab>
          <Tab active={tab === "stores"} onClick={() => setTab("stores")}>
            Where to Buy ({stores.length})
          </Tab>
          <Tab active={tab === "achievements"} onClick={() => setTab("achievements")}>
            Achievements ({achievements.length})
          </Tab>
          <Tab active={tab === "social"} onClick={() => setTab("social")}>Social</Tab>
        </div>
      </div>

      <div className="px-4 sm:px-6 py-5">
        {tab === "about" && (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {game.description_raw ? (
                <p className="leading-relaxed text-stone-700 dark:text-slate-300 whitespace-pre-line">
                  {game.description_raw}
                </p>
              ) : (
                <p className="text-stone-500">No description available.</p>
              )}

              {game.genres?.length ? (
                <div>
                  <h3 className="font-bold mb-2">Genres</h3>
                  <div className="flex flex-wrap gap-2">
                    {game.genres.map((g) => (
                      <Link
                        key={g.id}
                        to={`/genre/${g.id}`}
                        className="text-sm bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300 px-3 py-1 rounded-full"
                      >
                        {g.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}

              {game.tags?.length ? (
                <div>
                  <h3 className="font-bold mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {game.tags.slice(0, 25).map((t) => (
                      <Link
                        key={t.id}
                        to={`/tag/${t.id}`}
                        className="text-xs bg-slate-200 text-stone-800 dark:bg-slate-700 dark:text-slate-200 px-2 py-1 rounded"
                      >
                        {t.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}

              {series.length ? (
                <div>
                  <h3 className="font-bold mb-2">Part of the series</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {series.map((g) => (
                      <GameCard key={g.id} game={g} compact />
                    ))}
                  </div>
                </div>
              ) : null}

              {additions.length ? (
                <div>
                  <h3 className="font-bold mb-2">DLC & Editions</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {additions.map((g) => (
                      <GameCard key={g.id} game={g} compact />
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            <aside className="space-y-4">
              {game.platforms?.length ? (
                <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow">
                  <h3 className="font-bold mb-2 flex items-center gap-2">
                    <FaDesktop /> Platforms
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {game.platforms.map((p) => (
                      <Link
                        key={p.platform.id}
                        to={`/platform/${p.platform.id}`}
                        className="text-xs bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded"
                      >
                        {p.platform.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}

              {game.publishers?.length ? (
                <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow">
                  <h3 className="font-bold mb-2 flex items-center gap-2">
                    <FaBuilding /> Publishers
                  </h3>
                  {game.publishers.map((p) => (
                    <Link
                      key={p.id}
                      to={`/publisher/${p.id}`}
                      className="block text-sm hover:text-violet-600"
                    >
                      {p.name}
                    </Link>
                  ))}
                </div>
              ) : null}

              {game.developers?.length ? (
                <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow">
                  <h3 className="font-bold mb-2 flex items-center gap-2">
                    <FaCode /> Developers
                  </h3>
                  {game.developers.map((d) => (
                    <Link
                      key={d.id}
                      to={`/developer/${d.id}`}
                      className="block text-sm hover:text-violet-600"
                    >
                      {d.name}
                    </Link>
                  ))}
                </div>
              ) : null}

              {game.website ? (
                <a
                  href={game.website}
                  target="_blank"
                  rel="noreferrer"
                  className="block bg-violet-600 hover:bg-violet-700 text-white text-center py-2 rounded-xl"
                >
                  Visit Website <FaExternalLinkAlt className="inline ml-1" />
                </a>
              ) : null}
            </aside>
          </div>
        )}

        {tab === "media" && (
          <div>
            {screenshots.length ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {screenshots.map((s) => (
                  <img
                    key={s.id}
                    src={s.image}
                    alt=""
                    className="w-full h-[200px] object-cover rounded-xl"
                  />
                ))}
              </div>
            ) : (
              <p className="text-stone-500">No screenshots.</p>
            )}
          </div>
        )}

        {tab === "trailers" && (
          <div>
            {trailers.length ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {trailers.map((t) => (
                  <div key={t.id} className="bg-black rounded-xl overflow-hidden aspect-video">
                    <iframe
                      title={t.name}
                      src={`https://www.youtube.com/embed/${t.data?.max?.split('/').pop() || ""}`}
                      className="w-full h-full"
                      allowFullScreen
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-stone-500">No trailers.</p>
            )}
          </div>
        )}

        {tab === "stores" && (
          <div>
            {stores.length ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {stores.map((s) => (
                  <a
                    key={s.id}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 p-3 bg-white dark:bg-slate-800 rounded-xl shadow hover:shadow-violet-500/30"
                  >
                    {s.store.image ? (
                      <img
                        src={s.store.image}
                        alt={s.store.name}
                        className="w-10 h-10 object-contain bg-white p-1 rounded"
                      />
                    ) : (
                      <FaStore size={24} />
                    )}
                    <div>
                      <p className="font-bold text-sm">{s.store.name}</p>
                      <p className="text-xs text-stone-500">Open store</p>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-stone-500">No store links available.</p>
            )}
          </div>
        )}

        {tab === "achievements" && (
          <div>
            {achievements.length ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {achievements.map((a) => (
                  <div
                    key={a.id}
                    className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800 rounded-xl shadow"
                  >
                    {a.image ? (
                      <img src={a.image} alt="" className="w-12 h-12 rounded" />
                    ) : (
                      <FaTrophy className="text-amber-500" size={32} />
                    )}
                    <div>
                      <p className="font-bold text-sm">{a.name}</p>
                      <p className="text-xs text-stone-500">
                        {a.percent || 0}% of players unlocked
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-stone-500">No achievements data.</p>
            )}
          </div>
        )}

        {tab === "social" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {game.reddit_url ? (
              <a
                href={game.reddit_url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-4 bg-orange-500 text-white rounded-xl"
              >
                <FaReddit size={24} /> Reddit
              </a>
            ) : null}
            {game.reddit_url ? (
              <a
                href={game.reddit_url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-4 bg-black text-white rounded-xl"
              >
                <FaXTwitter size={24} /> Reddit Discussions
              </a>
            ) : null}
            <a
              href={`https://www.youtube.com/results?search_query=${encodeURIComponent(game.name + " trailer")}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 p-4 bg-red-600 text-white rounded-xl"
            >
              <FaYoutube size={24} /> YouTube
            </a>
            <a
              href={`https://www.twitch.tv/directory/game/${encodeURIComponent(game.name)}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 p-4 bg-purple-600 text-white rounded-xl"
            >
              <FaTwitch size={24} /> Twitch
            </a>
          </div>
        )}
      </div>

      {suggested.length ? (
        <div className="px-4 sm:px-6 pb-6">
          <h2 className="text-xl font-bold text-stone-900 dark:text-white mb-3">
            You may also like
          </h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3 sm:grid-cols-[repeat(auto-fit,minmax(180px,1fr))] sm:gap-5 xl:grid-cols-[repeat(auto-fit,minmax(210px,1fr))]">
            {suggested.map((g) => (
              <GameCard key={g.id} game={g} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default GameDetails;
