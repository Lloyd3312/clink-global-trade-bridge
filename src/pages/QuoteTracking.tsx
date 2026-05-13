import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  CheckCircle, 
  Clock, 
  Package, 
  Truck,
  Search,
  MessageCircle,
  Phone,
  AlertCircle,
  FileText,
  Download,
  CreditCard,
  CheckCircle2,
  Loader2
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Tables } from "@/integrations/supabase/types";

const statusSteps = [
  { id: 'enquiry', label: 'Enquiry Received', icon: Clock, description: 'Your quote request has been received' },
  { id: 'requirements', label: 'Share Requirements', icon: CheckCircle, description: 'Detailed requirements gathering' },
  { id: 'logistics', label: 'Arrange Logistics & Shipping', icon: Package, description: 'Planning shipping and logistics' },
  { id: 'delivery', label: 'Delivery Confirmation', icon: Truck, description: 'Final delivery confirmation' }
];

const QuoteTracking = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [quoteData, setQuoteData] = useState<Tables<'quotes'> | null>(null);
  const [attachments, setAttachments] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [searchRef, setSearchRef] = useState(searchParams.get('ref') || '');
  const [loading, setLoading] = useState(false);
  const [payingId, setPayingId] = useState<string | null>(null);

  useEffect(() => {
    const ref = searchParams.get('ref');
    const sessionId = searchParams.get('session_id');
    if (ref) {
      setSearchRef(ref);
      loadQuoteData(ref).then(() => {
        if (sessionId) verifyPayment(sessionId, ref);
      });
    }
    if (searchParams.get('payment') === 'cancelled') {
      toast.info("Payment cancelled");
    }
    // eslint-disable-next-line
  }, [searchParams]);

  const verifyPayment = async (session_id: string, ref: string) => {
    const { data, error } = await supabase.functions.invoke('verify-stripe-payment', { body: { session_id } });
    if (!error && data?.paid) {
      toast.success("Payment received — thank you!");
      loadQuoteData(ref);
      const next = new URLSearchParams(searchParams);
      next.delete('session_id');
      setSearchParams(next, { replace: true });
    }
  };

  const loadQuoteData = async (refNumber: string) => {
    setLoading(true);
    const { data } = await supabase
      .from('quotes')
      .select('*')
      .eq('reference_number', refNumber)
      .maybeSingle();
    setQuoteData(data);
    if (data) {
      const [{ data: atts }, { data: hist }, { data: invs }] = await Promise.all([
        supabase.from('quote_attachments').select('*').eq('quote_id', data.id).order('created_at', { ascending: false }),
        supabase.from('quote_status_history').select('*').eq('quote_id', data.id).order('created_at', { ascending: true }),
        supabase.from('quote_invoices').select('*').eq('quote_id', data.id).order('created_at', { ascending: false }),
      ]);
      setAttachments(atts ?? []);
      setHistory(hist ?? []);
      setInvoices(invs ?? []);
    } else {
      setAttachments([]); setHistory([]); setInvoices([]);
    }
    setLoading(false);
  };

  const payWithCard = async (invoiceId: string) => {
    setPayingId(invoiceId);
    try {
      const { data, error } = await supabase.functions.invoke('create-stripe-checkout', {
        body: { invoice_id: invoiceId, origin: window.location.origin },
      });
      if (error || !data?.url) throw new Error(error?.message || 'Failed to start checkout');
      window.location.href = data.url;
    } catch (e: any) {
      toast.error(e.message);
      setPayingId(null);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-ocean-blue/5">
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
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={handleSearch} disabled={loading}>
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {searchRef && !loading && (
        <section className="pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {quoteData ? (
              <>
                <Card className="mb-8">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>Quote #{quoteData.reference_number}</CardTitle>
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
                        <p>{new Date(quoteData.created_at).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="font-medium text-muted-foreground">Last Updated</p>
                        <p>{new Date(quoteData.updated_at).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="font-medium text-muted-foreground">Email</p>
                        <p>{quoteData.email}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

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
                              <p className="text-sm text-muted-foreground">{step.description}</p>
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

                {invoices.length > 0 && (
                  <Card className="mb-8 border-primary/30">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2"><CreditCard className="h-5 w-5 text-primary" />Consultation Invoices</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {invoices.map((inv) => {
                        const paid = inv.status !== 'pending';
                        return (
                          <div key={inv.id} className="p-4 border rounded-lg space-y-3">
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <p className="text-2xl font-bold">{inv.currency} {Number(inv.amount).toFixed(2)}</p>
                                {inv.notes && <p className="text-sm text-muted-foreground mt-1">{inv.notes}</p>}
                                <p className="text-xs text-muted-foreground mt-1">Issued {new Date(inv.created_at).toLocaleDateString()}</p>
                              </div>
                              {paid ? (
                                <Badge className="bg-success-green text-white">
                                  <CheckCircle2 className="h-3 w-3 mr-1" />Paid
                                </Badge>
                              ) : (
                                <Badge variant="secondary">Pending payment</Badge>
                              )}
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {inv.pdf_url && (
                                <Button variant="outline" size="sm" asChild>
                                  <a href={inv.pdf_url} target="_blank" rel="noopener noreferrer">
                                    <Download className="h-4 w-4 mr-1" />Invoice PDF
                                  </a>
                                </Button>
                              )}
                              {!paid && (
                                <Button size="sm" onClick={() => payWithCard(inv.id)} disabled={payingId === inv.id}>
                                  {payingId === inv.id
                                    ? <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                                    : <CreditCard className="h-4 w-4 mr-1" />}
                                  Pay with Card
                                </Button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </CardContent>
                  </Card>
                )}

                {attachments.length > 0 && (
                  <Card className="mb-8">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5" />Quotation Documents</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {attachments.map((a) => (
                        <a key={a.id} href={a.url} target="_blank" rel="noopener noreferrer"
                           className="flex items-center justify-between p-3 border rounded-lg hover:bg-secondary/50 transition">
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-primary" />
                            <div>
                              <p className="font-medium text-sm">{a.file_name || "Quotation"}</p>
                              {a.notes && <p className="text-xs text-muted-foreground">{a.notes}</p>}
                              <p className="text-xs text-muted-foreground">{new Date(a.created_at).toLocaleString()}</p>
                            </div>
                          </div>
                          <Download className="h-4 w-4 text-muted-foreground" />
                        </a>
                      ))}
                    </CardContent>
                  </Card>
                )}

                {history.length > 0 && (
                  <Card className="mb-8">
                    <CardHeader>
                      <CardTitle>Updates from our team</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {history.map((h) => (
                        <div key={h.id} className="border-l-2 border-primary pl-4 py-1">
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">{statusSteps.find(s => s.id === h.status)?.label || h.status}</Badge>
                            <span className="text-xs text-muted-foreground">{new Date(h.created_at).toLocaleString()}</span>
                          </div>
                          {h.notes && <p className="text-sm mt-1">{h.notes}</p>}
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardHeader>
                    <CardTitle>Need Help?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button variant="outline" size="lg" asChild>
                        <a href="https://wa.me/905395815283" target="_blank" rel="noopener noreferrer">
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
            ) : (
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
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default QuoteTracking;
