import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════════════════════
   HOOKS
   ═══════════════════════════════════════════════════════════════════════════ */

function useCountdown(targetDate) {
  const [t, setT] = useState(calc(targetDate));
  useEffect(() => {
    const id = setInterval(() => setT(calc(targetDate)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  return t;
}
function calc(target) {
  const d = new Date(target) - new Date();
  if (d <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(d / 86400000),
    hours: Math.floor((d / 3600000) % 24),
    minutes: Math.floor((d / 60000) % 60),
    seconds: Math.floor((d / 1000) % 60),
  };
}

function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("visible"); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

function useRotatingText(words, ms = 2500) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((prev) => (prev + 1) % words.length), ms);
    return () => clearInterval(id);
  }, [words.length, ms]);
  return words[i];
}

// Track mouse for parallax
function useMouseParallax(strength = 0.02) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handler = (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      setOffset({ x: (e.clientX - cx) * strength, y: (e.clientY - cy) * strength });
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [strength]);
  return offset;
}

/* ═══════════════════════════════════════════════════════════════════════════
   COMPONENTS
   ═══════════════════════════════════════════════════════════════════════════ */

function CountdownCard({ value, label, delay }) {
  const [prev, setPrev] = useState(value);
  const [pop, setPop] = useState(false);

  useEffect(() => {
    if (value !== prev) {
      setPop(true);
      setPrev(value);
      const t = setTimeout(() => setPop(false), 400);
      return () => clearTimeout(t);
    }
  }, [value, prev]);

  return (
    <div className={`anim-hero-scale ${delay} glass-strong rounded-2xl p-3 sm:p-5 sm:min-w-[96px] text-center group hover:shadow-lg hover:shadow-[#4E0EFF]/10 hover:-translate-y-1.5 transition-all duration-500 shimmer-hover`}>
      <div className={`font-display text-3xl sm:text-5xl font-bold bg-gradient-to-b from-[#4E0EFF] to-[#7C4DFF] bg-clip-text text-transparent tracking-tight transition-transform duration-300 group-hover:scale-110 ${pop ? "anim-number-pop" : ""}`}>
        {String(value).padStart(2, "0")}
      </div>
      <div className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-gray-400 mt-1.5 font-medium">
        {label}
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="reveal-child glass rounded-2xl p-5 sm:p-6 hover:shadow-xl hover:shadow-[#4E0EFF]/8 hover:-translate-y-2 hover:border-[#4E0EFF]/15 transition-all duration-500 cursor-default group shimmer-hover">
      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#4E0EFF]/10 to-[#7C4DFF]/10 flex items-center justify-center text-xl mb-4 group-hover:scale-110 group-hover:rotate-3 group-hover:from-[#4E0EFF]/20 group-hover:to-[#7C4DFF]/20 transition-all duration-500">
        {icon}
      </div>
      <h3 className="text-sm sm:text-[15px] font-semibold text-gray-800 mb-1.5 group-hover:text-[#4E0EFF] transition-colors duration-300">
        {title}
      </h3>
      <p className="text-[12px] sm:text-[13px] text-gray-400 leading-relaxed">{desc}</p>
    </div>
  );
}

function AdTypeCard({ emoji, title, desc, tags }) {
  return (
    <div className="reveal-child glass-strong rounded-3xl p-7 sm:p-8 hover:shadow-2xl hover:shadow-[#4E0EFF]/8 hover:-translate-y-3 transition-all duration-500 group shimmer-hover">
      <div className="text-4xl mb-4 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 inline-block">{emoji}</div>
      <h3 className="font-display text-lg font-bold text-gray-800 mb-2 group-hover:text-[#4E0EFF] transition-colors duration-300">{title}</h3>
      <p className="text-sm text-gray-400 leading-relaxed mb-4">{desc}</p>
      <div className="flex flex-wrap gap-1.5">
        {tags.map((t) => (
          <span key={t} className="text-[10px] font-medium text-[#4E0EFF]/70 bg-[#4E0EFF]/[0.06] rounded-full px-2.5 py-1 group-hover:bg-[#4E0EFF]/[0.1] transition-colors duration-300">{t}</span>
        ))}
      </div>
    </div>
  );
}

