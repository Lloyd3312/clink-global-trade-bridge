import { useEffect, useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import {
  GraduationCap,
  BookOpen,
  Award,
  Wallet,
  FileCheck,
  Plane,
  Globe2,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import StudySupportCards from "@/components/StudySupportCards";

const benefits = [
  {
    icon: BookOpen,
    title: "English & Turkish Programmes",
    text: "A wide selection of English- and Turkish-taught programmes across every discipline.",
  },
  {
    icon: Wallet,
    title: "Competitive Tuition Fees",
    text: "Affordable options compared to many European and North American universities.",
  },
  {
    icon: Globe2,
    title: "International Environment",
    text: "Diverse student communities from Africa, Asia, Europe, and the Middle East.",
  },
  {
    icon: GraduationCap,
    title: "Universities Nationwide",
    text: "Access to institutions in Istanbul, Ankara, Izmir, Antalya, Bursa, and more.",
  },
];

const services = [
  {
    id: "university-selection",
    icon: BookOpen,
    title: "University Selection",
    text: "We help you shortlist universities and programmes that match your qualifications, career goals, preferred city, and budget — based on official published requirements.",
  },
  {
    id: "application-support",
    icon: FileCheck,
    title: "Application Support",
    text: "Step-by-step help with online application forms, document uploads, submission, and post-submission follow-up until an admission decision is issued.",
  },
  {
    id: "affordable-universities",
    icon: Wallet,
    title: "Affordable Universities",
    text: "Discover recognised universities with competitive tuition, flexible payment structures, and reasonable initial deposits suitable for international students.",
  },
  {
    id: "scholarships",
    icon: Award,
    title: "Scholarships",
    text: "Guidance on merit-based tuition discounts, university-issued scholarships, and government programmes. Awards depend on eligibility and the institution's decision.",
  },
  {
    id: "deposit-support",
    icon: CheckCircle2,
    title: "Deposit & Admission Support",
    text: "We guide you through the university's official initial tuition-deposit process and proof-of-payment submission. Payments completed through authorised channels inside Türkiye may sometimes be processed faster, depending on the university.",
  },
  {
    id: "visa-guidance",
    icon: Plane,
    title: "Visa Application Guidance",
    text: "Personalised checklist for admission documents, appointment preparation, and the student-visa application process at the relevant Turkish consulate.",
  },
];

const steps = [
  {
    n: 1,
    title: "Free Consultation",
    text: "We discuss your qualifications, programme preference, budget, and preferred city.",
  },
  {
    n: 2,
    title: "University Shortlist",
    text: "We recommend suitable universities and programmes based on the information you provide.",
  },
  {
    n: 3,
    title: "Document Preparation",
    text: "We help you prepare and organise the required application documents.",
  },
  {
    n: 4,
    title: "Application & Deposit Support",
    text: "We guide you through submission, admission follow-up, and the university's official initial-deposit process.",
  },
  {
    n: 5,
    title: "Visa Preparation",
    text: "After admission, we provide a personalised checklist and practical guidance for student-visa preparation.",
  },
];

const documents = [
  "International passport",
  "Passport photograph",
  "Secondary-school or university certificate",
  "Academic transcript",
  "Language test result, where required",
  "Motivation letter, where required",
  "Additional programme-specific documents",
];

const faqs = [
  {
    q: "Is the initial consultation free?",
    a: "Yes. The first consultation and general university guidance are provided without a consultation fee.",
  },
  {
    q: "Can you guarantee university admission?",
    a: "No. Admission decisions are made by the university. We help applicants select suitable institutions and submit complete applications.",
  },
  {
    q: "Can you guarantee a scholarship?",
    a: "No. Scholarships depend on availability, eligibility, academic performance, and the institution's final decision.",
  },
  {
    q: "Can you guarantee a Turkish student visa?",
    a: "No. Visa decisions are made by the relevant Turkish consulate or government authority.",
  },
  {
    q: "How long does admission processing take?",
    a: "Processing can range from approximately 24 hours to several working days or longer, depending on the university, application completeness, payment method, and verification requirements.",
  },
  {
    q: "Do you assist with tuition deposits?",
    a: "Yes. We guide students through the university's official payment instructions and proof-of-payment process. We do not accept payments into personal accounts unless this is legally authorised, clearly documented, and supported by an official agreement.",
  },
];

const StudyInTurkiye = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    whatsapp: "",
    nationality: "",
    residence: "",
    qualification: "",
    studyLevel: "",
    programme: "",
    city: "",
    budget: "",
    intake: "",
    message: "",
    consent: false,
  });

  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Study in Türkiye | Free University Consultation | Clink Global";
    const meta =
      document.querySelector('meta[name="description"]') ||
      (() => {
        const m = document.createElement("meta");
        m.setAttribute("name", "description");
        document.head.appendChild(m);
        return m;
      })();
    const prevDesc = meta.getAttribute("content");
    meta.setAttribute(
      "content",
      "Get free guidance for studying in Türkiye, including university selection, affordable programmes, scholarship searches, application support, tuition-deposit guidance, and student-visa preparation.",
    );

    // Smooth-scroll to anchor if present
    if (window.location.hash) {
      const el = document.getElementById(window.location.hash.slice(1));
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
    }

    return () => {
      document.title = prevTitle;
      if (prevDesc) meta.setAttribute("content", prevDesc);
    };
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.consent) {
      toast({
        title: "Please confirm the acknowledgement",
        description:
          "You must acknowledge that admission, scholarship, and visa decisions are made by the relevant authorities.",
        variant: "destructive",
      });
      return;
    }
    if (!form.fullName || !form.email) {
      toast({
        title: "Missing details",
        description: "Full name and email address are required.",
        variant: "destructive",
      });
      return;
    }

    const body = [
      `Full name: ${form.fullName}`,
      `Email: ${form.email}`,
      `WhatsApp: ${form.whatsapp}`,
      `Nationality: ${form.nationality}`,
      `Country of residence: ${form.residence}`,
      `Highest qualification: ${form.qualification}`,
      `Preferred study level: ${form.studyLevel}`,
      `Preferred programme: ${form.programme}`,
      `Preferred city: ${form.city}`,
      `Estimated budget: ${form.budget}`,
      `Intended intake: ${form.intake}`,
      "",
      "Message:",
      form.message,
      "",
      "— I understand that admission, scholarship, and visa decisions are made solely by the relevant university and government authorities.",
    ].join("\n");

    const mailto = `mailto:clinkglobalservice@gmail.com?subject=${encodeURIComponent(
      "Study in Türkiye — Free Consultation Request",
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;

    toast({
      title: "Consultation request prepared",
      description:
        "Your email app will open with the details. Send it and we'll respond within one working day.",
    });
  };

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1800&q=75"
            alt="Diverse international students on a Turkish university campus"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/70 to-foreground/40" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-white">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 backdrop-blur px-3 py-1 text-xs font-medium mb-6">
              <GraduationCap className="h-4 w-4" />
              Study in Türkiye
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display leading-tight mb-5">
              Your Journey to a Turkish University Starts Here
            </h1>
            <p className="text-lg text-white/90 mb-8 leading-relaxed">
              Free initial consultation for international students seeking
              reliable guidance on universities, affordable programmes,
              scholarships, applications, tuition deposits, and student-visa
              preparation.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="cta" size="lg" asChild>
                <a href="#consultation-form" className="inline-flex items-center gap-2">
                  Book a Free Consultation <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button
                variant="cta-outline"
                size="lg"
                asChild
                className="bg-white/10 backdrop-blur border-white/40 text-white hover:bg-white/20"
              >
                <a
                  href="https://injazportal.qk-dev.com/dashboard/universities"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  Browse Universities & Programmes <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button
                variant="cta-outline"
                size="lg"
                asChild
                className="bg-white/10 backdrop-blur border-white/40 text-white hover:bg-white/20"
              >
                <a href="#our-services">View Our Services</a>
              </Button>
            </div>
            <p className="text-xs text-white/70 mt-3">
              University catalogue is powered by our partner portal (Injaz). Opens in a new tab.
            </p>
          </div>
        </div>
      </section>

      {/* Why Study in Türkiye */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-3">
              Why Study in Türkiye?
            </h2>
            <p className="text-muted-foreground">
              A globally-connected education at a fraction of the cost of many
              other destinations.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <Card key={b.title} className="border-border/60">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-2">
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-lg">{b.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{b.text}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section id="our-services" className="py-20 bg-secondary/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-3">
              Our Services
            </h2>
            <p className="text-muted-foreground">
              Complete guidance from first enquiry to student-visa preparation.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.id}
                  id={s.id}
                  className="scroll-mt-24 bg-card rounded-2xl p-6 border border-border/60 hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold font-display mb-2">
                    {s.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {s.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-3">
              How It Works
            </h2>
            <p className="text-muted-foreground">
              A simple five-step process from enquiry to arrival.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {steps.map((s) => (
              <div
                key={s.n}
                className="relative bg-card rounded-2xl p-6 border border-border/60 hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl font-bold font-display text-primary/30 mb-2">
                  {String(s.n).padStart(2, "0")}
                </div>
                <h3 className="font-bold mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documents */}
      <section className="py-20 bg-secondary/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
              Document Checklist
            </h2>
            <p className="text-muted-foreground mb-4">
              A general list of what most Turkish universities request.
              Requirements vary by university, programme, nationality, and level
              of study.
            </p>
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 text-sm text-foreground/80 leading-relaxed">
              <strong className="text-foreground">Processing times:</strong>{" "}
              University processing times vary. In some cases, applications and
              locally confirmed tuition-deposit payments may be processed within
              approximately 24 hours. International bank transfers and document
              verification may take between one and seven working days or
              longer. These timelines are estimates, not guarantees.
            </div>
          </div>
          <ul className="space-y-3 bg-card border border-border/60 rounded-2xl p-6">
            {documents.map((d) => (
              <li key={d} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm">{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Consultation form */}
      <section id="consultation-form" className="py-20 scroll-mt-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-3">
              Request a Free Consultation
            </h2>
            <p className="text-muted-foreground">
              Share a few details and we'll come back to you with a personalised
              plan.
            </p>
          </div>
          <Card className="border-border/60">
            <CardContent className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="fullName">Full name *</Label>
                  <Input
                    id="fullName"
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="whatsapp">WhatsApp number</Label>
                  <Input
                    id="whatsapp"
                    value={form.whatsapp}
                    onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="nationality">Nationality</Label>
                  <Input
                    id="nationality"
                    value={form.nationality}
                    onChange={(e) => setForm({ ...form, nationality: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="residence">Current country of residence</Label>
                  <Input
                    id="residence"
                    value={form.residence}
                    onChange={(e) => setForm({ ...form, residence: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="qualification">Highest qualification</Label>
                  <Input
                    id="qualification"
                    value={form.qualification}
                    onChange={(e) => setForm({ ...form, qualification: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="studyLevel">Preferred study level</Label>
                  <Select
                    value={form.studyLevel}
                    onValueChange={(v) => setForm({ ...form, studyLevel: v })}
                  >
                    <SelectTrigger id="studyLevel">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Foundation">Foundation</SelectItem>
                      <SelectItem value="Associate degree">Associate degree</SelectItem>
                      <SelectItem value="Bachelor's degree">Bachelor's degree</SelectItem>
                      <SelectItem value="Master's degree">Master's degree</SelectItem>
                      <SelectItem value="PhD">PhD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="programme">Preferred programme</Label>
                  <Input
                    id="programme"
                    value={form.programme}
                    onChange={(e) => setForm({ ...form, programme: e.target.value })}
                    placeholder="e.g. Computer Engineering"
                  />
                </div>
                <div>
                  <Label htmlFor="city">Preferred city</Label>
                  <Input
                    id="city"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    placeholder="Istanbul, Ankara…"
                  />
                </div>
                <div>
                  <Label htmlFor="budget">Estimated budget</Label>
                  <Input
                    id="budget"
                    value={form.budget}
                    onChange={(e) => setForm({ ...form, budget: e.target.value })}
                    placeholder="Annual tuition budget"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="intake">Intended intake</Label>
                  <Input
                    id="intake"
                    value={form.intake}
                    onChange={(e) => setForm({ ...form, intake: e.target.value })}
                    placeholder="e.g. Fall 2026"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us anything else that will help us guide you."
                  />
                </div>

                <div className="md:col-span-2 flex items-start gap-3 rounded-xl border border-border p-4 bg-secondary/40">
                  <Checkbox
                    id="consent"
                    checked={form.consent}
                    onCheckedChange={(v) => setForm({ ...form, consent: v === true })}
                  />
                  <Label htmlFor="consent" className="text-sm font-normal leading-relaxed cursor-pointer">
                    I understand that admission, scholarship, and visa decisions
                    are made solely by the relevant university and government
                    authorities.
                  </Label>
                </div>

                <div className="md:col-span-2 flex flex-wrap gap-3 pt-2">
                  <Button type="submit" variant="cta" size="lg">
                    Request Free Consultation
                  </Button>
                  <Button type="button" variant="cta-outline" size="lg" asChild>
                    <a
                      href="https://wa.me/905395815283?text=Hello%20Clink%20Global%2C%20I%27d%20like%20a%20free%20Study-in-T%C3%BCrkiye%20consultation."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2"
                    >
                      <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
                    </a>
                  </Button>
                </div>
              </form>

              <p className="text-xs text-muted-foreground mt-6 leading-relaxed">
                Clink Global Trade Bridge is an independent consultation and
                support service. University admission, scholarship awards,
                payment confirmation, and visa decisions are controlled by the
                relevant institutions and authorities. Information provided on
                this website does not constitute a guarantee of admission or
                visa approval.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-secondary/40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-3">
              Frequently Asked Questions
            </h2>
          </div>
          <Accordion type="single" collapsible className="bg-card rounded-2xl border border-border/60 px-4">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`}>
                <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Support cards reused */}
      <StudySupportCards />
    </div>
  );
};

export default StudyInTurkiye;
