import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  Copy, 
  MessageCircle, 
  ArrowRight,
  Clock,
  Building,
  Send
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

const QuoteConfirmation = () => {
  const [searchParams] = useSearchParams();
  const [quoteData, setQuoteData] = useState<Tables<'quotes'> | null>(null);
  const { toast } = useToast();
  const refNumber = searchParams.get('ref');

  useEffect(() => {
    if (refNumber) {
      supabase
        .from('quotes')
        .select('*')
        .eq('reference_number', refNumber)
        .single()
        .then(({ data }) => {
          if (data) setQuoteData(data);
        });
    }
  }, [refNumber]);

  const copyReferenceNumber = () => {
    if (refNumber) {
      navigator.clipboard.writeText(refNumber);
      toast({
        title: "Reference number copied!",
        description: "You can use this reference to track your quote status.",
      });
    }
  };

  if (!quoteData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              Quote not found. Please check your reference number.
            </p>
            <div className="text-center mt-4">
              <Button asChild>
                <Link to="/quote">Submit New Quote</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-ocean-blue/5">
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <CheckCircle className="h-16 w-16 text-success-green mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Quote Submitted Successfully!
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Thank you for your interest in Turkish products. Your quote request has been received.
            </p>
          </div>

          <Card className="inline-block mb-8">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Your Reference Number</p>
                <div className="flex items-center gap-2 justify-center">
                  <Badge variant="outline" className="text-lg font-mono px-4 py-2">
                    {quoteData.reference_number}
                  </Badge>
                  <Button variant="ghost" size="sm" onClick={copyReferenceNumber}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Save this reference number to track your quote status
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Quote Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Company</p>
                  <p className="font-medium">{quoteData.company}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Contact Person</p>
                  <p className="font-medium">{quoteData.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p className="font-medium">{quoteData.email}</p>
                </div>
                {quoteData.phone && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Phone</p>
                    <p className="font-medium">{quoteData.phone}</p>
                  </div>
                )}
                {quoteData.country && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Delivery Country</p>
                    <p className="font-medium">{quoteData.country}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <Badge variant="secondary">
                    <Clock className="h-3 w-3 mr-1" />
                    Enquiry Received
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>What Happens Next?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-success-green" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium">1. Review & Contact</h4>
                      <p className="text-sm text-muted-foreground">
                        We review your requirements and contact you within 24 hours.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 bg-muted rounded-full flex items-center justify-center">
                        <Building className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium">2. Supplier Sourcing</h4>
                      <p className="text-sm text-muted-foreground">
                        Our team identifies the best Turkish suppliers for your needs.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 bg-muted rounded-full flex items-center justify-center">
                        <Send className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium">3. Detailed Quote</h4>
                      <p className="text-sm text-muted-foreground">
                        Receive comprehensive pricing and delivery terms.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="cta" size="lg" asChild>
                <Link to={`/quote-tracking?ref=${quoteData.reference_number}`}>
                  Track Quote Status
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a 
                  href="https://wa.me/905395815283" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Contact on WhatsApp
                </a>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Need immediate assistance? Contact us directly on WhatsApp
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default QuoteConfirmation;
