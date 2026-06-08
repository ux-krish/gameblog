const Footer = () => {
  return (
    <footer className="mt-10 border-t border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 p-5 text-sm sm:grid-cols-3 sm:p-6">
        <div>
          <h3 className="mb-2 text-lg font-extrabold text-violet-600">
            KD GameBlog
          </h3>
          <p className="text-stone-600 dark:text-slate-400">
            Discover, explore, and track your favorite games. Powered by the RAWG API.
          </p>
        </div>
        <div>
          <h4 className="mb-2 font-bold text-stone-800 dark:text-white">
            Discover
          </h4>
          <ul className="space-y-1 text-stone-600 dark:text-slate-400">
            <li>Trending Games</li>
            <li>Top Rated</li>
            <li>New Releases</li>
            <li>Upcoming</li>
            <li>Best of 2025</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-2 font-bold text-stone-800 dark:text-white">Data</h4>
          <p className="text-stone-600 dark:text-slate-400">
            All game information, screenshots, ratings, and metadata are provided
            by the public{" "}
            <a href="https://rawg.io" className="text-violet-600">
              RAWG
            </a>{" "}
            video games database.
          </p>
        </div>
      </div>
      <div className="border-t border-slate-200 py-3 text-center text-xs text-stone-500 dark:border-slate-800">
        (c) {new Date().getFullYear()} KDGameBlog. All Rights Reserved. Built with
        React, Vite & Tailwind CSS.
      </div>
    </footer>
  );
};

export default Footer;
