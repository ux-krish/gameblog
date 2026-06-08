import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import {
  FaBars,
  FaChevronLeft,
  FaChevronRight,
  FaGamepad,
  FaKeyboard,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import { ThemeContext } from "../../context/ThemeContext";
import SearchInput from "../SearchInput";
import { prefersReducedMotion } from "../../utils/motion";

const Header = ({ onMenuClick, sidebarCollapsed, onToggleCollapse }) => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [q, setQ] = useState("");
  const [shortcuts, setShortcuts] = useState(false);
  const headerRef = useRef(null);
  const shortcutRef = useRef(null);
  const navigate = useNavigate();

  const submit = (e) => {
    e?.preventDefault();
    const term = q.trim();
    if (term) navigate(`/search?q=${encodeURIComponent(term)}`);
  };

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        document.getElementById("global-search-input")?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (!headerRef.current || prefersReducedMotion()) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-gsap-nav]",
        { autoAlpha: 0, y: -14 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.055,
          ease: "power3.out",
        }
      );
    }, headerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!shortcutRef.current || prefersReducedMotion()) return undefined;

    gsap.fromTo(
      shortcutRef.current,
      { autoAlpha: 0, y: -10, scale: 0.96 },
      { autoAlpha: 1, y: 0, scale: 1, duration: 0.24, ease: "power2.out" }
    );
  }, [shortcuts]);

  return (
    <header ref={headerRef} className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90">
      <div className="flex h-14 min-w-0 items-center gap-2 px-3 sm:h-16 sm:gap-3 sm:px-4">
        <button
          data-gsap-nav
          onClick={onMenuClick}
          className="-ml-1 rounded p-2 text-stone-800 hover:bg-slate-200 dark:text-slate-200 dark:hover:bg-slate-800 md:hidden"
          aria-label="Open menu"
        >
          <FaBars size={20} />
        </button>

        <button
          data-gsap-nav
          onClick={onToggleCollapse}
          className="hidden h-9 w-9 shrink-0 items-center justify-center rounded text-stone-800 hover:bg-slate-200 dark:text-slate-200 dark:hover:bg-slate-800 lg:flex"
          aria-label="Toggle sidebar"
          title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {sidebarCollapsed ? <FaChevronRight size={14} /> : <FaChevronLeft size={14} />}
        </button>

        <Link data-gsap-nav to="/" className="flex shrink-0 items-center gap-2 select-none">
          <FaGamepad className="text-xl text-violet-600 sm:text-2xl" />
          <span className="hidden font-extrabold text-violet-600 sm:inline sm:text-lg">
            KD GameBlog
          </span>
        </Link>

        <form data-gsap-nav onSubmit={submit} className="relative min-w-0 flex-1">
          <SearchInput
            searchTerm={q}
            onInputChange={setQ}
            onSearchClick={submit}
            inputId="global-search-input"
          />
          <kbd className="pointer-events-none absolute right-24 top-1/2 hidden -translate-y-1/2 rounded border border-slate-300 px-1.5 py-0.5 text-[10px] text-slate-500 dark:border-slate-600 dark:text-slate-400 lg:inline-flex">
            Ctrl K
          </kbd>
        </form>

        <Link
          data-gsap-nav
          to="/browse"
          className="hidden items-center gap-1 rounded px-2 py-1.5 text-sm text-stone-700 hover:text-violet-600 dark:text-slate-200 lg:flex"
        >
          <FaGamepad size={14} /> Browse
        </Link>
        <Link
          data-gsap-nav
          to="/wishlist"
          className="hidden items-center gap-1 rounded px-2 py-1.5 text-sm text-stone-700 hover:text-violet-600 dark:text-slate-200 xl:flex"
        >
          Wishlist
        </Link>

        <button
          data-gsap-nav
          onClick={() => setShortcuts((v) => !v)}
          className="hidden rounded p-2 text-stone-700 hover:bg-slate-200 dark:text-slate-200 dark:hover:bg-slate-800 md:flex"
          aria-label="Shortcuts"
          title="Keyboard shortcuts"
        >
          <FaKeyboard size={16} />
        </button>

        <button
          data-gsap-nav
          onClick={() => {
            const next = theme === "light" ? "dark" : "light";
            setTheme(next);
            localStorage.setItem("theme", next);
          }}
          className="shrink-0 rounded-full bg-slate-200 p-2 text-stone-800 hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 sm:p-2.5"
          aria-label="Toggle theme"
        >
          {theme === "light" ? <FaMoon size={18} /> : <FaSun size={18} />}
        </button>
      </div>

      {shortcuts ? (
        <div ref={shortcutRef} className="absolute right-3 top-14 z-40 w-64 rounded-lg border border-slate-200 bg-white p-3 text-sm shadow-xl dark:border-slate-700 dark:bg-slate-800 sm:top-16">
          <p className="mb-2 font-bold text-stone-800 dark:text-white">
            Keyboard shortcuts
          </p>
          <ul className="space-y-1.5 text-stone-600 dark:text-slate-300">
            <li className="flex justify-between gap-3">
              <span>Focus search</span>
              <kbd className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] dark:bg-slate-700">
                Ctrl K
              </kbd>
            </li>
            <li className="flex justify-between gap-3">
              <span>Toggle theme</span>
              <kbd className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] dark:bg-slate-700">
                button
              </kbd>
            </li>
            <li className="flex justify-between gap-3">
              <span>Toggle sidebar</span>
              <kbd className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] dark:bg-slate-700">
                button
              </kbd>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
};

export default Header;
