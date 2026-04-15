import { Link } from "react-router-dom";
import { UserCircle, FileText, GraduationCap, CreditCard, ArrowRight } from "lucide-react";

const quickLinks = [
  {
    title: "Student Portal",
    description: "Access your academic records, course registration, and results",
    icon: UserCircle,
    path: "/portal",
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Admissions",
    description: "Learn about our admission requirements and apply online",
    icon: FileText,
    path: "/registry",
    color: "bg-green-50 text-green-600",
  },
  {
    title: "Academic Programs",
    description: "Explore our diverse range of undergraduate and postgraduate programs",
    icon: GraduationCap,
    path: "/about",
    color: "bg-purple-50 text-purple-600",
  },
  {
    title: "Fees & Payments",
    description: "View fee structure, payment methods, and financial aid options",
    icon: CreditCard,
    path: "/bursary",
    color: "bg-amber-50 text-amber-600",
  },
];

const QuickLinks = () => {
  return (
    <section className="content-section bg-background">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="section-title">Quick Access</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Everything you need, just a click away
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickLinks.map((link) => (
            <Link
              key={link.title}
              to={link.path}
              className="group bg-card rounded-xl p-6 border border-border card-hover"
            >
              <div className={`w-12 h-12 rounded-lg ${link.color} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}>
                <link.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2 font-serif">
                {link.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {link.description}
              </p>
              <div className="flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2 transition-all duration-200">
                <span>Learn more</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickLinks;
