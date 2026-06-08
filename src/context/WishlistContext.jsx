import { createContext, useCallback, useContext, useEffect, useState } from "react";

const WISHLIST_KEY = "gb_wishlist";
const RECENT_KEY = "gb_recent";

const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    try {
      setWishlist(JSON.parse(localStorage.getItem(WISHLIST_KEY)) || []);
      setRecent(JSON.parse(localStorage.getItem(RECENT_KEY)) || []);
    } catch {
      /* noop */
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem(RECENT_KEY, JSON.stringify(recent));
  }, [recent]);

  const addToWishlist = useCallback((game) => {
    setWishlist((prev) => {
      if (prev.find((g) => g.id === game.id)) return prev;
      return [
        {
          id: game.id,
          name: game.name,
          background_image: game.background_image,
          released: game.released,
          rating: game.rating,
          metacritic: game.metacritic,
        },
        ...prev,
      ];
    });
  }, []);

  const removeFromWishlist = useCallback((id) => {
    setWishlist((prev) => prev.filter((g) => g.id !== id));
  }, []);

  const isInWishlist = useCallback(
    (id) => wishlist.some((g) => g.id === id),
    [wishlist]
  );

  const toggleWishlist = useCallback(
    (game) => {
      if (isInWishlist(game.id)) removeFromWishlist(game.id);
      else addToWishlist(game);
    },
    [isInWishlist, addToWishlist, removeFromWishlist]
  );

  const addRecent = useCallback((game) => {
    setRecent((prev) => {
      const filtered = prev.filter((g) => g.id !== game.id);
      return [
        {
          id: game.id,
          name: game.name,
          background_image: game.background_image,
          rating: game.rating,
        },
        ...filtered,
      ].slice(0, 12);
    });
  }, []);

  const clearRecent = useCallback(() => setRecent([]), []);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        recent,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        toggleWishlist,
        addRecent,
        clearRecent,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
