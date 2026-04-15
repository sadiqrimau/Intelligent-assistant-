import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const newsItems = [
  {
    id: 1,
    title: "2024/2025 Admission Exercise Now Open",
    excerpt: "Applications are now being accepted for undergraduate and postgraduate programs. Apply before the deadline to secure your spot.",
    date: "January 10, 2025",
    category: "Admissions",
  },
  {
    id: 2,
    title: "University Convocation Ceremony Announced",
    excerpt: "The 15th Convocation Ceremony is scheduled for March 2025. All graduating students should prepare their clearance documents.",
    date: "January 8, 2025",
    category: "Events",
  },
  {
    id: 3,
    title: "New Research Grant Awarded to Engineering Faculty",
    excerpt: "The Faculty of Engineering has received a major research grant for renewable energy research in collaboration with international partners.",
    date: "January 5, 2025",
    category: "Research",
  },
  {
    id: 4,
    title: "Student Union Week Activities Begin",
    excerpt: "Join us for a week of exciting activities including sports competitions, cultural displays, and academic symposiums.",
    date: "January 3, 2025",
    category: "Campus Life",
  },
];

const NewsSection = () => {
  return (
    <section className="content-section bg-muted/50">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <div>
            <h2 className="section-title mb-2">Latest News & Announcements</h2>
            <p className="text-muted-foreground">
              Stay updated with the latest happenings at Al-Hikmah University
            </p>
          </div>
          <Link
            to="#"
            className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all duration-200"
          >
            View all news
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {newsItems.map((item) => (
            <article
              key={item.id}
              className="bg-card rounded-xl overflow-hidden border border-border card-hover group"
            >
              {/* Category Badge */}
              <div className="p-4 pb-0">
                <span className="inline-block bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full">
                  {item.category}
                </span>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 font-serif group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {item.excerpt}
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>{item.date}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
