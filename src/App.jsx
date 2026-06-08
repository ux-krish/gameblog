import { useEffect, useRef, useState } from "react";
import {
  HashRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import gsap from "gsap";
import Header from "./components/common/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/common/Footer";
import MobileNav from "./components/MobileNav";
import { ThemeContext } from "./context/ThemeContext";
import { WishlistProvider } from "./context/WishlistContext";
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import GameDetails from "./pages/GameDetails";
import GenrePage from "./pages/GenrePage";
import PlatformPage from "./pages/PlatformPage";
import TagPage from "./pages/TagPage";
import PublisherPage from "./pages/PublisherPage";
import {
  PublishersPage,
  DevelopersPage,
  CreatorsPage,
  StoresPage,
} from "./pages/TaxonomyPages";
import { DeveloperPage, CreatorPage } from "./pages/PeoplePages";
import { Wishlist, Recent } from "./pages/PersonalPages";
import Search from "./pages/Search";
import NotFound from "./pages/NotFound";
import { prefersReducedMotion } from "./utils/motion";

/* Scrolls to top on every route change */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  const routeRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      gsap.set(routeRef.current, { autoAlpha: 1, clearProps: "transform,filter" });
      return undefined;
    }

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

      timeline
        .fromTo(
          routeRef.current,
          { autoAlpha: 0, y: 22, scale: 0.985, filter: "blur(10px)" },
          { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.55 }
        )
        .fromTo(
          "section, [data-page-title], [data-gsap-card]",
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.55,
            stagger: { amount: 0.36, from: "start" },
          },
          "-=0.28"
        );
    }, routeRef);

    return () => ctx.revert();
  }, [location.pathname, location.search]);

  return (
    <div
      key={`${location.pathname}${location.search}`}
      ref={routeRef}
      className="route-stage"
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/search" element={<Search />} />
        <Route path="/game/:id" element={<GameDetails />} />
        <Route path="/genre/:id" element={<GenrePage />} />
        <Route path="/platform/:id" element={<PlatformPage />} />
        <Route path="/tag/:id" element={<TagPage />} />
        <Route path="/publisher/:id" element={<PublisherPage />} />
        <Route path="/developer/:id" element={<DeveloperPage />} />
        <Route path="/creator/:id" element={<CreatorPage />} />
        <Route path="/publishers" element={<PublishersPage />} />
        <Route path="/developers" element={<DevelopersPage />} />
        <Route path="/creators" element={<CreatorsPage />} />
        <Route path="/stores" element={<StoresPage />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/recent" element={<Recent />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default function App() {
  const [theme, setTheme] = useState("dark");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  /* desktop sidebar can be collapsed to icon-rail */
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "dark";
    setTheme(saved);
    const collapsed = localStorage.getItem("sidebarCollapsed") === "true";
    setSidebarCollapsed(collapsed);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", String(sidebarCollapsed));
  }, [sidebarCollapsed]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <WishlistProvider>
        <HashRouter>
          <ScrollToTop />
          <div
            className={`${theme} min-h-screen flex flex-col ${
              theme === "dark" ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-stone-900"
            }`}
          >
            <Header
              onMenuClick={() => setSidebarOpen(true)}
              sidebarCollapsed={sidebarCollapsed}
              onToggleCollapse={() => setSidebarCollapsed((v) => !v)}
            />

            <div className="flex flex-1 min-h-0 relative">
              <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                collapsed={sidebarCollapsed}
              />

              {sidebarOpen ? (
                <div
                  className="fixed inset-0 z-30 bg-black/50 md:hidden"
                  onClick={() => setSidebarOpen(false)}
                />
              ) : null}

              <main className="flex-1 min-w-0 pb-20 md:pb-6">
                <AnimatedRoutes />
                <Footer />
              </main>
            </div>

            <MobileNav />
          </div>
        </HashRouter>
      </WishlistProvider>
    </ThemeContext.Provider>
  );
}
