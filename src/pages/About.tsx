import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/ui/PageHeader";
import ContentSection from "@/components/ui/ContentSection";
import { Target, Eye, BookOpen, Users, Award, Globe } from "lucide-react";

const About = () => {
  return (
    <Layout>
      <PageHeader
        title="About Al-Hikmah University"
        subtitle="A premier institution committed to excellence in Islamic and conventional education"
      />

      <section className="content-section">
        <div className="container-custom">
          <div className="grid gap-8">
            {/* Introduction */}
            <ContentSection title="Our Story">
              <p className="mb-4">
                Al-Hikmah University was established in 2005 and is located in Ilorin, the capital city of Kwara State, Nigeria. The university was founded by the AbdulRaheem Oladimeji Islamic Foundation (AROIF) with a vision to provide quality education that combines Islamic values with modern academic excellence.
              </p>
              <p className="mb-4">
                The name "Al-Hikmah" means "The Wisdom" in Arabic, reflecting our commitment to nurturing students who are not only academically sound but also morally upright and socially responsible.
              </p>
              <p>
                Over the years, Al-Hikmah University has grown to become one of Nigeria's respected private universities, producing graduates who excel in various fields across the nation and beyond.
              </p>
            </ContentSection>

            {/* Vision & Mission */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card rounded-xl border border-border p-6 md:p-8">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Eye className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4 font-serif">
                  Our Vision
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  To be a world-class institution that produces graduates who are intellectually competent, morally upright, and socially responsible, contributing positively to national and global development.
                </p>
              </div>

              <div className="bg-card rounded-xl border border-border p-6 md:p-8">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4 font-serif">
                  Our Mission
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  To provide quality education in an environment that promotes academic excellence, character development, and the pursuit of knowledge for the service of humanity, guided by Islamic principles and universal values.
                </p>
              </div>
            </div>

            {/* Core Values */}
            <ContentSection title="Core Values">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {[
                  { icon: BookOpen, title: "Excellence", desc: "Commitment to the highest academic standards" },
                  { icon: Users, title: "Integrity", desc: "Upholding honesty and ethical conduct" },
                  { icon: Award, title: "Innovation", desc: "Encouraging creativity and forward thinking" },
                  { icon: Globe, title: "Service", desc: "Dedication to community and humanity" },
                  { icon: Target, title: "Discipline", desc: "Maintaining order and self-control" },
                  { icon: Eye, title: "Wisdom", desc: "Applying knowledge with understanding" },
                ].map((value) => (
                  <div key={value.title} className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <value.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{value.title}</h4>
                      <p className="text-sm text-muted-foreground">{value.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ContentSection>

            {/* Faculties */}
            <ContentSection title="Our Faculties">
              <p className="mb-4">
                Al-Hikmah University offers a wide range of academic programs across several faculties, each designed to provide comprehensive education in their respective fields.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  "Faculty of Arts",
                  "Faculty of Education",
                  "Faculty of Humanities",
                  "Faculty of Law",
                  "Faculty of Management Sciences",
                  "Faculty of Natural Sciences",
                  "Faculty of Health Sciences",
                  "Faculty of Engineering",
                ].map((faculty) => (
                  <div key={faculty} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-foreground font-medium">{faculty}</span>
                  </div>
                ))}
              </div>
            </ContentSection>

            {/* Accreditation */}
            <ContentSection title="Accreditation & Recognition">
              <p className="mb-4">
                Al-Hikmah University is fully accredited by the National Universities Commission (NUC) of Nigeria. All our programs have received full accreditation, ensuring that our degrees are recognized nationally and internationally.
              </p>
              <p>
                The university is also a member of the Association of African Universities (AAU) and maintains partnerships with various institutions worldwide for academic collaboration and student exchange programs.
              </p>
            </ContentSection>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
