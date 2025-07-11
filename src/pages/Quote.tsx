import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Send, 
  Building, 
  Cog, 
  Armchair, 
  Wrench, 
  Zap,
  CheckCircle,
  Clock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Quote = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    country: "",
    products: [] as string[],
    quantity: "",
    specifications: "",
    deliveryTimeline: "",
    budget: "",
    additionalInfo: ""
  });

  const productCategories = [
    { id: "steel", label: "Steel & Iron", icon: Building },
    { id: "machinery", label: "Industrial Machinery", icon: Cog },
    { id: "furniture", label: "Furniture & Fabrics", icon: Armchair },
    { id: "ceramics", label: "Ceramics & POP", icon: Wrench },
    { id: "solar", label: "Solar Panels", icon: Zap }
  ];

  const handleProductToggle = (productId: string) => {
    setFormData(prev => ({
      ...prev,
      products: prev.products.includes(productId)
        ? prev.products.filter(id => id !== productId)
        : [...prev.products, productId]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.company || formData.products.length === 0) {
      toast({
        title: "Please fill in all required fields",
        description: "Name, email, company, and at least one product category are required.",
        variant: "destructive"
      });
      return;
    }

    // Show success message
    toast({
      title: "Quote request submitted!",
      description: "We'll get back to you within 24 hours with a detailed quote.",
    });

    // Reset form
    setFormData({
      name: "",
      company: "",
      email: "",
      phone: "",
      country: "",
      products: [],
      quantity: "",
      specifications: "",
      deliveryTimeline: "",
      budget: "",
      additionalInfo: ""
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-ocean-blue/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Request a Quote
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Tell us about your requirements and get a personalized quote for premium Turkish products.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-success-green" />
              <span>Free Quote</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-success-green" />
              <span>24-Hour Response</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-success-green" />
              <span>No Obligation</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">Quote Request Form</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company Name *</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                        placeholder="Your company name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="+1 234 567 8900"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="country">Delivery Country/Region</Label>
                      <Input
                        id="country"
                        value={formData.country}
                        onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                        placeholder="Country/Region for delivery"
                      />
                    </div>
                  </div>
                </div>

                {/* Product Selection */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Product Categories *</h3>
                  <p className="text-sm text-muted-foreground mb-4">Select all product categories you're interested in:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {productCategories.map((category) => (
                      <div key={category.id} className="flex items-center space-x-3">
                        <Checkbox
                          id={category.id}
                          checked={formData.products.includes(category.id)}
                          onCheckedChange={() => handleProductToggle(category.id)}
                        />
                        <Label htmlFor={category.id} className="flex items-center gap-2 cursor-pointer">
                          <category.icon className="h-4 w-4 text-primary" />
                          {category.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Product Details */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Product Requirements</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <Label htmlFor="quantity">Estimated Quantity</Label>
                      <Input
                        id="quantity"
                        value={formData.quantity}
                        onChange={(e) => setFormData(prev => ({ ...prev, quantity: e.target.value }))}
                        placeholder="e.g., 100 tons, 50 units, 1 container"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="deliveryTimeline">Delivery Timeline</Label>
                      <Select onValueChange={(value) => setFormData(prev => ({ ...prev, deliveryTimeline: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select timeline" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="urgent">ASAP (Rush Order)</SelectItem>
                          <SelectItem value="1month">Within 1 Month</SelectItem>
                          <SelectItem value="2months">1-2 Months</SelectItem>
                          <SelectItem value="3months">2-3 Months</SelectItem>
                          <SelectItem value="flexible">Flexible Timeline</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <Label htmlFor="specifications">Product Specifications & Requirements</Label>
                    <Textarea
                      id="specifications"
                      value={formData.specifications}
                      onChange={(e) => setFormData(prev => ({ ...prev, specifications: e.target.value }))}
                      placeholder="Describe your specific requirements, quality standards, certifications needed, technical specifications, etc."
                      rows={4}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget Range (Optional)</Label>
                    <Select onValueChange={(value) => setFormData(prev => ({ ...prev, budget: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-10k">Under $10,000</SelectItem>
                        <SelectItem value="10k-50k">$10,000 - $50,000</SelectItem>
                        <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                        <SelectItem value="100k-500k">$100,000 - $500,000</SelectItem>
                        <SelectItem value="over-500k">Over $500,000</SelectItem>
                        <SelectItem value="discuss">Prefer to Discuss</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Additional Information */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Additional Information</h3>
                  <div className="space-y-2">
                    <Label htmlFor="additionalInfo">Additional Comments or Requirements</Label>
                    <Textarea
                      id="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={(e) => setFormData(prev => ({ ...prev, additionalInfo: e.target.value }))}
                      placeholder="Any additional information, special requirements, or questions you'd like to share..."
                      rows={3}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="text-center pt-6">
                  <Button type="submit" variant="cta" size="lg" className="w-full md:w-auto">
                    <Send className="h-5 w-5 mr-2" />
                    Submit Quote Request
                  </Button>
                  <p className="text-sm text-muted-foreground mt-4">
                    We'll review your request and send you a detailed quote within 24 hours.
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* What Happens Next */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              What Happens Next?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <CheckCircle className="h-12 w-12 text-success-green mx-auto mb-4" />
                <CardTitle>1. Review & Contact</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We review your requirements and contact you within 24 hours to clarify any details.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Building className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>2. Supplier Sourcing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our team identifies the best Turkish suppliers that match your requirements and quality standards.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Send className="h-12 w-12 text-ocean-blue mx-auto mb-4" />
                <CardTitle>3. Detailed Quote</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Receive a comprehensive quote with pricing, specifications, and delivery terms.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Quote;