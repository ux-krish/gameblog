import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import gsap from "gsap";
import { FaCompass, FaGamepad, FaHeart, FaHistory, FaSearch } from "react-icons/fa";
import { prefersReducedMotion } from "../utils/motion";

const items = [
  { to: "/", label: "Home", icon: <FaCompass /> },
  { to: "/browse", label: "Browse", icon: <FaGamepad /> },
  { to: "/search", label: "Search", icon: <FaSearch /> },
  { to: "/wishlist", label: "Saved", icon: <FaHeart /> },
  { to: "/recent", label: "Recent", icon: <FaHistory /> },
];

const MobileNav = () => {
  const navRef = useRef(null);

  useEffect(() => {
    if (!navRef.current || prefersReducedMotion()) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { yPercent: 105 },
        { yPercent: 0, duration: 0.6, ease: "power3.out" }
      );
      gsap.fromTo(
        "[data-mobile-nav-item]",
        { autoAlpha: 0, y: 12, scale: 0.92 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.45,
          stagger: 0.045,
          ease: "back.out(1.8)",
        }
      );
    }, navRef);

    return () => ctx.revert();
  }, []);

  return (
    <nav ref={navRef} className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/95 px-1.5 pb-[max(0.35rem,env(safe-area-inset-bottom))] pt-1.5 shadow-2xl shadow-black/10 backdrop-blur dark:border-slate-800 dark:bg-slate-900/95 md:hidden">
      <div className="grid grid-cols-5 gap-1">
        {items.map((item) => (
          <NavLink
            key={item.to}
            data-mobile-nav-item
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              `flex min-h-12 flex-col items-center justify-center gap-1 rounded-lg text-[11px] font-medium transition ${
                isActive
                  ? "bg-violet-600 text-white"
                  : "text-stone-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              }`
            }
          >
            <span className="text-base">{item.icon}</span>
            <span className="leading-none">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default MobileNav;
