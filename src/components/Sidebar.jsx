import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import GlobalApi from "../services/GlobalApi";
import { prefersReducedMotion } from "../utils/motion";
import {
  FaBuilding,
  FaCode,
  FaCompass,
  FaDesktop,
  FaGamepad,
  FaHeart,
  FaHistory,
  FaShoppingCart,
  FaTimes,
  FaUserTie,
} from "react-icons/fa";

const NavLink = ({ to, icon, children, active, collapsed, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    data-sidebar-item
    title={collapsed ? children : undefined}
    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${
      collapsed ? "md:justify-center" : ""
    } ${
      active
        ? "bg-violet-600 text-white"
        : "text-stone-700 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-800"
    }`}
  >
    <span className="shrink-0 text-base">{icon}</span>
    <span className={`truncate font-medium ${collapsed ? "md:hidden" : ""}`}>
      {children}
    </span>
  </Link>
);

const Sidebar = ({ isOpen, onClose, collapsed = false }) => {
  const [genres, setGenres] = useState([]);
  const [tags, setTags] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const sidebarRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    GlobalApi.getGenres().then((r) => setGenres(r.data.results || []));
    GlobalApi.getTags().then((r) => setTags((r.data.results || []).slice(0, 12)));
    GlobalApi.getPlatforms().then((r) => setPlatforms((r.data.results || []).slice(0, 12)));
  }, []);

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    if (!sidebarRef.current || prefersReducedMotion()) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-sidebar-item]",
        { autoAlpha: 0, x: -16 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.42,
          stagger: 0.025,
          ease: "power3.out",
        }
      );
    }, sidebarRef);

    return () => ctx.revert();
  }, [isOpen, collapsed, location.pathname, genres.length, platforms.length, tags.length]);

  return (
    <aside
      ref={sidebarRef}
      className={`fixed left-0 top-0 z-40 h-dvh w-72 overflow-y-auto border-r border-slate-200 bg-white transition-all duration-300 dark:border-slate-800 dark:bg-slate-900 md:sticky md:top-16 md:h-[calc(100vh-4rem)] md:translate-x-0 ${
        collapsed ? "md:w-20" : "md:w-72"
      } ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div
        className={`flex items-center border-b border-slate-200 p-4 dark:border-slate-800 ${
          collapsed ? "md:justify-center" : "justify-between"
        }`}
      >
        <Link
          to="/"
          onClick={onClose}
          data-sidebar-item
          className="flex items-center gap-2 font-extrabold text-violet-600"
          title="KD GameBlog"
        >
          <FaGamepad className="text-xl" />
          <span className={collapsed ? "md:hidden" : ""}>KD GameBlog</span>
        </Link>
        <button
          onClick={onClose}
          data-sidebar-item
          className="text-xl text-stone-700 dark:text-slate-300 md:hidden"
          aria-label="Close menu"
        >
          <FaTimes />
        </button>
      </div>

      <div className="space-y-1 p-3">
        <h4
          data-sidebar-item
          className={`mb-1 mt-2 px-2 text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-slate-400 ${
            collapsed ? "md:hidden" : ""
          }`}
        >
          Discover
        </h4>
        <NavLink to="/" icon={<FaCompass />} active={isActive("/")} collapsed={collapsed} onClick={onClose}>
          Home
        </NavLink>
        <NavLink to="/browse" icon={<FaGamepad />} active={isActive("/browse")} collapsed={collapsed} onClick={onClose}>
          Browse Games
        </NavLink>
        <NavLink to="/wishlist" icon={<FaHeart />} active={isActive("/wishlist")} collapsed={collapsed} onClick={onClose}>
          Wishlist
        </NavLink>
        <NavLink to="/recent" icon={<FaHistory />} active={isActive("/recent")} collapsed={collapsed} onClick={onClose}>
          Recently Viewed
        </NavLink>
      </div>

      <div className={collapsed ? "md:hidden" : ""}>
          <div className="p-3">
            <h4 className="mb-2 mt-2 px-2 text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-slate-400">
              Genres
            </h4>
            <div className="space-y-1">
              {genres.map((g) => (
                <Link
                  key={g.id}
                  to={`/genre/${g.id}`}
                  onClick={onClose}
                  data-sidebar-item
                  className="flex items-center gap-2 rounded px-2 py-1.5 text-sm text-stone-700 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  <img src={g.image_background} alt="" className="h-7 w-7 rounded object-cover" />
                  <span className="truncate">{g.name}</span>
                  <span className="ml-auto text-[10px] text-stone-500 dark:text-slate-500">
                    {g.games_count}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className="p-3">
            <h4 className="mb-2 mt-2 px-2 text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-slate-400">
              Platforms
            </h4>
            <div className="space-y-1">
              {platforms.map((p) => (
                <Link
                  key={p.id}
                  to={`/platform/${p.id}`}
                  onClick={onClose}
                  data-sidebar-item
                  className="flex items-center gap-2 rounded px-2 py-1.5 text-sm text-stone-700 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  {p.image ? (
                    <img src={p.image} alt="" className="h-5 w-5" />
                  ) : (
                    <FaDesktop />
                  )}
                  <span className="truncate">{p.name}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="p-3">
            <h4 className="mb-2 mt-2 px-2 text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-slate-400">
              Tags
            </h4>
            <div className="flex flex-wrap gap-1.5 px-1">
              {tags.map((t) => (
                <Link
                  key={t.id}
                  to={`/tag/${t.id}`}
                  onClick={onClose}
                  data-sidebar-item
                  className="rounded-full bg-violet-100 px-2 py-1 text-[11px] text-violet-700 hover:bg-violet-200 dark:bg-violet-900/40 dark:text-violet-300 dark:hover:bg-violet-800"
                >
                  {t.name}
                </Link>
              ))}
            </div>
          </div>
      </div>

      <div className="space-y-1 p-3">
        <h4
          data-sidebar-item
          className={`mb-2 mt-2 px-2 text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-slate-400 ${
            collapsed ? "md:hidden" : ""
          }`}
        >
          More
        </h4>
        <NavLink to="/publishers" icon={<FaBuilding />} collapsed={collapsed} onClick={onClose}>
          Publishers
        </NavLink>
        <NavLink to="/developers" icon={<FaCode />} collapsed={collapsed} onClick={onClose}>
          Developers
        </NavLink>
        <NavLink to="/creators" icon={<FaUserTie />} collapsed={collapsed} onClick={onClose}>
          Creators
        </NavLink>
        <NavLink to="/stores" icon={<FaShoppingCart />} collapsed={collapsed} onClick={onClose}>
          Stores
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
