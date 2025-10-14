import { BuyerContactForm } from './components/BuyerContactForm';
import { AffordabilityCalculator } from './components/AffordabilityCalculator';
import { BuyingProcess } from './components/BuyingProcess';
import { SellingSection } from './components/SellingSection';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { Toaster } from './components/ui/sonner';
import { Home, Phone, MapPin, Menu, X } from 'lucide-react';
import { Button } from './components/ui/button';
import { InteractiveMap } from './components/InteractiveMap';
import { BuyingProgressTracker } from './components/BuyingProgressTracker';
import { SellingProgressTracker } from './components/SellingProgressTracker';
import { ServiceRating } from './components/ServiceRating';
import { PropertyListings } from './components/PropertyListings';
import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './components/ui/sheet';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleWhatsAppContact = () => {
    const whatsappNumber = '27823146558';
    const message = encodeURIComponent('Hi! I\'d like to inquire about buying a property in Benoni/Boksburg.');
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const navigationItems = [
    { id: 'hero', label: 'Home', icon: Home },
    { id: 'contact-form', label: 'Contact Form', icon: Phone },
    { id: 'calculator', label: 'Affordability Calculator', icon: Home },
    { id: 'buying-process', label: 'Buying Process', icon: Home },
    { id: 'map', label: 'Suburb Map', icon: MapPin },
    { id: 'properties', label: 'Property Listings', icon: Home },
    { id: 'selling', label: 'Selling Your Home', icon: Home },
    { id: 'selling-tracker', label: 'Selling Progress', icon: Home },
    { id: 'buying-tracker', label: 'Buying Progress', icon: Home },
    { id: 'reviews', label: 'Reviews', icon: Home },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      
      {/* Fixed Navigation Button */}
      <div className="fixed top-6 left-6 z-50">
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button 
              size="lg"
              className="bg-grey hover:bg-grey/90 text-white shadow-xl border border-white/20"
            >
              <Menu className="h-5 w-5 mr-2" />
              Menu
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-grey border-border w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle className="text-white flex items-center gap-3">
                <Home className="h-6 w-6" />
                Navigation
              </SheetTitle>
              <SheetDescription className="text-white/70">
                Quick access to all sections
              </SheetDescription>
            </SheetHeader>
            <div className="mt-8 space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-card hover:bg-card/80 text-white transition-all border border-border hover:border-white/40"
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-white/20">
              <Button 
                onClick={handleWhatsAppContact}
                className="w-full bg-white text-black hover:bg-white/90"
              >
                <Phone className="mr-2 h-5 w-5" />
                WhatsApp Me
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      
      {/* Hero Section */}
      <section id="hero" className="relative bg-grey text-white overflow-hidden border-b border-border">
        <div className="absolute inset-0 opacity-10">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3VzZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc1OTc2MDk5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Modern house"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-grey/95 via-grey/90 to-black"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20">
                <Home className="h-8 w-8 text-white" />
              </div>
              <span className="text-xl tracking-wide text-white">Your Trusted Real Estate Agent</span>
            </div>
            <h1 className="mb-6 leading-tight text-white">Find Your Dream Home in Benoni & Boksburg</h1>
            <p className="text-lg text-white/90 mb-10 leading-relaxed">
              I specialize in helping buyers find the perfect property in Benoni and Boksburg. 
              From your first viewing to receiving your keys, I'll guide you through every step 
              of the home buying journey with expertise and dedication.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg"
                onClick={handleWhatsAppContact}
                className="shadow-lg hover:shadow-xl transition-shadow bg-white text-black hover:bg-white/90"
              >
                <Phone className="mr-2 h-5 w-5" />
                Contact Me on WhatsApp
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 transition-all shadow-lg"
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get Started
              </Button>
            </div>
            
            {/* Quick Contact Info */}
            <div className="mt-12 pt-8 border-t border-white/20 flex flex-wrap gap-8">
              <div className="flex items-center gap-3 text-white">
                <div className="p-2 bg-white/10 rounded-full border border-white/20">
                  <Phone className="h-4 w-4" />
                </div>
                <span className="text-white">082 314 6558</span>
              </div>
              <div className="flex items-center gap-3 text-white">
                <div className="p-2 bg-white/10 rounded-full border border-white/20">
                  <MapPin className="h-4 w-4" />
                </div>
                <span className="text-white">Benoni & Boksburg</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-20 px-4 bg-background border-t border-border">
        <BuyerContactForm />
      </section>

      {/* Affordability Calculator Section */}
      <section id="calculator" className="py-20 px-4 bg-background border-t border-border">
        <AffordabilityCalculator />
      </section>

      {/* Buying Process Section */}
      <section id="buying-process" className="py-20 px-4 bg-background border-t border-border">
        <BuyingProcess />
      </section>

      {/* Interactive Map Section */}
      <section id="map" className="py-20 px-4 bg-background border-t border-border">
        <InteractiveMap />
      </section>

      {/* Property Listings Section */}
      <section id="properties" className="py-20 px-4 bg-background border-t border-border">
        <PropertyListings />
      </section>

      {/* Selling Section */}
      <section id="selling" className="py-20 px-4 bg-background border-t border-border">
        <SellingSection />
      </section>

      {/* Selling Progress Tracker */}
      <section id="selling-tracker" className="py-20 px-4 bg-background border-t border-border">
        <SellingProgressTracker />
      </section>

      {/* Buying Progress Tracker */}
      <section id="buying-tracker" className="py-20 px-4 bg-background border-t border-border">
        <BuyingProgressTracker />
      </section>

      {/* Service Rating Section */}
      <section id="reviews" className="py-20 px-4 bg-background border-t border-border">
        <ServiceRating />
      </section>

      {/* Footer */}
      <footer className="bg-grey text-white py-16 px-4 mt-8 border-t border-border">
        <div className="max-w-7xl mx-auto text-center space-y-6">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 bg-white/10 rounded-lg border border-white/20">
              <Home className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl tracking-wide text-white">Your Real Estate Partner</span>
          </div>
          <p className="text-white/80 max-w-md mx-auto">
            Serving Benoni, Boksburg, and surrounding areas with dedication and expertise
          </p>
          <div className="flex justify-center gap-6">
            <button 
              onClick={handleWhatsAppContact}
              className="hover:underline flex items-center gap-2 bg-white/10 px-6 py-3 rounded-lg hover:bg-white/20 transition-all border border-white/20 text-white"
            >
              <Phone className="h-4 w-4" />
              <span>082 314 6558</span>
            </button>
          </div>
          <div className="pt-8 border-t border-white/20">
            <p className="text-sm text-white/60">
              © {new Date().getFullYear()} Real Estate Benoni & Boksburg - All rights reserved
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
