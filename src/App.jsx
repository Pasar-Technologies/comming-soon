import { useState, useEffect, useRef } from "react";

// ─── Hooks ───────────────────────────────────────────────────────────────────

function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate));
  useEffect(() => {
    const t = setInterval(() => setTimeLeft(getTimeLeft(targetDate)), 1000);
    return () => clearInterval(t);
  }, [targetDate]);
  return timeLeft;
}

function getTimeLeft(target) {
  const d = new Date(target) - new Date();
  if (d <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(d / 86400000),
    hours: Math.floor((d / 3600000) % 24),
    minutes: Math.floor((d / 60000) % 60),
    seconds: Math.floor((d / 1000) % 60),
  };
}

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("visible");
          obs.unobserve(el);
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

// Rotating text hook
function useRotatingText(words, interval = 3000) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(
      () => setIndex((i) => (i + 1) % words.length),
      interval,
    );
    return () => clearInterval(t);
  }, [words.length, interval]);
  return words[index];
}

// ─── Components ──────────────────────────────────────────────────────────────

function CountdownCard({ value, label, delay }) {
  return (
    <div
      className={`animate-scale-in ${delay} glass-strong rounded-2xl p-3 sm:p-5 sm:min-w-[96px] text-center group hover:shadow-lg hover:shadow-[#4E0EFF]/8 hover:-translate-y-1 transition-all duration-500`}
    >
      <div className="font-display text-3xl sm:text-5xl font-bold bg-gradient-to-b from-[#4E0EFF] to-[#7C4DFF] bg-clip-text text-transparent tracking-tight transition-transform duration-300 group-hover:scale-110">
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
    <div className="reveal-child glass rounded-2xl p-5 sm:p-6 hover:shadow-xl hover:shadow-[#4E0EFF]/6 hover:-translate-y-2 hover:border-[#4E0EFF]/15 transition-all duration-500 cursor-default group">
      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#4E0EFF]/10 to-[#7C4DFF]/10 flex items-center justify-center text-xl mb-4 group-hover:scale-110 group-hover:from-[#4E0EFF]/20 group-hover:to-[#7C4DFF]/20 transition-all duration-500">
        {icon}
      </div>
      <h3 className="text-sm sm:text-[15px] font-semibold text-gray-800 mb-1.5 group-hover:text-[#4E0EFF] transition-colors duration-300">
        {title}
      </h3>
      <p className="text-[12px] sm:text-[13px] text-gray-400 leading-relaxed">
        {desc}
      </p>
    </div>
  );
}

