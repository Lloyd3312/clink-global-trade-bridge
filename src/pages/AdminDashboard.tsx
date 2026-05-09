import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Clock, CheckCircle, Package, Truck, 
  Search, Eye, ArrowRight, LogIn, LogOut,
  LayoutDashboard
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Tables } from "@/integrations/supabase/types";
import QuoteAttachmentUploader from "@/components/QuoteAttachmentUploader";
import SampleRequestsAdmin from "@/components/SampleRequestsAdmin";

const statusSteps = [
  { id: 'enquiry', label: 'Enquiry Received', icon: Clock },
  { id: 'requirements', label: 'Share Requirements', icon: CheckCircle },
  { id: 'logistics', label: 'Arrange Logistics', icon: Package },
  { id: 'delivery', label: 'Delivery Confirmed', icon: Truck }
];

const AdminDashboard = () => {
  const [quotes, setQuotes] = useState<Tables<'quotes'>[]>([]);
  const [filteredQuotes, setFilteredQuotes] = useState<Tables<'quotes'>[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedQuote, setSelectedQuote] = useState<Tables<'quotes'> | null>(null);
  const [newStatus, setNewStatus] = useState('');
  const [statusNotes, setStatusNotes] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.onAuthStateChange((_, session) => {
      setIsAuthenticated(!!session);
      if (session) fetchQuotes();
      setLoading(false);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
      if (session) fetchQuotes();
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    let filtered = quotes;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(q => 
        q.reference_number.toLowerCase().includes(term) ||
        q.name.toLowerCase().includes(term) ||
        q.company.toLowerCase().includes(term) ||
        q.email.toLowerCase().includes(term)
      );
    }
    if (statusFilter !== 'all') {
      filtered = filtered.filter(q => q.status === statusFilter);
    }
    setFilteredQuotes(filtered);
  }, [quotes, searchTerm, statusFilter]);

  const fetchQuotes = async () => {
    const { data } = await supabase
      .from('quotes')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) {
      setQuotes(data);
      setFilteredQuotes(data);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast({ title: "Login failed", description: error.message, variant: "destructive" });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setQuotes([]);
    setFilteredQuotes([]);
  };

  const updateQuoteStatus = async () => {
    if (!selectedQuote || !newStatus) return;

    const { error } = await supabase
      .from('quotes')
      .update({ status: newStatus })
      .eq('id', selectedQuote.id);

    if (!error && statusNotes) {
      await supabase.from('quote_status_history').insert({
        quote_id: selectedQuote.id,
        status: newStatus,
        notes: statusNotes,
      });
    }

    if (error) {
      toast({ title: "Error updating status", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Status updated", description: `Changed to ${statusSteps.find(s => s.id === newStatus)?.label}` });
      setNewStatus('');
      setStatusNotes('');
      setSelectedQuote(null);
      fetchQuotes();
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'enquiry': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'requirements': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'logistics': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'delivery': return 'bg-green-100 text-green-800 border-green-200';
      default: return '';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-ocean-blue/5">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <LayoutDashboard className="h-12 w-12 text-primary mx-auto mb-2" />
            <CardTitle>Admin Login</CardTitle>
            <p className="text-sm text-muted-foreground">Sign in to manage enquiries</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
              </div>
              <Button type="submit" className="w-full">
                <LogIn className="h-4 w-4 mr-2" /> Sign In
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-ocean-blue/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage client enquiries</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" /> Logout
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {statusSteps.map(step => {
            const count = quotes.filter(q => q.status === step.id).length;
            return (
              <Card key={step.id}>
                <CardContent className="pt-6 text-center">
                  <step.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold">{count}</p>
                  <p className="text-sm text-muted-foreground">{step.label}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search by name, company, email, or ref..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {statusSteps.map(step => (
                    <SelectItem key={step.id} value={step.id}>{step.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Quotes Table */}
        <Card>
          <CardHeader>
            <CardTitle>Enquiries ({filteredQuotes.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reference</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredQuotes.map(quote => (
                  <TableRow key={quote.id}>
                    <TableCell className="font-mono text-sm">{quote.reference_number}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{quote.name}</p>
                        <p className="text-sm text-muted-foreground">{quote.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>{quote.company}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {(quote.products || []).slice(0, 2).map(p => (
                          <Badge key={p} variant="outline" className="text-xs">{p}</Badge>
                        ))}
                        {(quote.products || []).length > 2 && (
                          <Badge variant="outline" className="text-xs">+{(quote.products || []).length - 2}</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusBadgeColor(quote.status)}>
                        {statusSteps.find(s => s.id === quote.status)?.label || quote.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{new Date(quote.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" onClick={() => {
                            setSelectedQuote(quote);
                            setNewStatus(quote.status);
                          }}>
                            <Eye className="h-4 w-4 mr-1" /> View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Quote #{quote.reference_number}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div><p className="text-muted-foreground">Name</p><p className="font-medium">{quote.name}</p></div>
                              <div><p className="text-muted-foreground">Company</p><p className="font-medium">{quote.company}</p></div>
                              <div><p className="text-muted-foreground">Email</p><p className="font-medium">{quote.email}</p></div>
                              <div><p className="text-muted-foreground">Phone</p><p className="font-medium">{quote.phone || 'N/A'}</p></div>
                              <div><p className="text-muted-foreground">Country</p><p className="font-medium">{quote.country || 'N/A'}</p></div>
                              <div><p className="text-muted-foreground">Quantity</p><p className="font-medium">{quote.quantity || 'N/A'}</p></div>
                              <div><p className="text-muted-foreground">Timeline</p><p className="font-medium">{quote.delivery_timeline || 'N/A'}</p></div>
                              <div><p className="text-muted-foreground">Budget</p><p className="font-medium">{quote.budget || 'N/A'}</p></div>
                            </div>
                            {quote.specifications && (
                              <div><p className="text-sm text-muted-foreground">Specifications</p><p className="text-sm">{quote.specifications}</p></div>
                            )}
                            {quote.additional_info && (
                              <div><p className="text-sm text-muted-foreground">Additional Info</p><p className="text-sm">{quote.additional_info}</p></div>
                            )}
                            <hr />
                            <div className="space-y-3">
                              <Label>Update Status</Label>
                              <Select value={newStatus} onValueChange={setNewStatus}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                  {statusSteps.map(step => (
                                    <SelectItem key={step.id} value={step.id}>{step.label}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <Textarea
                                placeholder="Add notes about this update..."
                                value={statusNotes}
                                onChange={e => setStatusNotes(e.target.value)}
                              />
                              <Button onClick={updateQuoteStatus} disabled={!newStatus} className="w-full">
                                <ArrowRight className="h-4 w-4 mr-2" /> Update Status
                              </Button>
                            </div>
                            <hr />
                            <QuoteAttachmentUploader quoteId={quote.id} />
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredQuotes.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No enquiries found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
