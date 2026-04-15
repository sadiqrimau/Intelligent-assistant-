import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { GraduationCap, User, Lock, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

const StudentPortal = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder - login is not functional yet
    console.log("Login attempt:", formData);
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center bg-muted/30 py-12 px-4">
        <div className="w-full max-w-md">
          {/* Login Card */}
          <div className="bg-card rounded-2xl shadow-xl border border-border overflow-hidden animate-fade-in">
            {/* Header */}
            <div className="gradient-hero p-8 text-center">
              <div className="w-20 h-20 rounded-full bg-primary-foreground/20 flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-10 h-10 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold text-primary-foreground font-serif">
                Student Portal
              </h1>
              <p className="text-primary-foreground/70 mt-2">
                Al-Hikmah University
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium text-foreground">
                  Matric Number / Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    id="username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    placeholder="Enter your matric number"
                    className="input-field pl-10"
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
                    className="input-field pl-10 pr-10"
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

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-muted-foreground">Remember me</span>
                </label>
                <Link
                  to="#"
                  className="text-sm text-primary hover:underline font-medium"
                >
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Login
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

          {/* Help Text */}
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
