import { useState, useEffect } from "react";

// ─── Countdown Hook ──────────────────────────────────────────────────────────

function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft(targetDate)), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
}

function getTimeLeft(target) {
  const diff = new Date(target) - new Date();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

// ─── Countdown Card ──────────────────────────────────────────────────────────

function CountdownCard({ value, label }) {
  return (
    <div className="glass rounded-2xl p-4 sm:p-6 min-w-[70px] sm:min-w-[90px] text-center group hover:border-[#4E0EFF]/20 transition-all duration-300">
      <div className="font-display text-3xl sm:text-5xl font-bold text-[#4E0EFF] tracking-tight">
        {String(value).padStart(2, "0")}
      </div>
      <div className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-gray-400 mt-1 sm:mt-2 font-medium">
        {label}
      </div>
    </div>
  );
}

// ─── Feature Card ────────────────────────────────────────────────────────────

function FeatureCard({ icon, title, desc, delay }) {
  return (
    <div
      className={`animate-fade-up ${delay} glass rounded-2xl p-5 sm:p-6 hover:border-[#4E0EFF]/20 hover:shadow-md hover:shadow-[#4E0EFF]/5 transition-all duration-300 cursor-default group`}
    >
      <div className="w-10 h-10 rounded-xl bg-[#4E0EFF]/10 flex items-center justify-center text-lg mb-3 group-hover:bg-[#4E0EFF]/15 transition-colors">
        {icon}
      </div>
      <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-1">
        {title}
      </h3>
      <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
    </div>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────

function App() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const timeLeft = useCountdown("2025-09-01T00:00:00");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#fafafe] text-gray-900">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Soft purple orbs */}
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#4E0EFF]/[0.04] blur-[120px] animate-float" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#7C4DFF]/[0.05] blur-[100px] animate-float-delayed" />
        <div className="absolute top-[50%] left-[60%] w-[300px] h-[300px] rounded-full bg-[#BB86FC]/[0.04] blur-[80px] animate-float" />

        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.3]"
          style={{
            backgroundImage: "radial-gradient(circle, #4E0EFF08 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center min-h-screen px-6 py-12 sm:py-16">
        {/* Nav */}
        <nav className="w-full max-w-5xl flex items-center justify-between mb-16 sm:mb-24 animate-fade-up delay-100">
          <img src="/logo.png" alt="Pasar" className="h-10 sm:h-12" />
          <div className="glass rounded-full px-4 py-1.5">
            <span className="text-[11px] sm:text-xs font-semibold tracking-widest text-[#4E0EFF]">
              COMING SOON
            </span>
          </div>
        </nav>

        {/* Hero */}
        <div className="flex-1 flex flex-col items-center justify-center max-w-3xl text-center -mt-10">
          <h1 className="animate-fade-up delay-200 font-display text-[2.5rem] sm:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight">
            <span className="text-gray-800">
              Your Local
            </span>
            <br />
            <span className="bg-gradient-to-r from-[#4E0EFF] via-[#6B2FFF] to-[#7C4DFF] bg-clip-text text-transparent animate-gradient">
              AI Marketplace
            </span>
          </h1>

          <p className="animate-fade-up delay-300 text-sm sm:text-base lg:text-lg text-gray-400 max-w-xl mt-5 sm:mt-6 leading-relaxed">
            Search for a plumber, sell your old iPhone, find cooking oil in bulk,
            or list your services — Pasar is the AI-powered local marketplace
            that connects businesses, buyers & service providers in one app.
          </p>

          {/* Countdown */}
          <div className="animate-fade-up delay-400 flex gap-3 sm:gap-4 mt-10 sm:mt-12">
            <CountdownCard value={timeLeft.days} label="Days" />
            <CountdownCard value={timeLeft.hours} label="Hours" />
            <CountdownCard value={timeLeft.minutes} label="Min" />
            <CountdownCard value={timeLeft.seconds} label="Sec" />
          </div>

          {/* Email Form */}
          <div className="animate-fade-up delay-500 mt-10 sm:mt-12 w-full max-w-md">
            {submitted ? (
              <div className="glass rounded-2xl p-5 text-center">
                <div className="text-2xl mb-2">🎉</div>
                <p className="text-sm text-gray-500 font-medium">
                  You're on the list! We'll notify you at launch.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="glass rounded-2xl p-1.5 flex items-center">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email for early access"
                    required
                    className="flex-1 bg-transparent px-4 sm:px-5 py-3 sm:py-3.5 text-sm text-gray-800 placeholder-gray-300 outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-[#4E0EFF] hover:bg-[#5E1FFF] text-white text-sm font-semibold px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-[#4E0EFF]/20 active:scale-[0.97] shrink-0 cursor-pointer"
                  >
                    Notify Me
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* What you can do */}
        <div className="w-full max-w-4xl mt-20 sm:mt-28">
          <h2 className="animate-fade-up delay-300 font-display text-xl sm:text-2xl font-bold text-center text-gray-800 mb-3">
            Everything in one app
          </h2>
          <p className="animate-fade-up delay-300 text-xs sm:text-sm text-gray-400 text-center mb-8 sm:mb-10 max-w-md mx-auto">
            From finding a driver to clearing old stock — search anything, post anything, manage everything.
          </p>

          {/* 3 Ad Types */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-3 sm:mb-4">
            <FeatureCard
              icon="📋"
              title="Service & Goods Listings"
              desc="Post ads for services like plumbing, driving, tutoring or goods you offer"
              delay="delay-300"
            />
            <FeatureCard
              icon="♻️"
              title="Pre-owned / Resell"
              desc="Sell second-hand items — phones, furniture, vehicles & more to nearby buyers"
              delay="delay-400"
            />
            <FeatureCard
              icon="📦"
              title="Stock Clearance"
              desc="Clear excess inventory at discounted prices — FMCG, electronics, bulk goods"
              delay="delay-500"
            />
          </div>

          {/* Other features */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <FeatureCard
              icon="🤖"
              title="AI Voice Assistant"
              desc='Say "Hey Sunny" to search, post ads or check warranties hands-free'
              delay="delay-400"
            />
            <FeatureCard
              icon="🔍"
              title="Smart Search"
              desc="Find anything nearby — drivers, plumbers, bulk cooking oil, used iPhones"
              delay="delay-500"
            />
            <FeatureCard
              icon="🔒"
              title="Warranty Vault"
              desc="Store all warranties digitally, get alerts before they expire"
              delay="delay-500"
            />
            <FeatureCard
              icon="🛡️"
              title="Insurance Vault"
              desc="Keep motor, health & gadget insurance policies organized in one place"
              delay="delay-600"
            />
            <FeatureCard
              icon="📊"
              title="Ads Monitoring"
              desc="Track views, calls & engagement on your ads with real-time analytics"
              delay="delay-500"
            />
            <FeatureCard
              icon="📍"
              title="Location Based"
              desc="Results ranked by distance — find what you need closest to you"
              delay="delay-600"
            />
            <FeatureCard
              icon="💼"
              title="Business Profiles"
              desc="Build your business presence with gallery, reviews & availability schedule"
              delay="delay-600"
            />
            <FeatureCard
              icon="💰"
              title="Wallet & Payments"
              desc="Seamless in-app payments for ad plans, promotions & premium features"
              delay="delay-700"
            />
          </div>
        </div>

        {/* Footer */}
        <footer className="animate-fade-up delay-700 mt-16 sm:mt-20 text-center pb-4">
          <p className="text-[11px] text-gray-300 font-medium tracking-[0.15em] uppercase">
            Pasar Technologies
          </p>
          <div className="flex gap-6 justify-center mt-3">
            {["X", "LinkedIn", "Instagram"].map((label) => (
              <a
                key={label}
                href="#"
                className="text-[11px] text-gray-300 hover:text-[#4E0EFF] transition-colors font-medium"
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