function SearchExample({ text, delay }) {
  return (
    <span
      className={`animate-fade-up ${delay} inline-block glass-strong rounded-full px-3.5 py-1.5 text-[11px] sm:text-xs font-medium text-gray-500 hover:text-[#4E0EFF] hover:border-[#4E0EFF]/15 transition-all duration-300 cursor-default`}
    >
      {text}
    </span>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────

const SEARCH_WORDS = [
  "plumber",
  "used iPhone",
  "cooking oil bulk",
  "driver",
  "electrician",
  "second-hand sofa",
  "caterer",
];

function App() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const timeLeft = useCountdown("2025-09-01T00:00:00");
  const activeWord = useRotatingText(SEARCH_WORDS, 2500);

  const featuresRef = useReveal();
  const adTypesRef = useReveal();
  const vaultsRef = useReveal();
  const ctaRef = useReveal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#FAFAFF] text-gray-900">
      {/* ── Background ── */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-25%] left-[-15%] w-[700px] h-[700px] rounded-full bg-[#4E0EFF]/[0.03] blur-[150px] animate-float" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#7C4DFF]/[0.04] blur-[130px] animate-float-slow" />
        <div className="absolute top-[35%] left-[55%] w-[400px] h-[400px] rounded-full bg-[#BB86FC]/[0.03] blur-[100px] animate-pulse-soft" />
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "radial-gradient(circle, #4E0EFF06 1.2px, transparent 1.2px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative z-10">
        {/* ── Nav ── */}
        <nav className="animate-fade-in delay-0 max-w-6xl mx-auto flex items-center justify-between px-6 py-5 sm:py-6">
          <img
            src={`${import.meta.env.BASE_URL}logo.png`}
            alt="Pasar"
            className="h-9 sm:h-11"
          />
          <div className="glass-strong rounded-full px-4 py-1.5 hover:shadow-md transition-shadow duration-300">
            <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] bg-gradient-to-r from-[#4E0EFF] to-[#7C4DFF] bg-clip-text text-transparent">
              COMING SOON
            </span>
          </div>
        </nav>

        {/* ── Hero ── */}
        <section className="flex flex-col items-center text-center px-6 pt-16 sm:pt-24 pb-20">
          {/* Rotating search pill */}
          <div className="animate-fade-up delay-200 mb-6">
            <div className="glass-strong rounded-full px-5 py-2 inline-flex items-center gap-2">
              <span className="text-[13px]">🔍</span>
              <span className="text-xs text-gray-400">
                People are searching for
              </span>
              <span
                key={activeWord}
                className="text-xs font-semibold text-[#4E0EFF] ticker-item inline-block min-w-[100px] text-left"
              >
                {activeWord}
              </span>
            </div>
          </div>

          <h1 className="animate-fade-up delay-300 font-display text-3xl sm:text-6xl lg:text-[5.2rem] font-bold leading-[1.08] tracking-tight max-w-4xl">
            <span className="text-gray-800">Market Place for</span>
            <br />
            <span className="bg-gradient-to-r from-[#4E0EFF] via-[#6B2FFF] to-[#9B6FFF] bg-clip-text text-transparent animate-gradient-x">
              Seamless Connect
            </span>
          </h1>

          <p className="animate-fade-up delay-500 text-sm sm:text-base lg:text-lg text-gray-400 max-w-xl mt-5 sm:mt-7 leading-relaxed">
            Search for a plumber, sell your old iPhone, find cooking oil in
            bulk, or list your services — all powered by AI, all hyperlocal.
          </p>

          {/* Search examples */}
          <div className="flex flex-wrap justify-center gap-2 mt-6 max-w-lg">
            <SearchExample text='🔧 "Plumber near me"' delay="delay-600" />
            <SearchExample text='📱 "Used iPhone 14"' delay="delay-700" />
            <SearchExample text='🛢️ "Cooking oil bulk"' delay="delay-700" />
            <SearchExample text='🚗 "Driver for hire"' delay="delay-800" />
          </div>

          {/* Countdown */}
          <div className="grid grid-cols-4 gap-2 sm:gap-4 mt-12 sm:mt-14 w-full max-w-sm sm:max-w-none sm:w-auto sm:flex">
            <CountdownCard
              value={timeLeft.days}
              label="Days"
              delay="delay-600"
            />
            <CountdownCard
              value={timeLeft.hours}
              label="Hours"
              delay="delay-700"
            />
            <CountdownCard
              value={timeLeft.minutes}
              label="Min"
              delay="delay-800"
            />
            <CountdownCard
              value={timeLeft.seconds}
              label="Sec"
              delay="delay-900"
            />
          </div>

          {/* Email */}
          <div className="animate-fade-up delay-1000 mt-10 sm:mt-12 w-full max-w-md">
            {submitted ? (
              <div className="glass-strong rounded-2xl p-6 text-center animate-scale-in delay-0">
                <div className="text-3xl mb-2">🎉</div>
                <p className="text-sm text-gray-600 font-medium">
                  You're on the list! We'll notify you at launch.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="glass-strong rounded-2xl p-1.5 flex flex-col sm:flex-row items-stretch sm:items-center gap-1.5 sm:gap-0 hover:shadow-lg hover:shadow-[#4E0EFF]/6 transition-shadow duration-500">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email for early access"
                    required
                    className="flex-1 bg-transparent px-4 sm:px-5 py-3.5 text-sm text-gray-800 placeholder-gray-300 outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-[#4E0EFF] to-[#6B2FFF] hover:from-[#5E1FFF] hover:to-[#7C4DFF] text-white text-sm font-semibold px-6 sm:px-8 py-3.5 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#4E0EFF]/25 active:scale-[0.96] shrink-0 cursor-pointer"
                  >
                    Notify Me
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>

        {/* ── 3 Ad Types ── */}
        <section className="max-w-5xl mx-auto px-6 py-16 sm:py-24">
          <div ref={adTypesRef} className="reveal">
            <p className="text-xs font-bold tracking-[0.2em] text-[#4E0EFF]/60 uppercase text-center mb-2">
              3 ways to sell
            </p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-4">
              One app, every type of ad
            </h2>
            <p className="text-sm text-gray-400 text-center max-w-md mx-auto mb-12">
              Whether you offer services, sell second-hand goods, or want to
              clear stock — Pasar has a vertical for you.
            </p>
          </div>

          <div
            ref={useReveal()}
            className="reveal-stagger grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5"
          >
            <div className="reveal-child glass-strong rounded-3xl p-7 sm:p-8 hover:shadow-xl hover:shadow-[#4E0EFF]/6 hover:-translate-y-2 transition-all duration-500 group">
              <div className="text-3xl mb-4">📋</div>
              <h3 className="font-display text-lg font-bold text-gray-800 mb-2 group-hover:text-[#4E0EFF] transition-colors">
                Ad Listings
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                Post services like plumbing, driving, tutoring — or goods you
                offer locally.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {["Services", "Goods", "Daily hire"].map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-medium text-[#4E0EFF]/70 bg-[#4E0EFF]/[0.06] rounded-full px-2.5 py-1"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="reveal-child glass-strong rounded-3xl p-7 sm:p-8 hover:shadow-xl hover:shadow-[#4E0EFF]/6 hover:-translate-y-2 transition-all duration-500 group">
              <div className="text-3xl mb-4">♻️</div>
              <h3 className="font-display text-lg font-bold text-gray-800 mb-2 group-hover:text-[#4E0EFF] transition-colors">
                Pre-owned / Resell
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                Sell second-hand items — phones, furniture, vehicles — to nearby
                buyers instantly.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {["Electronics", "Furniture", "Vehicles"].map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-medium text-[#4E0EFF]/70 bg-[#4E0EFF]/[0.06] rounded-full px-2.5 py-1"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="reveal-child glass-strong rounded-3xl p-7 sm:p-8 hover:shadow-xl hover:shadow-[#4E0EFF]/6 hover:-translate-y-2 transition-all duration-500 group">
              <div className="text-3xl mb-4">📦</div>
              <h3 className="font-display text-lg font-bold text-gray-800 mb-2 group-hover:text-[#4E0EFF] transition-colors">
                Stock Clearance
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                Clear excess inventory at discounted prices — FMCG, electronics,
                bulk goods.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {["FMCG", "Wholesale", "Bulk deals"].map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-medium text-[#4E0EFF]/70 bg-[#4E0EFF]/[0.06] rounded-full px-2.5 py-1"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Features ── */}
        <section className="max-w-5xl mx-auto px-6 py-16 sm:py-24">
          <div ref={featuresRef} className="reveal">
            <p className="text-xs font-bold tracking-[0.2em] text-[#4E0EFF]/60 uppercase text-center mb-2">
              Packed with power
            </p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-12">
              Built for how you actually work
            </h2>
          </div>

          <div
            ref={useReveal()}
            className="reveal-stagger grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4"
          >
            <FeatureCard
              icon="🤖"
              title="AI Voice Assistant"
              desc='Say "Hey Sunny" to search, post ads or check warranties hands-free'
            />
            <FeatureCard
              icon="🔍"
              title="Smart Search"
              desc="Find anything nearby — drivers, plumbers, bulk cooking oil, used phones"
            />
            <FeatureCard
              icon="📊"
              title="Ads Monitoring"
              desc="Track views, calls & engagement on your ads with real-time analytics"
            />
            <FeatureCard
              icon="📍"
              title="Location Based"
              desc="Results ranked by distance — always find what's closest to you"
            />
            <FeatureCard
              icon="💼"
              title="Business Profiles"
              desc="Build your presence with gallery, reviews & availability schedule"
            />
            <FeatureCard
              icon="💰"
              title="Wallet & Payments"
              desc="Seamless in-app payments for ad plans, promotions & features"
            />
            <FeatureCard
              icon="🔔"
              title="Smart Alerts"
              desc="Get notified when warranties expire or new matches appear nearby"
            />
            <FeatureCard
              icon="🌐"
              title="Multilingual"
              desc="Use the app in Hindi, Kannada, Tamil, Telugu & more Indian languages"
            />
          </div>
        </section>

        {/* ── Vaults ── */}
        <section className="max-w-5xl mx-auto px-6 py-16 sm:py-24">
          <div ref={vaultsRef} className="reveal">
            <p className="text-xs font-bold tracking-[0.2em] text-[#4E0EFF]/60 uppercase text-center mb-2">
              Beyond marketplace
            </p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-12">
              Your digital vault for peace of mind
            </h2>
          </div>

          <div
            ref={useReveal()}
            className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 max-w-3xl mx-auto"
          >
            <div className="reveal-child glass-strong rounded-3xl p-7 sm:p-8 hover:shadow-xl hover:shadow-[#4E0EFF]/6 hover:-translate-y-1 transition-all duration-500 group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#4E0EFF]/15 to-[#7C4DFF]/15 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-500">
                  🔒
                </div>
                <h3 className="font-display text-lg font-bold text-gray-800 group-hover:text-[#4E0EFF] transition-colors">
                  Warranty Vault
                </h3>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                Store all product warranties digitally. Get automatic reminders
                before they expire. Never lose a warranty receipt again.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {["Auto-reminders", "Photo scan", "Expiry tracking"].map(
                  (t) => (
                    <span
                      key={t}
                      className="text-[10px] font-medium text-[#4E0EFF]/70 bg-[#4E0EFF]/[0.06] rounded-full px-2.5 py-1"
                    >
                      {t}
                    </span>
                  ),
                )}
              </div>
            </div>

            <div className="reveal-child glass-strong rounded-3xl p-7 sm:p-8 hover:shadow-xl hover:shadow-[#4E0EFF]/6 hover:-translate-y-1 transition-all duration-500 group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#4E0EFF]/15 to-[#7C4DFF]/15 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-500">
                  🛡️
                </div>
                <h3 className="font-display text-lg font-bold text-gray-800 group-hover:text-[#4E0EFF] transition-colors">
                  Insurance Vault
                </h3>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                Keep motor, health, gadget & property insurance policies
                organized. Renewal reminders so you're never unprotected.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {["All policy types", "Renewal alerts", "Document storage"].map(
                  (t) => (
                    <span
                      key={t}
                      className="text-[10px] font-medium text-[#4E0EFF]/70 bg-[#4E0EFF]/[0.06] rounded-full px-2.5 py-1"
                    >
                      {t}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── Bottom CTA ── */}
        <section
          ref={ctaRef}
          className="reveal max-w-3xl mx-auto px-6 py-16 sm:py-24 text-center"
        >
          <div className="glass-strong rounded-3xl p-8 sm:p-12">
            <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-3">
              Be the first to experience Pasar
            </h2>
            <p className="text-sm text-gray-400 mb-8 max-w-md mx-auto">
              Join our early access list and get notified the moment we launch.
              Your local marketplace awaits.
            </p>
            {submitted ? (
              <p className="text-sm text-[#4E0EFF] font-semibold">
                🎉 You're already on the list!
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-300 outline-none focus:border-[#4E0EFF]/30 focus:ring-2 focus:ring-[#4E0EFF]/10 transition-all"
                  />
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-[#4E0EFF] to-[#6B2FFF] hover:from-[#5E1FFF] hover:to-[#7C4DFF] text-white text-sm font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#4E0EFF]/25 active:scale-[0.96] cursor-pointer whitespace-nowrap"
                  >
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
            &copy; 2025 Pasar Technologies
          </p>
          <div className="flex gap-6">
            {["X", "LinkedIn", "Instagram"].map((label) => (
              <a
                key={label}
                href="#"
                className="text-[11px] text-gray-300 hover:text-[#4E0EFF] transition-colors duration-300 font-medium"
              >
                {label}
              </a>
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
