import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, MessageSquare, GraduationCap } from "lucide-react";

const suggestions = [
  "Check my fees",
  "Write a letter",
  "Registration deadline",
  "Course requirements",
  "Hostel application",
];

const HeroSection = () => {
  return (
    <section
      className="relative flex items-center overflow-hidden"
      style={{ background: "#0b1a10", minHeight: "calc(100vh - 80px)" }}
    >
      {/* ── Grain texture ── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.04 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="hero-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#hero-noise)" />
      </svg>

      {/* ── Radial glow blobs ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-10%",
          left: "25%",
          width: "70vw",
          height: "70vh",
          background:
            "radial-gradient(ellipse at center, hsl(153 45% 22% / 0.45) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "-5%",
          right: "-5%",
          width: "40vw",
          height: "50vh",
          background:
            "radial-gradient(ellipse at bottom right, hsl(45 93% 47% / 0.07) 0%, transparent 65%)",
        }}
      />

      {/* ── Content ── */}
      <div className="container-custom relative z-10 py-16 md:py-24">
        <div className="grid lg:grid-cols-[1fr_1.15fr] gap-12 lg:gap-20 items-center">

          {/* LEFT — Text */}
          <div>
            {/* AI badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-8 animate-fade-in"
              style={{
                border: "1px solid hsl(45 93% 47% / 0.3)",
                background: "hsl(45 93% 47% / 0.09)",
                color: "hsl(45 93% 65%)",
                letterSpacing: "0.07em",
              }}
            >
              <Sparkles className="w-3 h-3" />
              INTELLIGENT ADMIN ASSISTANT
            </div>

            {/* Headline */}
            <h1
              className="font-serif font-bold text-white mb-6 animate-fade-in"
              style={{
                fontSize: "clamp(2.6rem, 4.5vw, 3.9rem)",
                lineHeight: 1.07,
                letterSpacing: "-0.025em",
                animationDelay: "0.1s",
              }}
            >
              Your University,
              <br />
              <span className="text-gold-gradient">Intelligently</span> Assisted.
            </h1>

            {/* Subtitle */}
            <p
              className="text-base leading-relaxed mb-10 max-w-md animate-fade-in"
              style={{ color: "hsl(153 20% 68%)", animationDelay: "0.2s" }}
            >
              Ask questions, draft official letters, check deadlines, and navigate
              all university services — through one intelligent assistant built
              for Al-Hikmah.
            </p>

            {/* CTA */}
            <div
              className="flex flex-wrap gap-3 mb-12 animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              <Link
                to="/registry"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:brightness-110"
                style={{
                  background: "hsl(45 93% 47%)",
                  color: "#0b1a10",
                  boxShadow:
                    "0 0 30px hsl(45 93% 47% / 0.28), 0 4px 16px rgba(0,0,0,0.35)",
                }}
              >
                Apply Now <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/portal"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-medium text-sm transition-all duration-200 hover:bg-white/5"
                style={{
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "rgba(255,255,255,0.72)",
                }}
              >
                <MessageSquare className="w-4 h-4" />
                Student Portal
              </Link>
            </div>

            {/* Stats */}
            <div
              className="flex gap-10 animate-fade-in"
              style={{ animationDelay: "0.4s" }}
            >
              {[
                { value: "10,000+", label: "Students" },
                { value: "50+", label: "Programs" },
                { value: "NUC", label: "Accredited" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-serif font-bold text-white text-2xl">
                    {stat.value}
                  </div>
                  <div
                    className="text-xs mt-0.5"
                    style={{ color: "hsl(153 20% 48%)" }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Chat preview card */}
          <div className="relative animate-fade-in" style={{ animationDelay: "0.25s" }}>
            {/* Ambient glow */}
            <div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at 60% 50%, hsl(153 45% 30% / 0.25) 0%, transparent 70%)",
                filter: "blur(50px)",
                transform: "scale(1.2)",
              }}
            />

            {/* Card */}
            <div
              className="relative rounded-2xl overflow-hidden hero-chat-float"
              style={{
                background: "linear-gradient(150deg, #122219 0%, #0c1a12 100%)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow:
                  "0 32px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
            >
              {/* Card header */}
              <div
                className="flex items-center gap-3 px-5 py-4"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(153 45% 24%), hsl(153 45% 17%))",
                    border: "1px solid hsl(45 93% 47% / 0.35)",
                  }}
                >
                  <GraduationCap
                    className="w-4 h-4"
                    style={{ color: "hsl(45 93% 58%)" }}
                  />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-semibold text-white">
                    Al-Hikmah Assistant
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="online-dot" />
                    <span className="text-[10px] text-emerald-400">
                      Online now
                    </span>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                </div>
              </div>

              {/* Messages */}
              <div className="p-5 space-y-4">
                {/* AI message 1 */}
                <div className="flex gap-3">
                  <div
                    className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-bold"
                    style={{
                      background: "hsl(153 45% 20%)",
                      border: "1px solid hsl(153 45% 32%)",
                      color: "hsl(45 93% 58%)",
                    }}
                  >
                    A
                  </div>
                  <div
                    className="rounded-2xl rounded-tl-sm px-4 py-3 max-w-[82%]"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "rgba(255,255,255,0.85)" }}
                    >
                      Assalamu Alaikum! 👋 I'm your university assistant. Ask
                      me anything — fees, letters, deadlines.
                    </p>
                  </div>
                </div>

                {/* User message */}
                <div className="flex justify-end">
                  <div
                    className="rounded-2xl rounded-tr-sm px-4 py-3 max-w-[74%]"
                    style={{
                      background:
                        "linear-gradient(135deg, hsl(153 45% 22%), hsl(153 45% 16%))",
                      border: "1px solid hsl(153 45% 32% / 0.55)",
                    }}
                  >
                    <p
                      className="text-sm"
                      style={{ color: "rgba(255,255,255,0.9)" }}
                    >
                      Fee payment deadline?
                    </p>
                  </div>
                </div>

                {/* AI message 2 */}
                <div className="flex gap-3">
                  <div
                    className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-bold"
                    style={{
                      background: "hsl(153 45% 20%)",
                      border: "1px solid hsl(153 45% 32%)",
                      color: "hsl(45 93% 58%)",
                    }}
                  >
                    A
                  </div>
                  <div
                    className="rounded-2xl rounded-tl-sm px-4 py-3 max-w-[82%]"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "rgba(255,255,255,0.85)" }}
                    >
                      First semester fees are due{" "}
                      <span
                        style={{
                          color: "hsl(45 93% 62%)",
                          fontWeight: 600,
                        }}
                      >
                        2 weeks after resumption
                      </span>
                      . Late payment (with penalty) until week 4. 📅
                    </p>
                  </div>
                </div>

                {/* Typing indicator */}
                <div className="flex gap-3">
                  <div
                    className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-bold"
                    style={{
                      background: "hsl(153 45% 20%)",
                      border: "1px solid hsl(153 45% 32%)",
                      color: "hsl(45 93% 58%)",
                    }}
                  >
                    A
                  </div>
                  <div
                    className="rounded-2xl rounded-tl-sm px-4 py-3"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <div
                      className="flex gap-1 items-center"
                      style={{ height: "16px" }}
                    >
                      <span className="typing-dot" style={{ animationDelay: "0ms" }} />
                      <span className="typing-dot" style={{ animationDelay: "180ms" }} />
                      <span className="typing-dot" style={{ animationDelay: "360ms" }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Suggestion chips */}
              <div className="px-5 pb-4">
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((chip) => (
                    <span
                      key={chip}
                      className="px-3 py-1.5 rounded-full text-[11px] font-medium"
                      style={{
                        border: "1px solid hsl(45 93% 47% / 0.22)",
                        color: "hsl(45 93% 62%)",
                        background: "hsl(45 93% 47% / 0.07)",
                      }}
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>

              {/* Input row */}
              <div
                className="px-5 py-4"
                style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div
                  className="flex gap-3 items-center rounded-xl px-4 py-3"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <span
                    className="text-sm flex-1"
                    style={{ color: "rgba(255,255,255,0.2)" }}
                  >
                    Ask anything about Al-Hikmah…
                  </span>
                  <button
                    className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "hsl(45 93% 47%)" }}
                  >
                    <ArrowRight
                      className="w-3.5 h-3.5"
                      style={{ color: "#0b1a10" }}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Decorative corner glow */}
            <div
              className="absolute -top-8 -right-8 w-44 h-44 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, hsl(45 93% 47% / 0.12) 0%, transparent 70%)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Bottom gradient → page white */}
      <div
        className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, hsl(0 0% 100%))",
        }}
      />
    </section>
  );
};

export default HeroSection;
