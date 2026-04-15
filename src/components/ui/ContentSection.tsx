import { ReactNode } from "react";

interface ContentSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

const ContentSection = ({ title, children, className = "" }: ContentSectionProps) => {
  return (
    <div className={`bg-card rounded-xl border border-border p-6 md:p-8 ${className}`}>
      <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4 font-serif">
        {title}
      </h2>
      <div className="text-muted-foreground leading-relaxed">
        {children}
      </div>
    </div>
  );
};

export default ContentSection;
