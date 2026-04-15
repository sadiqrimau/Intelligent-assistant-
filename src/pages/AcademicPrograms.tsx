import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/ui/PageHeader";
import { BookOpen, GraduationCap, Clock, Users, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const undergraduatePrograms = [
  {
    faculty: "Faculty of Sciences",
    programs: [
      "B.Sc. Computer Science",
      "B.Sc. Mathematics",
      "B.Sc. Physics",
      "B.Sc. Chemistry",
      "B.Sc. Biology",
      "B.Sc. Microbiology",
    ],
  },
  {
    faculty: "Faculty of Humanities",
    programs: [
      "B.A. English Language",
      "B.A. Arabic Language",
      "B.A. Islamic Studies",
      "B.A. History",
      "B.A. Philosophy",
    ],
  },
  {
    faculty: "Faculty of Management Sciences",
    programs: [
      "B.Sc. Accounting",
      "B.Sc. Business Administration",
      "B.Sc. Economics",
      "B.Sc. Banking & Finance",
    ],
  },
  {
    faculty: "Faculty of Law",
    programs: ["LL.B. Law", "LL.B. Islamic Law (Sharia)"],
  },
  {
    faculty: "Faculty of Education",
    programs: [
      "B.Ed. Educational Management",
      "B.Ed. Guidance & Counseling",
      "B.Ed. Science Education",
      "B.Ed. Arts Education",
    ],
  },
];

const graduatePrograms = [
  {
    faculty: "School of Postgraduate Studies",
    programs: [
      { name: "M.Sc. Computer Science", duration: "18 months" },
      { name: "M.Sc. Mathematics", duration: "18 months" },
      { name: "MBA Business Administration", duration: "24 months" },
      { name: "M.A. Islamic Studies", duration: "18 months" },
      { name: "M.Ed. Educational Management", duration: "18 months" },
      { name: "LL.M. Law", duration: "18 months" },
      { name: "Ph.D. Computer Science", duration: "36 months" },
      { name: "Ph.D. Islamic Studies", duration: "36 months" },
      { name: "Ph.D. Educational Management", duration: "36 months" },
    ],
  },
];

const AcademicPrograms = () => {
  return (
    <Layout>
      <PageHeader
        title="Academic Programs"
        subtitle="Discover our comprehensive range of undergraduate and postgraduate programs designed to prepare you for success"
      />

      {/* Overview Section */}
      <section className="py-12 bg-secondary/30">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: BookOpen,
                title: "50+ Programs",
                description:
                  "Wide range of undergraduate and postgraduate programs",
              },
              {
                icon: Users,
                title: "Expert Faculty",
                description:
                  "Learn from experienced professors and industry experts",
              },
              {
                icon: GraduationCap,
                title: "NUC Accredited",
                description:
                  "All programs approved by the National Universities Commission",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-background p-6 rounded-xl shadow-sm border border-border"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Undergraduate Programs */}
      <section className="py-16">
        <div className="container-custom">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary-foreground" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground font-serif">
                Undergraduate Programs
              </h2>
            </div>
            <p className="text-muted-foreground max-w-2xl">
              Our undergraduate programs offer a solid foundation in your chosen
              field, combining theoretical knowledge with practical skills.
              Duration: 4-5 years depending on the program.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {undergraduatePrograms.map((faculty) => (
              <div
                key={faculty.faculty}
                className="bg-background border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="bg-primary/5 px-6 py-4 border-b border-border">
                  <h3 className="font-semibold text-primary">
                    {faculty.faculty}
                  </h3>
                </div>
                <ul className="p-6 space-y-3">
                  {faculty.programs.map((program) => (
                    <li key={program} className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-foreground">{program}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Graduate Programs */}
      <section className="py-16 bg-secondary/30">
        <div className="container-custom">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-primary-foreground" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground font-serif">
                Postgraduate Programs
              </h2>
            </div>
            <p className="text-muted-foreground max-w-2xl">
              Advance your career with our postgraduate programs. Our Master's
              and Ph.D. programs are designed for working professionals and
              research-oriented individuals.
            </p>
          </div>

          <div className="bg-background border border-border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-primary/5 border-b border-border">
                    <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                      Program
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                      Duration
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                      Level
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {graduatePrograms[0].programs.map((program, index) => (
                    <tr
                      key={program.name}
                      className={`border-b border-border last:border-0 ${
                        index % 2 === 0 ? "bg-background" : "bg-secondary/20"
                      }`}
                    >
                      <td className="px-6 py-4 text-sm text-foreground">
                        {program.name}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          {program.duration}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                            program.name.startsWith("Ph.D")
                              ? "bg-accent text-accent-foreground"
                              : "bg-primary/10 text-primary"
                          }`}
                        >
                          {program.name.startsWith("Ph.D")
                            ? "Doctorate"
                            : "Master's"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="bg-primary rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4 font-serif">
              Ready to Start Your Journey?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              Take the first step towards your future. Apply now or contact our
              admissions team for more information.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/registry"
                className="inline-flex items-center gap-2 bg-primary-foreground text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary-foreground/90 transition-colors"
              >
                Apply Now
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 border-2 border-primary-foreground text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary-foreground/10 transition-colors"
              >
                Contact Admissions
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AcademicPrograms;
