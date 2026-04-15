interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

const PageHeader = ({ title, subtitle }: PageHeaderProps) => {
  return (
    <section className="gradient-hero py-16 md:py-24">
      <div className="container-custom">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground font-serif animate-fade-in">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl animate-fade-in" style={{ animationDelay: "0.1s" }}>
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
};

export default PageHeader;
