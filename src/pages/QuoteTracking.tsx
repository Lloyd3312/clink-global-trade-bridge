import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  CheckCircle, 
  Clock, 
  Package, 
  Truck,
  Search,
  MessageCircle,
  Phone,
  ArrowRight,
  AlertCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface QuoteData {
  referenceNumber: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  products: string[];
  customProduct: string;
  quantity: string;
  specifications: string;
  deliveryTimeline: string;
  budget: string;
  additionalInfo: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  statusHistory?: Array<{
    status: string;
    timestamp: string;
    notes?: string;
  }>;
}

const QuoteTracking = () => {
  const [searchParams] = useSearchParams();
  const [quoteData, setQuoteData] = useState<QuoteData | null>(null);
  const [searchRef, setSearchRef] = useState(searchParams.get('ref') || '');
  const { toast } = useToast();

  const statusSteps = [
    { id: 'enquiry', label: 'Enquiry Received', icon: Clock, description: 'Your quote request has been received' },
    { id: 'requirements', label: 'Share Requirements', icon: CheckCircle, description: 'Detailed requirements gathering' },
    { id: 'logistics', label: 'Arrange Logistics & Shipping', icon: Package, description: 'Planning shipping and logistics' },
    { id: 'delivery', label: 'Delivery Confirmation', icon: Truck, description: 'Final delivery confirmation' }
  ];

  useEffect(() => {
    if (searchRef) {
      loadQuoteData(searchRef);
    }
  }, [searchRef]);

  const loadQuoteData = (refNumber: string) => {
    const storedData = localStorage.getItem(`quote_${refNumber}`);
    if (storedData) {
      setQuoteData(JSON.parse(storedData));
    } else {
      setQuoteData(null);
    }
  };

  const handleSearch = () => {
    if (searchRef.trim()) {
      loadQuoteData(searchRef.trim());
    }
  };

  const getCurrentStepIndex = () => {
    if (!quoteData) return 0;
    return statusSteps.findIndex(step => step.id === quoteData.status);
  };

  const updateQuoteStatus = () => {
    if (!quoteData || !newStatus) return;

    const updatedQuote = {
      ...quoteData,
      status: newStatus,
      updatedAt: new Date().toISOString(),
      statusHistory: [
        ...(quoteData.statusHistory || []),
        {
          status: newStatus,
          timestamp: new Date().toISOString(),
          notes: statusNotes
        }
      ]
    };

    localStorage.setItem(`quote_${quoteData.referenceNumber}`, JSON.stringify(updatedQuote));
    setQuoteData(updatedQuote);
    setNewStatus('');
    setStatusNotes('');

    toast({
      title: "Status updated successfully",
      description: `Quote status changed to ${statusSteps.find(s => s.id === newStatus)?.label}`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-ocean-blue/5">
      {/* Header */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Track Your Quote
            </h1>
            <p className="text-xl text-muted-foreground">
              Enter your reference number to check the status of your quote request.
            </p>
          </div>

          {/* Search */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="refNumber">Reference Number</Label>
                  <Input
                    id="refNumber"
                    value={searchRef}
                    onChange={(e) => setSearchRef(e.target.value)}
                    placeholder="Enter your reference number (e.g., CG123456ABC)"
                    className="mt-1"
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={handleSearch}>
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Results */}
      {searchRef && (
        <section className="pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {quoteData ? (
              <>
                {/* Quote Info */}
                <Card className="mb-8">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>Quote #{quoteData.referenceNumber}</CardTitle>
                        <p className="text-muted-foreground">{quoteData.company} - {quoteData.name}</p>
                      </div>
                      <Badge variant="secondary">
                        {statusSteps.find(s => s.id === quoteData.status)?.label || 'Unknown Status'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-muted-foreground">Submitted</p>
                        <p>{new Date(quoteData.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="font-medium text-muted-foreground">Last Updated</p>
                        <p>{new Date(quoteData.updatedAt).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="font-medium text-muted-foreground">Email</p>
                        <p>{quoteData.email}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Status Timeline */}
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle>Quote Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {statusSteps.map((step, index) => {
                        const currentStep = getCurrentStepIndex();
                        const isCompleted = index < currentStep;
                        const isCurrent = index === currentStep;
                        const isPending = index > currentStep;

                        return (
                          <div key={step.id} className="flex gap-4">
                            <div className="flex-shrink-0">
                              <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                                isCompleted ? 'bg-success-green text-white' :
                                isCurrent ? 'bg-primary text-primary-foreground' :
                                'bg-muted text-muted-foreground'
                              }`}>
                                <step.icon className="h-5 w-5" />
                              </div>
                            </div>
                            <div className="flex-1">
                              <h4 className={`font-medium ${
                                isCompleted || isCurrent ? 'text-foreground' : 'text-muted-foreground'
                              }`}>
                                {step.label}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {step.description}
                              </p>
                              {isCurrent && (
                                <Badge variant="secondary" className="mt-1">
                                  <Clock className="h-3 w-3 mr-1" />
                                  In Progress
                                </Badge>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>


                {/* Contact Options */}
                <Card>
                  <CardHeader>
                    <CardTitle>Need Help?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button variant="outline" size="lg" asChild>
                        <a 
                          href="https://wa.me/905395815283" 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <MessageCircle className="h-5 w-5 mr-2" />
                          WhatsApp Support
                        </a>
                      </Button>
                      <Button variant="outline" size="lg" asChild>
                        <a href="tel:+905395815283">
                          <Phone className="h-5 w-5 mr-2" />
                          Call Us
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : searchRef ? (
              <Card>
                <CardContent className="pt-6 text-center">
                  <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-medium mb-2">Quote Not Found</h3>
                  <p className="text-muted-foreground mb-4">
                    We couldn't find a quote with reference number "{searchRef}". 
                    Please check the number and try again.
                  </p>
                  <Button variant="outline" onClick={() => setSearchRef('')}>
                    Try Again
                  </Button>
                </CardContent>
              </Card>
            ) : null}
          </div>
        </section>
      )}
    </div>
  );
};

export default QuoteTracking;