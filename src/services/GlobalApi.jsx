import axios from "axios";

const KEY = "30d37caadbfe41fcb23e8477d7b12636";
const api = axios.create({ baseURL: "https://api.rawg.io/api" });

/* ---------- helpers ---------- */
const qs = (params = {}) => {
  const search = new URLSearchParams({ key: KEY, ...params });
  return `?${search.toString()}`;
};

const safe = (val) => (val === undefined || val === null || val === "" ? null : val);

/* ---------- CORE: games ---------- */
const getAllGames = (params = {}) => api.get(`/games${qs({ page_size: 20, ...params })}`);
const getGameById = (id) => api.get(`/games/${id}${qs()}`);
const getGameAdditions = (id) => api.get(`/games/${id}/additions${qs({ page_size: 10 })}`);
const getGameAchievements = (id) => api.get(`/games/${id}/achievements${qs({ page_size: 20 })}`);
const getGameDevelopmentTeam = (id) => api.get(`/games/${id}/development-team${qs({ page_size: 10 })}`);
const getGameGameSeries = (id) => api.get(`/games/${id}/game-series${qs({ page_size: 10 })}`);
const getGameParentGames = (id) => api.get(`/games/${id}/parent-games${qs({ page_size: 10 })}`);
const getGameScreenshots = (id) => api.get(`/games/${id}/screenshots${qs({ page_size: 20 })}`);
const getGameStores = (id) => api.get(`/games/${id}/stores${qs()}`);
const getGameSuggested = (id) => api.get(`/games/${id}/suggested${qs({ page_size: 10 })}`);
const getGameTags = (id) => api.get(`/games/${id}/tags${qs()}`);
const getGameTrailers = (id) => api.get(`/games/${id}/movies${qs()}`);
const getGameReddit = (id) => api.get(`/games/${id}/reddit${qs()}`);
const getGameTwitch = (id) => api.get(`/games/${id}/twitch${qs()}`);
const getGameYoutube = (id) => api.get(`/games/${id}/youtube${qs()}`);
const getGameUpdates = (id) => api.get(`/games/${id}/updates${qs({ page_size: 10 })}`);

/* ---------- CORE: search / filter ---------- */
const searchGames = (term, params = {}) =>
  api.get(`/games${qs({ search: safe(term), search_precise: true, page_size: 20, ...params })}`);
const getGamesByGenre = (id, params = {}) => api.get(`/games${qs({ genres: id, page_size: 20, ...params })}`);
const getGamesByPlatform = (id, params = {}) => api.get(`/games${qs({ platforms: id, page_size: 20, ...params })}`);
const getGamesByTag = (id, params = {}) => api.get(`/games${qs({ tags: id, page_size: 20, ...params })}`);
const getGamesByPublisher = (id, params = {}) => api.get(`/games${qs({ publishers: id, page_size: 20, ...params })}`);
const getGamesByDeveloper = (id, params = {}) => api.get(`/games${qs({ developers: id, page_size: 20, ...params })}`);
const getGamesByCreator = (id, params = {}) => api.get(`/games${qs({ creators: id, page_size: 20, ...params })}`);
const getGamesByStore = (id, params = {}) => api.get(`/games${qs({ stores: id, page_size: 20, ...params })}`);

/* ---------- curated lists ---------- */
const getTrending = () =>
  api.get(`/games${qs({ dates: "2024-01-01,2026-12-31", ordering: "-added", page_size: 10 })}`);
const getTopRated = () => api.get(`/games${qs({ ordering: "-rating", page_size: 10 })}`);
const getNewReleases = () =>
  api.get(`/games${qs({ dates: "2025-09-01,2026-12-31", ordering: "-released", page_size: 10 })}`);
const getUpcoming = () =>
  api.get(`/games${qs({ dates: "2026-06-01,2027-12-31", ordering: "released", page_size: 10 })}`);
const getMostPlayed = () => api.get(`/games${qs({ ordering: "-added", page_size: 10 })}`);
const getBestOfYear = (year = 2025) =>
  api.get(`/games${qs({ dates: `${year}-01-01,${year}-12-31`, ordering: "-rating", page_size: 10 })}`);

/* ---------- TAXONOMY ---------- */
const getGenres = () => api.get(`/genres${qs({ page_size: 25, ordering: "name" })}`);
const getGenreById = (id) => api.get(`/genres/${id}${qs()}`);

const getTags = () => api.get(`/tags${qs({ page_size: 40, ordering: "-games_count" })}`);
const getTagById = (id) => api.get(`/tags/${id}${qs()}`);

const getPlatforms = () => api.get(`/platforms${qs({ page_size: 30, ordering: "name" })}`);
const getPlatformById = (id) => api.get(`/platforms/${id}${qs()}`);

const getPublishers = () => api.get(`/publishers${qs({ page_size: 30, ordering: "-games_count" })}`);
const getPublisherById = (id) => api.get(`/publishers/${id}${qs()}`);

const getDevelopers = () => api.get(`/developers${qs({ page_size: 30, ordering: "-games_count" })}`);
const getDeveloperById = (id) => api.get(`/developers/${id}${qs()}`);

const getCreators = () => api.get(`/creators${qs({ page_size: 30, ordering: "-games_count" })}`);
const getCreatorById = (id) => api.get(`/creators/${id}${qs()}`);

const getStores = () => api.get(`/stores${qs({ page_size: 20, ordering: "name" })}`);
const getStoreById = (id) => api.get(`/stores/${id}${qs()}`);

/* ---------- creator roles ---------- */
const getCreatorRoles = () => api.get(`/creator-roles${qs({ page_size: 20 })}`);

export default {
  // core
  getAllGames,
  getGameById,
  getGameAdditions,
  getGameAchievements,
  getGameDevelopmentTeam,
  getGameGameSeries,
  getGameParentGames,
  getGameScreenshots,
  getGameStores,
  getGameSuggested,
  getGameTags,
  getGameTrailers,
  getGameReddit,
  getGameTwitch,
  getGameYoutube,
  getGameUpdates,
  // search / filter
  searchGames,
  getGamesByGenre,
  getGamesByPlatform,
  getGamesByTag,
  getGamesByPublisher,
  getGamesByDeveloper,
  getGamesByCreator,
  getGamesByStore,
  // curated
  getTrending,
  getTopRated,
  getNewReleases,
  getUpcoming,
  getMostPlayed,
  getBestOfYear,
  // taxonomy
  getGenres,
  getGenreById,
  getTags,
  getTagById,
  getPlatforms,
  getPlatformById,
  getPublishers,
  getPublisherById,
  getDevelopers,
  getDeveloperById,
  getCreators,
  getCreatorById,
  getStores,
  getStoreById,
  getCreatorRoles,
};
