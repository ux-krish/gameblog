import { useEffect, useState } from "react";
import GlobalApi from "../services/GlobalApi";
import HeroBanner from "../components/HeroBanner";
import Grid, { Section, Skeleton } from "../components/common/GameSection";
import { useWishlist } from "../context/WishlistContext";
import { FaCalendarAlt, FaClock, FaFire, FaStar, FaTrophy } from "react-icons/fa";

const Home = () => {
  const [trending, setTrending] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [mostPlayed, setMostPlayed] = useState([]);
  const [best2025, setBest2025] = useState([]);
  const [best2024, setBest2024] = useState([]);
  const [loading, setLoading] = useState(true);
  const { recent } = useWishlist();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [t, r, n, u, p, b25, b24] = await Promise.all([
          GlobalApi.getTrending(),
          GlobalApi.getTopRated(),
          GlobalApi.getNewReleases(),
          GlobalApi.getUpcoming(),
          GlobalApi.getMostPlayed(),
          GlobalApi.getBestOfYear(2025),
          GlobalApi.getBestOfYear(2024),
        ]);
        setTrending(t.data.results);
        setTopRated(r.data.results);
        setNewReleases(n.data.results);
        setUpcoming(u.data.results);
        setMostPlayed(p.data.results);
        setBest2025(b25.data.results);
        setBest2024(b24.data.results);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="px-4 sm:px-6 py-4 space-y-2">
      <HeroBanner slides={trending.slice(0, 5)} />

      <Section
        title={
          <span className="flex items-center gap-2">
            <FaFire className="text-orange-500" /> Trending Now
          </span>
        }
        link="/browse?sort=-added"
      >
        {loading ? <Skeleton /> : <Grid games={trending} />}
      </Section>

      <Section
        title={
          <span className="flex items-center gap-2">
            <FaStar className="text-amber-400" /> Top Rated of All Time
          </span>
        }
        link="/browse?sort=-rating"
      >
        {loading ? <Skeleton /> : <Grid games={topRated} />}
      </Section>

      <Section
        title={
          <span className="flex items-center gap-2">
            <FaCalendarAlt className="text-violet-500" /> New Releases
          </span>
        }
        link="/browse?sort=-released"
      >
        {loading ? <Skeleton /> : <Grid games={newReleases} />}
      </Section>

      <Section
        title={
          <span className="flex items-center gap-2">
            <FaClock className="text-blue-500" /> Upcoming Games
          </span>
        }
        link="/browse?sort=released&from=2026-06-01"
      >
        {loading ? <Skeleton /> : <Grid games={upcoming} />}
      </Section>

      <Section
        title={
          <span className="flex items-center gap-2">
            <FaTrophy className="text-emerald-500" /> Best of 2025
          </span>
        }
        link="/browse?sort=-rating&from=2025-01-01&to=2025-12-31"
      >
        {loading ? <Skeleton /> : <Grid games={best2025} />}
      </Section>

      <Section
        title="Most Played"
        link="/browse?sort=-added"
      >
        {loading ? <Skeleton /> : <Grid games={mostPlayed} />}
      </Section>

      <Section
        title="Best of 2024"
        link="/browse?sort=-rating&from=2024-01-01&to=2024-12-31"
      >
        {loading ? <Skeleton /> : <Grid games={best2024} />}
      </Section>

      {recent.length ? (
        <Section title="Recently Viewed" link="/recent">
          <Grid games={recent} />
        </Section>
      ) : null}
    </div>
  );
};

export default Home;
