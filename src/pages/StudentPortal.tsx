import Layout from "@/components/layout/Layout";
import { GraduationCap, User, Lock, FileText } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const StudentPortal = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

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
                      {user?.email}
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
};

export default StudentPortal;
