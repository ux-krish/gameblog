import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="flex flex-col items-center justify-center py-20 text-center px-4">
    <h1 className="text-7xl font-extrabold text-violet-600">404</h1>
    <p className="mt-3 text-xl text-stone-700 dark:text-slate-200">
      Game not found in this dimension.
    </p>
    <Link
      to="/"
      className="mt-5 bg-violet-600 hover:bg-violet-700 text-white px-5 py-2 rounded-full"
    >
      Go back home
    </Link>
  </div>
);

export default NotFound;