function VaultCard({ emoji, title, desc, tags }) {
  return (
    <div className="reveal-child glass-strong rounded-3xl p-7 sm:p-8 hover:shadow-2xl hover:shadow-[#4E0EFF]/8 hover:-translate-y-2 transition-all duration-500 group shimmer-hover">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-[#4E0EFF]/15 to-[#7C4DFF]/15 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">{emoji}</div>
        <h3 className="font-display text-lg font-bold text-gray-800 group-hover:text-[#4E0EFF] transition-colors duration-300">{title}</h3>
      </div>
      <p className="text-sm text-gray-400 leading-relaxed mb-4">{desc}</p>
      <div className="flex flex-wrap gap-1.5">
        {tags.map((t) => (
          <span key={t} className="text-[10px] font-medium text-[#4E0EFF]/70 bg-[#4E0EFF]/[0.06] rounded-full px-2.5 py-1 group-hover:bg-[#4E0EFF]/[0.1] transition-colors duration-300">{t}</span>
        ))}
      </div>
    </div>
  );
}

function SearchPill({ text, delay }) {
  return (
    <span className={`anim-hero-slide ${delay} inline-block glass-strong rounded-full px-3.5 py-1.5 text-[11px] sm:text-xs font-medium text-gray-500 hover:text-[#4E0EFF] hover:border-[#4E0EFF]/15 hover:scale-105 transition-all duration-300 cursor-default`}>
      {text}
    </span>
  );
}

function SectionLabel({ text }) {
  return <p className="text-xs font-bold tracking-[0.2em] text-[#4E0EFF]/60 uppercase text-center mb-2">{text}</p>;
}

/* ═══════════════════════════════════════════════════════════════════════════
   PARTICLES
   ═══════════════════════════════════════════════════════════════════════════ */

function Particles({ count = 20 }) {
  const particles = useRef(
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 4,
      dx: (Math.random() - 0.5) * 200,
      dy: (Math.random() - 0.5) * 200,
      duration: 6 + Math.random() * 10,
      delay: Math.random() * 8,
    }))
  ).current;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-[#4E0EFF]/[0.08]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            "--dx": `${p.dx}px`,
            "--dy": `${p.dy}px`,
            animation: `particle-drift ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   APP
   ═══════════════════════════════════════════════════════════════════════════ */

const SEARCH_WORDS = ["plumber", "used iPhone", "cooking oil bulk", "driver", "electrician", "second-hand sofa", "caterer", "carpenter"];

function App() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const timeLeft = useCountdown("2025-09-01T00:00:00");
  const activeWord = useRotatingText(SEARCH_WORDS, 2500);
  const mouse = useMouseParallax(0.015);

  const adRef = useReveal();
  const featRef = useReveal();
  const vaultRef = useReveal();
  const ctaRef = useReveal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) { setSubmitted(true); setEmail(""); }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#FAFAFF] text-gray-900">

      {/* ── Animated Background ── */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Morphing blobs with parallax */}
        <div
          className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#4E0EFF]/[0.035] anim-morph anim-float-1 blur-[100px]"
          style={{ transform: `translate(${mouse.x * 2}px, ${mouse.y * 2}px)` }}
        />
        <div
          className="absolute bottom-[-15%] right-[-8%] w-[500px] h-[500px] bg-[#7C4DFF]/[0.04] anim-morph anim-float-2 blur-[90px]"
          style={{ animationDelay: "4s", transform: `translate(${-mouse.x * 1.5}px, ${-mouse.y * 1.5}px)` }}
        />
        <div
          className="absolute top-[40%] left-[50%] w-[350px] h-[350px] bg-[#BB86FC]/[0.03] anim-morph anim-pulse-glow blur-[80px]"
          style={{ animationDelay: "8s", transform: `translate(${mouse.x}px, ${mouse.y}px)` }}
        />

        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(circle, #4E0EFF08 1.2px, transparent 1.2px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Floating particles */}
        <Particles count={25} />

        {/* Orbit ring decoration (hero area) */}
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[300px] h-[300px] hidden sm:block">
          <div className="orbit-ring w-[240px] h-[240px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          <div className="orbit-ring w-[320px] h-[320px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          <div className="orbit-dot" />
          <div className="orbit-dot" />
          <div className="orbit-dot" />
        </div>
      </div>

      {/* ── Content ── */}
      <div className="relative z-10">

        {/* ── Nav ── */}
        <nav className="anim-hero-in d-0 max-w-6xl mx-auto flex items-center justify-between px-6 py-5 sm:py-6">
          <img src={`${import.meta.env.BASE_URL}logo.svg`} alt="Pasar" className="h-9 sm:h-11 hover:scale-105 transition-transform duration-300" />
          <div className="glass-strong rounded-full px-4 py-1.5 hover:shadow-md hover:scale-105 transition-all duration-300">
            <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] bg-gradient-to-r from-[#4E0EFF] to-[#7C4DFF] bg-clip-text text-transparent">
              COMING SOON
            </span>
          </div>
        </nav>

        {/* ── Hero ── */}
        <section className="flex flex-col items-center text-center px-6 pt-16 sm:pt-24 pb-20">

          {/* Rotating search pill */}
          <div className="anim-hero-up d-200 mb-6">
            <div className="glass-strong rounded-full px-5 py-2 inline-flex items-center gap-2 hover:shadow-md transition-shadow duration-300">
              <span className="text-[13px]">🔍</span>
              <span className="text-xs text-gray-400">People are searching for</span>
              <span key={activeWord} className="text-xs font-semibold text-[#4E0EFF] ticker-word inline-block min-w-[100px] text-left">
                {activeWord}
              </span>
            </div>
          </div>

          {/* Heading — letter by letter feel via word spans */}
          <h1 className="anim-hero-up d-400 font-display text-3xl sm:text-6xl lg:text-[5.2rem] font-bold leading-[1.08] tracking-tight max-w-4xl">
            <span className="text-gray-800">Market Place for</span>
            <br />
            <span className="bg-gradient-to-r from-[#4E0EFF] via-[#6B2FFF] to-[#9B6FFF] bg-clip-text text-transparent anim-gradient-x">
              Seamless Connect
            </span>
          </h1>

          <p className="anim-hero-up d-600 text-sm sm:text-base lg:text-lg text-gray-400 max-w-xl mt-5 sm:mt-7 leading-relaxed">
            Search for a plumber, sell your old iPhone, find cooking oil in bulk,
            or list your services — all powered by AI, all hyperlocal.
          </p>

          {/* Search examples */}
          <div className="flex flex-wrap justify-center gap-2 mt-6 max-w-lg">
            <SearchPill text='🔧 "Plumber near me"' delay="d-700" />
            <SearchPill text='📱 "Used iPhone 14"' delay="d-800" />
            <SearchPill text='🛢️ "Cooking oil bulk"' delay="d-900" />
            <SearchPill text='🚗 "Driver for hire"' delay="d-1000" />
          </div>

          {/* Countdown */}
          <div className="grid grid-cols-4 gap-2 sm:gap-4 mt-12 sm:mt-14 w-full max-w-sm sm:max-w-none sm:w-auto sm:flex">
            <CountdownCard value={timeLeft.days} label="Days" delay="d-800" />
            <CountdownCard value={timeLeft.hours} label="Hours" delay="d-900" />
            <CountdownCard value={timeLeft.minutes} label="Min" delay="d-1000" />
            <CountdownCard value={timeLeft.seconds} label="Sec" delay="d-1100" />
          </div>

          {/* Email */}
          <div className="anim-hero-up d-1200 mt-10 sm:mt-12 w-full max-w-md">
            {submitted ? (
              <div className="glass-strong rounded-2xl p-6 text-center anim-hero-scale d-0">
                <div className="text-3xl mb-2">🎉</div>
                <p className="text-sm text-gray-600 font-medium">You're on the list! We'll notify you at launch.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="glass-strong rounded-2xl p-1.5 flex flex-col sm:flex-row items-stretch sm:items-center gap-1.5 sm:gap-0 hover:shadow-lg hover:shadow-[#4E0EFF]/8 transition-all duration-500">
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email for early access" required
                    className="flex-1 bg-transparent px-4 sm:px-5 py-3.5 text-sm text-gray-800 placeholder-gray-300 outline-none" />
                  <button type="submit"
                    className="bg-gradient-to-r from-[#4E0EFF] to-[#6B2FFF] hover:from-[#5E1FFF] hover:to-[#7C4DFF] text-white text-sm font-semibold px-6 sm:px-8 py-3.5 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#4E0EFF]/30 active:scale-[0.95] shrink-0 cursor-pointer">
                    Notify Me
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>

        {/* ── 3 Ad Types ── */}
        <section className="max-w-5xl mx-auto px-6 py-16 sm:py-24">
          <div ref={adRef} className="reveal">
            <SectionLabel text="3 ways to sell" />
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-4">
              One app, every type of ad
            </h2>
            <p className="text-sm text-gray-400 text-center max-w-md mx-auto mb-12">
              Whether you offer services, sell second-hand goods, or want to clear stock — Pasar has a vertical for you.
            </p>
          </div>
          <div ref={useReveal()} className="reveal-stagger grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            <AdTypeCard emoji="📋" title="Ad Listings" desc="Post services like plumbing, driving, tutoring — or goods you offer locally." tags={["Services", "Goods", "Daily hire"]} />
            <AdTypeCard emoji="♻️" title="Pre-owned / Resell" desc="Sell second-hand items — phones, furniture, vehicles — to nearby buyers instantly." tags={["Electronics", "Furniture", "Vehicles"]} />
            <AdTypeCard emoji="📦" title="Stock Clearance" desc="Clear excess inventory at discounted prices — FMCG, electronics, bulk goods." tags={["FMCG", "Wholesale", "Bulk deals"]} />
          </div>
        </section>

        {/* ── Features ── */}
        <section className="max-w-5xl mx-auto px-6 py-16 sm:py-24">
          <div ref={featRef} className="reveal">
            <SectionLabel text="Packed with power" />
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-12">
              Built for how you actually work
            </h2>
          </div>
          <div ref={useReveal()} className="reveal-stagger grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <FeatureCard icon="🤖" title="AI Voice Assistant" desc='Say "Hey Sunny" to search, post ads or check warranties hands-free' />
            <FeatureCard icon="🔍" title="Smart Search" desc="Find anything nearby — drivers, plumbers, bulk cooking oil, used phones" />
            <FeatureCard icon="📊" title="Ads Monitoring" desc="Track views, calls & engagement on your ads with real-time analytics" />
            <FeatureCard icon="📍" title="Location Based" desc="Results ranked by distance — always find what's closest to you" />
            <FeatureCard icon="💼" title="Business Profiles" desc="Build your presence with gallery, reviews & availability schedule" />
            <FeatureCard icon="💰" title="Wallet & Payments" desc="Seamless in-app payments for ad plans, promotions & features" />
            <FeatureCard icon="🔔" title="Smart Alerts" desc="Get notified when warranties expire or new matches appear nearby" />
            <FeatureCard icon="🌐" title="Multilingual" desc="Use the app in Hindi, Kannada, Tamil, Telugu & more Indian languages" />
          </div>
        </section>

        {/* ── Vaults ── */}
        <section className="max-w-5xl mx-auto px-6 py-16 sm:py-24">
          <div ref={vaultRef} className="reveal">
            <SectionLabel text="Beyond marketplace" />
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-12">
              Your digital vault for peace of mind
            </h2>
          </div>
          <div ref={useReveal()} className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 max-w-3xl mx-auto">
            <VaultCard emoji="🔒" title="Warranty Vault" desc="Store all product warranties digitally. Get automatic reminders before they expire. Never lose a warranty receipt again." tags={["Auto-reminders", "Photo scan", "Expiry tracking"]} />
            <VaultCard emoji="🛡️" title="Insurance Vault" desc="Keep motor, health, gadget & property insurance policies organized. Renewal reminders so you're never unprotected." tags={["All policy types", "Renewal alerts", "Document storage"]} />
          </div>
        </section>

        {/* ── Bottom CTA ── */}
        <section ref={ctaRef} className="reveal max-w-3xl mx-auto px-6 py-16 sm:py-24 text-center">
          <div className="glass-strong rounded-3xl p-8 sm:p-12 hover:shadow-2xl hover:shadow-[#4E0EFF]/6 transition-shadow duration-700">
            <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-3">
              Be the first to experience Pasar
            </h2>
            <p className="text-sm text-gray-400 mb-8 max-w-md mx-auto">
              Join our early access list and get notified the moment we launch. Your local marketplace awaits.
            </p>
            {submitted ? (
              <p className="text-sm text-[#4E0EFF] font-semibold">🎉 You're already on the list!</p>
            ) : (
              <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" required
                    className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-300 outline-none focus:border-[#4E0EFF]/30 focus:ring-2 focus:ring-[#4E0EFF]/10 transition-all" />
                  <button type="submit"
                    className="bg-gradient-to-r from-[#4E0EFF] to-[#6B2FFF] hover:from-[#5E1FFF] hover:to-[#7C4DFF] text-white text-sm font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#4E0EFF]/25 active:scale-[0.95] cursor-pointer whitespace-nowrap">
                    Notify Me
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-100">
          <p className="text-[11px] text-gray-300 font-medium tracking-wider uppercase">
            &copy; {new Date().getFullYear()} Pasar Technologies
          </p>
          <a href="mailto:pasartechnologies@gmail.com" className="text-[11px] text-gray-400 hover:text-[#4E0EFF] transition-colors duration-300 font-medium">
            pasartechnologies@gmail.com
          </a>
          <div className="flex gap-6">
            {["X", "LinkedIn", "Instagram"].map((label) => (
              <a key={label} href="#" className="text-[11px] text-gray-300 hover:text-[#4E0EFF] transition-colors duration-300 font-medium">{label}</a>
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
