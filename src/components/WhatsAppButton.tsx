import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WhatsAppButton = () => {
  const whatsappNumber = "+905395815283";
  const whatsappMessage = "Hello! I'm interested in your Turkish export services. Could you please provide more information?";
  
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\+/g, '')}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
      {/* WhatsApp Button */}
      <Button
        size="lg"
        className="bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full p-4 group"
        onClick={() => window.open(whatsappUrl, '_blank')}
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle className="h-6 w-6 group-hover:scale-110 transition-transform" />
        <span className="hidden sm:inline ml-2">WhatsApp</span>
      </Button>
      
      {/* Phone Number Display */}
      <div className="bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1 text-sm text-foreground shadow-md border border-border/50">
        <a href={`tel:${whatsappNumber}`} className="hover:text-primary transition-colors">
          {whatsappNumber}
        </a>
      </div>
    </div>
  );
};

export default WhatsAppButton;