import { useState } from 'react';
import { Button } from './ui/button.tsx';
import { Input } from './ui/input.tsx';
import { Textarea } from './ui/textarea.tsx';
import { Label } from './ui/label.tsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select.tsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card.tsx';
import { Send } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function BuyerContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyType: '',
    bedrooms: '',
    budget: '',
    location: '',
    additionalInfo: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Store client phone number for progress notifications
    if (formData.phone) {
      // Format phone number to international format
      let phoneNumber = formData.phone.replace(/\s/g, '');
      if (phoneNumber.startsWith('0')) {
        phoneNumber = '27' + phoneNumber.substring(1);
      } else if (!phoneNumber.startsWith('27')) {
        phoneNumber = '27' + phoneNumber;
      }
      localStorage.setItem('clientPhone', phoneNumber);
    }
    
    // Create WhatsApp message
    const message = `🏡 NEW BUYER INQUIRY

👤 Name: ${formData.name}
📧 Email: ${formData.email}
📱 Phone: ${formData.phone}

🏠 PROPERTY PREFERENCES:
Type: ${formData.propertyType}
Bedrooms: ${formData.bedrooms}
Budget: R${formData.budget}
Preferred Location: ${formData.location}

📝 Additional Info:
${formData.additionalInfo || 'None provided'}`;
    
    const whatsappNumber = '27823146558'; // Format: country code + number without 0
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    toast.success('Redirecting to WhatsApp...', {
      description: 'Your inquiry will be sent to our agent'
    });
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      propertyType: '',
      bedrooms: '',
      budget: '',
      location: '',
      additionalInfo: ''
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-2xl border-0 bg-card">
      <CardHeader className="space-y-3 pb-8">
        <CardTitle className="text-center text-card-foreground">Find Your Dream Home</CardTitle>
        <CardDescription className="text-center text-card-foreground/80">
          Fill in your details and preferences, and I'll help you find the perfect property in Benoni and Boksburg
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-card-foreground">Full Name *</Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
                className="bg-input-background text-card-foreground placeholder:text-card-foreground/40"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-card-foreground">Email Address *</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@example.com"
                className="bg-input-background text-card-foreground placeholder:text-card-foreground/40"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-card-foreground">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="082 314 6558"
              className="bg-input-background text-card-foreground placeholder:text-card-foreground/40"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="propertyType" className="text-card-foreground">Property Type *</Label>
              <Select required value={formData.propertyType} onValueChange={(value) => setFormData({ ...formData, propertyType: value })}>
                <SelectTrigger id="propertyType" className="bg-input-background text-card-foreground">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="townhouse">Townhouse</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="vacant-land">Vacant Land</SelectItem>
                  <SelectItem value="estate">Estate Property</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bedrooms" className="text-card-foreground">Bedrooms *</Label>
              <Select required value={formData.bedrooms} onValueChange={(value) => setFormData({ ...formData, bedrooms: value })}>
                <SelectTrigger id="bedrooms" className="bg-input-background text-card-foreground">
                  <SelectValue placeholder="Select bedrooms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Bedroom</SelectItem>
                  <SelectItem value="2">2 Bedrooms</SelectItem>
                  <SelectItem value="3">3 Bedrooms</SelectItem>
                  <SelectItem value="4">4 Bedrooms</SelectItem>
                  <SelectItem value="5+">5+ Bedrooms</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="budget" className="text-card-foreground">Budget (R) *</Label>
              <Input
                id="budget"
                type="number"
                required
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                placeholder="1500000"
                className="bg-input-background text-card-foreground placeholder:text-card-foreground/40"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-card-foreground">Preferred Location *</Label>
              <Select required value={formData.location} onValueChange={(value) => setFormData({ ...formData, location: value })}>
                <SelectTrigger id="location" className="bg-input-background text-card-foreground">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="benoni">Benoni</SelectItem>
                  <SelectItem value="boksburg">Boksburg</SelectItem>
                  <SelectItem value="both">Both Areas</SelectItem>
                  <SelectItem value="surrounding">Surrounding Areas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="additionalInfo" className="text-card-foreground">Additional Requirements</Label>
            <Textarea
              id="additionalInfo"
              value={formData.additionalInfo}
              onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
              placeholder="Tell me more about your dream home... (e.g., pool, garage, security estate, etc.)"
              rows={4}
              className="bg-input-background text-card-foreground placeholder:text-card-foreground/40"
            />
          </div>

          <Button type="submit" className="w-full shadow-lg hover:shadow-xl transition-shadow bg-primary hover:bg-primary/90" size="lg">
            <Send className="mr-2 h-4 w-4" />
            Contact Agent via WhatsApp
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
