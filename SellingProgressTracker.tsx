import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { CheckCircle2, Circle, Clock, AlertCircle, Lock } from 'lucide-react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { AgentReminder } from './AgentReminder';

interface Step {
  id: string;
  title: string;
  description: string;
  estimatedDays: string;
  tasks: {
    id: string;
    title: string;
    completed: boolean;
  }[];
}

export function SellingProgressTracker() {
  const [isAgentMode, setIsAgentMode] = useState(() => {
    return localStorage.getItem('isAgentLoggedIn') === 'true';
  });
  const [agentPassword, setAgentPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  // Agent password - in production, this should be stored securely
  const AGENT_PASSWORD = 'agent2024';

  const [steps, setSteps] = useState<Step[]>([
    {
      id: 'valuation',
      title: 'Property Valuation',
      description: 'Market analysis and pricing strategy',
      estimatedDays: '1-2 days',
      tasks: [
        { id: 'inspect', title: 'Property inspection completed', completed: false },
        { id: 'market', title: 'Market analysis conducted', completed: false },
        { id: 'price', title: 'Selling price agreed upon', completed: false }
      ]
    },
    {
      id: 'preparation',
      title: 'Property Preparation',
      description: 'Getting your property ready for sale',
      estimatedDays: '1-2 weeks',
      tasks: [
        { id: 'docs', title: 'Documents collected', completed: false },
        { id: 'certificates', title: 'Compliance certificates obtained', completed: false },
        { id: 'staging', title: 'Property staging/improvements', completed: false }
      ]
    },
    {
      id: 'marketing',
      title: 'Marketing & Listing',
      description: 'Professional marketing campaign',
      estimatedDays: '3-5 days',
      tasks: [
        { id: 'photos', title: 'Professional photography completed', completed: false },
        { id: 'listing', title: 'Listed on property portals', completed: false },
        { id: 'signboard', title: 'For Sale board installed', completed: false }
      ]
    },
    {
      id: 'viewings',
      title: 'Viewings & Showings',
      description: 'Presenting your property to buyers',
      estimatedDays: '2-8 weeks',
      tasks: [
        { id: 'schedule', title: 'Viewing schedule established', completed: false },
        { id: 'feedback', title: 'Buyer feedback collected', completed: false },
        { id: 'offers', title: 'Offers received', completed: false }
      ]
    },
    {
      id: 'negotiation',
      title: 'Offer & Negotiation',
      description: 'Securing the best deal',
      estimatedDays: '1-2 weeks',
      tasks: [
        { id: 'review', title: 'Offers reviewed', completed: false },
        { id: 'negotiate', title: 'Negotiation completed', completed: false },
        { id: 'accept', title: 'Offer accepted', completed: false }
      ]
    },
    {
      id: 'sale',
      title: 'Sale Agreement',
      description: 'Legal documentation and contracts',
      estimatedDays: '1 week',
      tasks: [
        { id: 'contract', title: 'Sale agreement signed', completed: false },
        { id: 'deposit', title: 'Deposit received', completed: false },
        { id: 'attorney', title: 'Transfer attorney appointed', completed: false }
      ]
    },
    {
      id: 'transfer',
      title: 'Transfer Process',
      description: 'Legal transfer to new owner',
      estimatedDays: '8-12 weeks',
      tasks: [
        { id: 'bondcancellation', title: 'Bond cancellation (if applicable)', completed: false },
        { id: 'deeds', title: 'Deeds office registration', completed: false },
        { id: 'payment', title: 'Payment received', completed: false }
      ]
    }
  ]);

  const handleAgentLogin = () => {
    if (agentPassword === AGENT_PASSWORD) {
      setIsAgentMode(true);
      localStorage.setItem('isAgentLoggedIn', 'true');
      setPasswordError('');
      setAgentPassword('');
    } else {
      setPasswordError('Incorrect password. Please try again.');
    }
  };

  const handleAgentLogout = () => {
    setIsAgentMode(false);
    localStorage.setItem('isAgentLoggedIn', 'false');
  };

  const sendProgressNotification = (stepTitle: string, taskTitle: string, isCompleted: boolean) => {
    const agentPhone = '27823146558';
    const clientPhone = localStorage.getItem('clientPhone') || '';
    
    const status = isCompleted ? 'completed' : 'updated';
    const message = encodeURIComponent(
      `🏡 Selling Journey Update!\n\nStep: ${stepTitle}\nTask: ${taskTitle}\nStatus: ${status}\n\nYour agent will contact you with more details.`
    );
    
    // Send notification to agent
    window.open(`https://wa.me/${agentPhone}?text=${encodeURIComponent(`Agent Update: Task "${taskTitle}" in "${stepTitle}" was marked as ${status}`)}`, '_blank');
    
    // Send notification to client if phone number is available
    if (clientPhone) {
      setTimeout(() => {
        window.open(`https://wa.me/${clientPhone}?text=${message}`, '_blank');
      }, 1000);
    }
  };

  const toggleTask = (stepId: string, taskId: string) => {
    if (!isAgentMode) return;
    
    // Find the task and step before updating
    const currentStep = steps.find(step => step.id === stepId);
    const currentTask = currentStep?.tasks.find(task => task.id === taskId);
    
    setSteps(steps.map(step => {
      if (step.id === stepId) {
        return {
          ...step,
          tasks: step.tasks.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
          )
        };
      }
      return step;
    }));
    
    // Send notifications
    if (currentStep && currentTask) {
      sendProgressNotification(currentStep.title, currentTask.title, !currentTask.completed);
    }
  };

  const totalTasks = steps.reduce((acc, step) => acc + step.tasks.length, 0);
  const completedTasks = steps.reduce((acc, step) => 
    acc + step.tasks.filter(task => task.completed).length, 0
  );
  const progress = (completedTasks / totalTasks) * 100;

  const getStepStatus = (step: Step) => {
    const completed = step.tasks.filter(t => t.completed).length;
    const total = step.tasks.length;
    if (completed === total) return 'completed';
    if (completed > 0) return 'in-progress';
    return 'pending';
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      <AgentReminder type="selling" />
      
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-card rounded-lg">
            <CheckCircle2 className="h-8 w-8 text-white" />
          </div>
        </div>
        <h2 className="text-white">Your Selling Journey Progress</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Track your property sale from listing to transfer
        </p>
      </div>

      {/* Agent Login Section */}
      {!isAgentMode && (
        <Card className="bg-card border-border border-2 border-white/30 max-w-md mx-auto">
          <CardHeader>
            <div className="flex items-center justify-center mb-2">
              <Lock className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-white text-center">Agent Access Required</CardTitle>
            <CardDescription className="text-muted-foreground text-center">
              Progress updates are managed by your agent to ensure accuracy
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="agent-password" className="text-white">Agent Password</Label>
              <Input
                id="agent-password"
                type="password"
                placeholder="Enter agent password"
                value={agentPassword}
                onChange={(e) => {
                  setAgentPassword(e.target.value);
                  setPasswordError('');
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAgentLogin();
                  }
                }}
                className="bg-input-background border-border text-white placeholder:text-muted-foreground"
              />
              {passwordError && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {passwordError}
                </p>
              )}
            </div>
            <Button 
              onClick={handleAgentLogin}
              className="w-full bg-white hover:bg-white/90 text-black"
            >
              Login as Agent
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Only your agent can update the progress tracker
            </p>
          </CardContent>
        </Card>
      )}

      {/* Agent Mode Indicator */}
      {isAgentMode && (
        <Card className="bg-green-900/20 border-green-400/50 border-2 max-w-md mx-auto">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-green-400">
                <CheckCircle2 className="h-5 w-5" />
                <span>Agent Mode Active</span>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={handleAgentLogout}
                className="border-green-400/50 text-green-400 hover:bg-green-400/10"
              >
                Logout
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Overall Progress */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white">Overall Progress</CardTitle>
              <CardDescription className="text-muted-foreground">
                {completedTasks} of {totalTasks} tasks completed
              </CardDescription>
            </div>
            <Badge variant="secondary" className="bg-secondary text-white text-lg px-4 py-2">
              {Math.round(progress)}%
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={progress} className="h-3" />
        </CardContent>
      </Card>

      {/* Steps */}
      <div className="space-y-4">
        {steps.map((step, index) => {
          const status = getStepStatus(step);
          const stepCompleted = step.tasks.filter(t => t.completed).length;
          const stepTotal = step.tasks.length;
          
          return (
            <Card key={step.id} className="bg-card border-border">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    {status === 'completed' ? (
                      <div className="p-2 bg-green-900/30 rounded-full border-2 border-green-400">
                        <CheckCircle2 className="h-6 w-6 text-green-400" />
                      </div>
                    ) : status === 'in-progress' ? (
                      <div className="p-2 bg-blue-900/30 rounded-full border-2 border-blue-400">
                        <Clock className="h-6 w-6 text-blue-400" />
                      </div>
                    ) : (
                      <div className="p-2 bg-background rounded-full border-2 border-border">
                        <Circle className="h-6 w-6 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <CardTitle className="text-white mb-1">
                          Step {index + 1}: {step.title}
                        </CardTitle>
                        <CardDescription className="text-muted-foreground">
                          {step.description}
                        </CardDescription>
                      </div>
                      <Badge variant="outline" className="border-white/20 text-white">
                        {step.estimatedDays}
                      </Badge>
                    </div>

                    <div className="mt-4 space-y-3">
                      {step.tasks.map((task) => (
                        <div 
                          key={task.id}
                          className={`flex items-center gap-3 p-3 bg-background rounded-lg border border-border transition-colors ${
                            isAgentMode ? 'hover:border-white/30 cursor-pointer' : ''
                          }`}
                        >
                          <Checkbox
                            id={`${step.id}-${task.id}`}
                            checked={task.completed}
                            onCheckedChange={() => toggleTask(step.id, task.id)}
                            disabled={!isAgentMode}
                            className="border-white/30 data-[state=checked]:bg-white data-[state=checked]:text-black disabled:opacity-50"
                          />
                          <label
                            htmlFor={`${step.id}-${task.id}`}
                            className={`flex-1 ${isAgentMode ? 'cursor-pointer' : 'cursor-not-allowed'} ${
                              task.completed ? 'line-through text-muted-foreground' : 'text-white'
                            }`}
                          >
                            {task.title}
                          </label>
                          {task.completed && (
                            <CheckCircle2 className="h-4 w-4 text-green-400" />
                          )}
                          {!isAgentMode && !task.completed && (
                            <Lock className="h-3 w-3 text-muted-foreground" />
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="mt-3 flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {stepCompleted} of {stepTotal} tasks completed
                      </span>
                      <Progress 
                        value={(stepCompleted / stepTotal) * 100} 
                        className="w-32 h-2"
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>
          );
        })}
      </div>

      {/* Help Section */}
      <Card className="bg-card border-border border-white/30">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-white mb-2">Questions about the selling process?</p>
              <p className="text-muted-foreground text-sm mb-4">
                I'm here to guide you through every stage of selling your property. 
                Your agent will keep this tracker updated as we progress through each step.
              </p>
              <Button 
                onClick={() => {
                  const whatsappNumber = '27823146558';
                  const message = encodeURIComponent('Hi! I have questions about selling my property.');
                  window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
                }}
                className="bg-primary hover:bg-primary/80 text-white"
              >
                Contact Me on WhatsApp
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
