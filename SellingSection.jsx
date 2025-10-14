import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card.tsx';
import { Button } from './ui/button.tsx';
import { Alert, AlertDescription } from './ui/alert.tsx';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible.tsx';
import { 
  ChevronDown, 
  FileText, 
  ClipboardCheck, 
  TrendingUp, 
  Camera, 
  Users,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export function SellingSection() {
  const [isOpen, setIsOpen] = useState(false);

  const sellingSteps = [
    {
      icon: ClipboardCheck,
      title: 'Property Valuation',
      description: 'I conduct a comprehensive market analysis to determine the optimal selling price for your property.',
      duration: '1-2 days'
    },
    {
      icon: Camera,
      title: 'Marketing & Photography',
      description: 'Professional photos and compelling listings on major property portals and social media.',
      duration: 'Ongoing'
    },
    {
      icon: Users,
      title: 'Viewings & Negotiations',
      description: 'I handle all viewings, qualify potential buyers, and negotiate the best possible price.',
      duration: '2-8 weeks'
    },
    {
      icon: FileText,
      title: 'Offer Acceptance & Paperwork',
      description: 'Once we accept an offer, I manage all documentation and work with conveyancers.',
      duration: '8-12 weeks'
    },
    {
      icon: TrendingUp,
      title: 'Transfer Process',
      description: 'I coordinate with attorneys and ensure a smooth transfer to the new owner.',
      duration: '8-12 weeks'
    }
  ];

  const documentsNeeded = {
    buying: [
      'Valid ID or passport',
      'Proof of income (latest 3 payslips)',
      'Bank statements (3 months)',
      'Proof of residence',
      'Credit report',
      'Employment letter'
    ],
    selling: [
      'Original Title Deed',
      'Rates clearance certificate',
      'Electrical compliance certificate',
      'Gas compliance certificate (if applicable)',
      'Electric fence compliance certificate (if applicable)',
      'Beetle-free certificate (if property older than 30 years)',
      'Building plans approved by municipality',
      'Homeowners association documents (if applicable)'
    ]
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button 
            variant="outline" 
            size="lg" 
            className="w-full max-w-md mx-auto flex items-center justify-between shadow-lg hover:shadow-xl transition-all border-2 border-primary/30 hover:bg-primary/5"
          >
            <span>Need to sell your current house?</span>
            <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </Button>
        </CollapsibleTrigger>
        
        <CollapsibleContent className="mt-8 space-y-8">
          <Alert className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/10 shadow-md">
            <AlertCircle className="h-5 w-5 text-primary" />
            <AlertDescription className="text-base">
              Selling your current property? I can help with that too! Many buyers need to sell first, 
              and I offer comprehensive services to manage both transactions seamlessly.
            </AlertDescription>
          </Alert>

          <div className="space-y-6">
            <div className="text-center space-y-3">
              <h3 className="text-foreground">The Selling Process</h3>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                A smooth, professional approach to selling your property
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sellingSteps.map((step, index) => (
                <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow border border-border bg-card">
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <div className="bg-secondary text-secondary-foreground rounded-full p-3 shadow-md">
                        <step.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-base text-card-foreground">{step.title}</CardTitle>
                        <p className="text-xs text-card-foreground/70 mt-1 bg-primary/10 px-2 py-1 rounded inline-block border border-primary/20">{step.duration}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-card-foreground/80 leading-relaxed">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <Card className="shadow-lg border border-border bg-card">
              <CardHeader className="bg-primary/10">
                <CardTitle className="flex items-center gap-3 text-card-foreground">
                  <div className="p-2 bg-primary text-primary-foreground rounded-lg">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  Documents for Buying
                </CardTitle>
                <CardDescription className="text-card-foreground/70">
                  Prepare these documents for your home loan application
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  {documentsNeeded.buying.map((doc, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-card-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-lg border border-border bg-card">
              <CardHeader className="bg-secondary/20">
                <CardTitle className="flex items-center gap-3 text-card-foreground">
                  <div className="p-2 bg-primary text-primary-foreground rounded-lg">
                    <FileText className="h-5 w-5" />
                  </div>
                  Documents for Selling
                </CardTitle>
                <CardDescription className="text-card-foreground/70">
                  Gather these documents before listing your property
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  {documentsNeeded.selling.map((doc, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-card-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
