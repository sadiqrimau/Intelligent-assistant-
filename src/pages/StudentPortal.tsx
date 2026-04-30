import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { supabase } from "@/lib/supabase";
import { GraduationCap, User, Lock, Eye, EyeOff, Loader2, FileText } from "lucide-react";
import { Link } from "react-router-dom";

type AuthView = "login" | "dashboard";

const StudentPortal = () => {
  const [view, setView] = useState<AuthView>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    setLoading(false);

    if (authError) {
      setError(authError.message);
      return;
    }

    if (data.user) {
      setUserEmail(data.user.email ?? formData.email);
      setView("dashboard");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setView("login");
    setFormData({ email: "", password: "" });
    setUserEmail("");
  };

  // ── Dashboard ────────────────────────────────────────────────────────────
  if (view === "dashboard") {
    return (
      <Layout>
        <div className="min-h-[calc(100vh-200px)] bg-muted/30 py-12 px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-card rounded-2xl shadow-xl border border-border overflow-hidden animate-fade-in">
              {/* Header */}
              <div className="gradient-hero p-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                      <GraduationCap className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-primary-foreground/70 text-sm">Welcome back</p>
                      <h2 className="text-xl font-bold text-primary-foreground font-serif">
                        {userEmail}
                      </h2>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground border border-primary-foreground/30 hover:border-primary-foreground/60 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>

              {/* Quick Links */}
              <div className="p-6">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
                  Student Services
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { label: "Letter Assistant", desc: "Generate formal letters", icon: <FileText className="w-5 h-5" />, path: "/letter-assistant" },
                    { label: "Registry", desc: "Transcripts & certificates", icon: <GraduationCap className="w-5 h-5" />, path: "/registry" },
                    { label: "Bursary", desc: "Fees & payments", icon: <User className="w-5 h-5" />, path: "/bursary" },
                    { label: "Student Affairs", desc: "Campus life & welfare", icon: <Lock className="w-5 h-5" />, path: "/student-affairs" },
                  ].map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-all group"
                    >
                      <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{item.label}</p>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // ── Login Form ────────────────────────────────────────────────────────────
  return (
    <Layout>
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center bg-muted/30 py-12 px-4">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-2xl shadow-xl border border-border overflow-hidden animate-fade-in">
            {/* Header */}
            <div className="gradient-hero p-8 text-center">
              <div className="w-20 h-20 rounded-full bg-primary-foreground/20 flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-10 h-10 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold text-primary-foreground font-serif">
                Student Portal
              </h1>
              <p className="text-primary-foreground/70 mt-2">Al-Hikmah University</p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="p-8 space-y-6">
              {error && (
                <div className="bg-destructive/10 border border-destructive/30 text-destructive text-sm rounded-lg px-4 py-3">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email Address
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter your email"
                    required
                    className="input-field pl-10 w-full"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-foreground">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Enter your password"
                    required
                    className="input-field pl-10 pr-10 w-full"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                {loading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Signing in...</>
                ) : (
                  "Login"
                )}
              </button>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  New student?{" "}
                  <Link to="/registry" className="text-primary hover:underline font-medium">
                    Apply for admission
                  </Link>
                </p>
              </div>
            </form>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Having trouble logging in? Contact ICT Support at{" "}
            <a href="mailto:ict@alhikmah.edu.ng" className="text-primary hover:underline">
              ict@alhikmah.edu.ng
            </a>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default StudentPortal;
