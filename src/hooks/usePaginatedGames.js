import { useEffect, useState } from "react";

/**
 * Hook to paginate a list of games given an async fetch function.
 * fetchFn(page) => Promise<{ data: { results, next } }>
 */
export const usePaginatedGames = (fetchFn, deps = []) => {
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
