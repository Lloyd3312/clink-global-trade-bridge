import { Button } from "@/components/ui/button";
import { 
  Globe, 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Facebook, 
  Twitter,
  MessageCircle
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Globe className="h-8 w-8 text-primary-light" />
              <div>
                <div className="font-bold text-lg text-background">CLINK</div>
                <div className="text-xs text-background/70">GLOBAL SERVICES</div>
              </div>
            </div>
            <p className="text-background/80 text-sm">
              Your trusted Turkish export partner, connecting international buyers 
              with high-quality products from verified suppliers across Turkey.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-background/70 hover:text-primary-light hover:bg-background/10">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-background/70 hover:text-primary-light hover:bg-background/10">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-background/70 hover:text-primary-light hover:bg-background/10">
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-background mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/about" 
                  className="text-background/80 hover:text-primary-light transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/products" 
                  className="text-background/80 hover:text-primary-light transition-colors text-sm"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link 
                  to="/how-it-works" 
                  className="text-background/80 hover:text-primary-light transition-colors text-sm"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link 
                  to="/quote" 
                  className="text-background/80 hover:text-primary-light transition-colors text-sm"
                >
                  Get Quote
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-background/80 hover:text-primary-light transition-colors text-sm"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold text-background mb-4">Our Products</h3>
            <ul className="space-y-3">
              <li className="text-background/80 text-sm">Steel & Iron</li>
              <li className="text-background/80 text-sm">Industrial Machinery</li>
              <li className="text-background/80 text-sm">Furniture & Fabrics</li>
              <li className="text-background/80 text-sm">Doors (Bulletproof)</li>
              <li className="text-background/80 text-sm">Baby Things & Wears</li>
              <li className="text-background/80 text-sm">Ceramics & POP</li>
              <li className="text-background/80 text-sm">Solar Panels</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-background mb-4">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-primary-light mt-1" />
                <div>
                  <p className="text-background/80 text-sm">Istanbul, Turkey</p>
                  <p className="text-background/60 text-xs">Export Operations Center</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary-light" />
                <a 
                  href="tel:+905395815283" 
                  className="text-background/80 hover:text-primary-light transition-colors text-sm"
                >
                  +90 539 581 5283
                </a>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary-light" />
                <a 
                  href="mailto:info@clinkglobal.com" 
                  className="text-background/80 hover:text-primary-light transition-colors text-sm"
                >
                  info@clinkglobal.com
                </a>
              </div>

              <div className="flex items-center gap-3">
                <MessageCircle className="h-4 w-4 text-primary-light" />
                <a 
                  href="https://wa.me/905395815283" 
                  className="text-background/80 hover:text-primary-light transition-colors text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp Chat
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-background/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-background/60 text-sm">
              © 2024 Clink Global Services. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link 
                to="/privacy" 
                className="text-background/60 hover:text-primary-light transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms" 
                className="text-background/60 hover:text-primary-light transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;