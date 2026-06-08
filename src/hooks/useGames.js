import { useEffect, useState, useCallback } from "react";
import GlobalApi from "../services/GlobalApi";

/**
 * Hook to fetch a list of games with optional params, supporting pagination.
 * Returns { data, loading, error, loadMore, hasMore, refresh }
 */
export const useGames = (params = {}, pageSize = 20) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const stringParams = JSON.stringify(params);

  const fetchPage = useCallback(
    async (pageNum, replace = false) => {
      setLoading(true);
      setError(null);
      try {
        const resp = await GlobalApi.getAllGames({
          ...params,
          page_size: pageSize,
          page: pageNum,
        });
        const results = resp.data.results || [];
        setHasMore(resp.data.next !== null);
        setData((prev) => (replace ? results : [...prev, ...results]));
      } catch (err) {
        setError(err.message || "Failed to fetch");
      } finally {
        setLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [stringParams, pageSize]
  );

  useEffect(() => {
    setData([]);
    setPage(1);
    setHasMore(true);
    fetchPage(1, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stringParams, pageSize]);

  const loadMore = () => {
    if (!loading && hasMore) {
      const next = page + 1;
      setPage(next);
      fetchPage(next);
    }
  };

  const refresh = () => {
    setData([]);
    setPage(1);
    setHasMore(true);
    fetchPage(1, true);
  };

  return { data, loading, error, loadMore, hasMore, refresh };
};
