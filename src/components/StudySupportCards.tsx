import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import scholarshipGraduate from "@/assets/scholarship-graduate.jpg";

const cards = [
  {
    title: "University Selection",
    description:
      "Get guidance on universities and programmes that match your academic background, career goals, and budget.",
    href: "/study-in-turkiye#university-selection",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=70",
    alt: "International students on a modern Turkish university campus",
  },
  {
    title: "Application Support",
    description:
      "Step-by-step assistance with application forms, document preparation, submission, and admission follow-up.",
    href: "/study-in-turkiye#application-support",
    image:
      "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&w=1200&q=70",
    alt: "Student completing an online university application",
  },
  {
    title: "Affordable Universities",
    description:
      "Discover recognised universities and programmes with competitive tuition fees and manageable initial deposits.",
    href: "/study-in-turkiye#affordable-universities",
    image:
      "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=1200&q=70",
    alt: "Happy international students studying together",
  },
  {
    title: "Scholarships",
    description:
      "Explore available scholarship opportunities, tuition discounts, and merit-based funding options.",
    href: "/study-in-turkiye#scholarships",
    image: scholarshipGraduate,
    alt: "Graduating student holding a certificate",
  },
  {
    title: "Deposit & Admission Support",
    description:
      "Guidance on safely completing a university's required initial tuition deposit and submitting proof of payment through authorised channels.",
    href: "/study-in-turkiye#deposit-support",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=70",
    alt: "Secure online tuition payment consultation",
  },
  {
    title: "Visa Application Guidance",
    description:
      "Practical support with admission documents, visa checklists, appointment preparation, and the student-visa application process.",
    href: "/study-in-turkiye#visa-guidance",
    image:
      "https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?auto=format&fit=crop&w=1200&q=70",
    alt: "International student holding a passport and university documents",
  },
];

const StudySupportCards = () => {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 font-display">
            How We Support Your Journey
          </h2>
          <p className="text-muted-foreground">
            End-to-end guidance for international students planning to study in Türkiye.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <Link
              key={card.title}
              to={card.href}
              className="group relative overflow-hidden rounded-2xl border border-border/60 shadow-[0_1px_2px_hsla(0_0%_0%/0.04),0_4px_16px_hsla(0_0%_0%/0.05)] hover:shadow-[0_8px_28px_hsla(14_72%_52%/0.18)] transition-all duration-500 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary animate-fade-in"
              style={{ animationDelay: `${i * 90}ms`, animationFillMode: "backwards" }}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={card.image}
                  alt={card.alt}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-foreground/10" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                  <h3 className="text-xl font-bold font-display mb-2 leading-tight">
                    {card.title}
                  </h3>
                  <p className="text-sm text-white/90 mb-3 line-clamp-3">
                    {card.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary-light group-hover:gap-2 transition-all">
                    Learn More
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudySupportCards;
