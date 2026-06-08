import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { FaHeart, FaTrash, FaHistory } from "react-icons/fa";
import GameCard from "../components/common/GameCard";

export const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  return (
    <div className="px-4 sm:px-6 py-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-extrabold text-stone-900 dark:text-white flex items-center gap-2">
          <FaHeart className="text-pink-500" /> My Wishlist
        </h1>
        {wishlist.length > 0 && (
          <button
            onClick={() => {
              if (confirm("Remove all wishlist items?")) {
                wishlist.forEach((g) => removeFromWishlist(g.id));
              }
            }}
            className="text-sm text-red-500 hover:underline"
          >
            Clear all
          </button>
        )}
      </div>
      {wishlist.length === 0 ? (
        <div className="text-center py-16 text-stone-500">
          <FaHeart size={48} className="mx-auto mb-3 opacity-30" />
          <p>Your wishlist is empty.</p>
          <Link
            to="/browse"
            className="inline-block mt-3 bg-violet-600 text-white px-4 py-2 rounded-full text-sm"
          >
            Browse games
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3 sm:grid-cols-[repeat(auto-fit,minmax(180px,1fr))] sm:gap-5 xl:grid-cols-[repeat(auto-fit,minmax(210px,1fr))]">
          {wishlist.map((g) => (
            <div key={g.id} className="relative">
              <GameCard game={g} />
              <button
                onClick={() => removeFromWishlist(g.id)}
                className="absolute top-2 left-2 bg-black/60 p-2 rounded-full text-white hover:bg-red-500"
                aria-label="Remove"
              >
                <FaTrash size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const Recent = () => {
  const { recent, clearRecent } = useWishlist();
  return (
    <div className="px-4 sm:px-6 py-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-extrabold text-stone-900 dark:text-white flex items-center gap-2">
          <FaHistory /> Recently Viewed
        </h1>
        {recent.length > 0 && (
          <button
            onClick={clearRecent}
            className="text-sm text-red-500 hover:underline"
          >
            Clear
          </button>
        )}
      </div>
      {recent.length === 0 ? (
        <div className="text-center py-16 text-stone-500">
          <FaHistory size={48} className="mx-auto mb-3 opacity-30" />
          <p>No recently viewed games yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3 sm:grid-cols-[repeat(auto-fit,minmax(180px,1fr))] sm:gap-5 xl:grid-cols-[repeat(auto-fit,minmax(210px,1fr))]">
          {recent.map((g) => (
            <GameCard key={g.id} game={g} />
          ))}
        </div>
      )}
    </div>
  );
};
