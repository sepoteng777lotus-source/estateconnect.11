import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card.tsx';
import { CheckCircle2, Home, FileText, Search, Key, UserCheck } from 'lucide-react';

export function BuyingProcess() {
  const steps = [
    {
      icon: UserCheck,
      title: 'Initial Consultation',
      description: 'We discuss your needs, budget, and preferences. I\'ll help you understand the market in Benoni and Boksburg.',
      agentHelp: 'I provide expert market insights and help you define your property criteria.'
    },
    {
      icon: Search,
      title: 'Property Search',
      description: 'I find properties that match your requirements and arrange viewings at your convenience.',
      agentHelp: 'I search the market thoroughly and negotiate viewing times that suit your schedule.'
    },
    {
      icon: FileText,
      title: 'Making an Offer',
      description: 'Once you find your dream home, we prepare and submit an offer to purchase.',
      agentHelp: 'I guide you on competitive pricing and handle all negotiations on your behalf.'
    },
    {
      icon: CheckCircle2,
      title: 'Bond Application',
      description: 'I assist with your home loan application and work with banks to get you the best rate.',
      agentHelp: 'I coordinate with bond originators and ensure all documentation is complete.'
    },
    {
      icon: Home,
      title: 'Property Inspection',
      description: 'Arrange for property inspections, compliance certificates, and necessary evaluations.',
      agentHelp: 'I recommend trusted inspectors and help you understand inspection reports.'
    },
    {
      icon: Key,
      title: 'Transfer & Handover',
      description: 'The conveyancer handles the legal transfer while I coordinate your move-in.',
      agentHelp: 'I liaise with attorneys, ensure smooth transfer, and hand you the keys to your new home.'
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-3">
        <h2 className="text-foreground">The Home Buying Process</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Let me guide you through every step of your home buying journey with expertise and care
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {steps.map((step, index) => (
          <Card key={index} className="relative shadow-lg hover:shadow-xl transition-shadow border border-border bg-card">
            <CardHeader>
              <div className="flex items-start gap-3">
                <div className="bg-primary text-primary-foreground rounded-full p-3 mt-1 shadow-md">
                  <step.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-primary/20 text-card-foreground px-3 py-1 rounded-full border border-primary/30">Step {index + 1}</span>
                  </div>
                  <CardTitle className="mt-3 text-card-foreground">{step.title}</CardTitle>
                </div>
              </div>
              <CardDescription className="mt-3 text-card-foreground/70">{step.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
                <p className="text-sm text-card-foreground">
                  <span className="text-card-foreground">How I help: </span>
                  {step.agentHelp}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
