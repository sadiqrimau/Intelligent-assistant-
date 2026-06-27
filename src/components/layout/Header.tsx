import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, GraduationCap, LogIn, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const navLinks = [
  { name: "Home", path: "/", protected: false },
  { name: "Academic Programs", path: "/programs", protected: true },
  { name: "Student Portal", path: "/portal", protected: true },
  { name: "Student Affairs", path: "/student-affairs", protected: true },
  { name: "Registry", path: "/registry", protected: true },
  { name: "Bursary", path: "/bursary", protected: true },
  { name: "Letter Assistant", path: "/letter-assistant", protected: true },
  { name: "About", path: "/about", protected: true },
  { name: "Contact", path: "/contact", protected: false },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  // visitors only see the public links; students see everything
  const visibleLinks = navLinks.filter((link) => !link.protected || user);

  const handleLogout = async () => {
    setIsMenuOpen(false);
    await signOut();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <GraduationCap className="w-6 h-6 md:w-7 md:h-7 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg md:text-xl font-bold text-primary font-serif leading-tight">
                Al-Hikmah University
              </h1>
              <p className="text-xs text-muted-foreground">Ilorin, Nigeria</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {visibleLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.path)
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground/80 hover:bg-secondary hover:text-primary"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {user ? (
              <button
                onClick={handleLogout}
                className="ml-2 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="ml-2 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 shadow-sm"
              >
                <LogIn className="w-4 h-4" /> Login
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-1">
              {visibleLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(link.path)
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground/80 hover:bg-secondary hover:text-primary"
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              {user ? (
                <button
                  onClick={handleLogout}
                  className="mt-2 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="mt-2 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200"
                >
                  <LogIn className="w-4 h-4" /> Login
                </Link>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
