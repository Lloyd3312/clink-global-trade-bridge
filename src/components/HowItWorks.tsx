import howSubmitRequest from "@/assets/how-submit-request.jpg";
import howSourceVerify from "@/assets/how-source-verify.jpg";
import howNegotiate from "@/assets/how-negotiate.jpg";
import howLogistics from "@/assets/how-logistics.jpg";
import howDelivery from "@/assets/how-delivery.jpg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function HowItWorks() {
  const steps = [
    ["Submit Request", "Share your products, quantities and destination.", howSubmitRequest],
    ["Source & Verify", "We identify suppliers and check your requirements.", howSourceVerify],
    ["Negotiate & Confirm", "Review pricing, specifications and agreed terms.", howNegotiate],
    ["Logistics & Shipping", "We coordinate export documentation and transport.", howLogistics],
    ["Delivery", "Follow your order through to its destination.", howDelivery],
  ];
  return <section className="py-14 md:py-20 border-t border-border bg-secondary/20"><div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
    <p className="text-primary text-xs uppercase mb-3">A clear process</p><h2 className="text-3xl md:text-4xl font-semibold mb-9">From enquiry to delivery.</h2>
    <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">{steps.map(([title,copy,image],i) => <div key={title}><img src={image} alt={title} loading="lazy" width={320} height={220} className="w-full aspect-[3/2] object-cover rounded-md mb-5" /><span className="text-primary text-xs">0{i+1}</span><h3 className="font-semibold mt-2 mb-2">{title}</h3><p className="text-sm text-muted-foreground leading-relaxed">{copy}</p></div>)}</div>
    <div className="mt-9"><Button variant="cta-outline" asChild><Link to="/how-it-works">Our Export Process</Link></Button></div>
  </div></section>;
}
