import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card.tsx';
import { Button } from './ui/button.tsx';
import { Checkbox } from './ui/checkbox.tsx';
import { Progress } from './ui/progress.tsx';
import { Badge } from './ui/badge.tsx';
import { CheckCircle2, Circle, Clock, AlertCircle, Lock } from 'lucide-react';
import { Input } from './ui/input.tsx';
import { AgentReminder } from './AgentReminder.tsx';

export function BuyingProgressTracker() {
  const [isAgentMode, setIsAgentMode] = useState(() => {
    return localStorage.getItem('isAgentLoggedIn') === 'true';
  });
  const [password, setPassword] = useState('');
  const [showPasswordInput, setShowPasswordInput] = useState(false);

  const [steps, setSteps] = useState([
    {
      id: 'consultation',
      title: 'Initial Consultation',
      description: 'Understanding your needs and budget',
      estimatedDays: '1-2 days',
      tasks: [
        { id: 'meet', title: 'Meet with agent', completed: false },
        { id: 'budget', title: 'Discuss budget & requirements', completed: false },
        { id: 'preapproval', title: 'Get bond pre-approval', completed: false }
      ]
    },
    {
      id: 'search',
      title: 'Property Search',
      description: 'Finding your perfect home',
      estimatedDays: '2-4 weeks',
      tasks: [
        { id: 'viewings', title: 'Schedule property viewings', completed: false },
        { id: 'shortlist', title: 'Create shortlist', completed: false },
        { id: 'decision', title: 'Make final decision', completed: false }
      ]
    },
    {
      id: 'offer',
      title: 'Making an Offer',
      description: 'Submitting your offer to purchase',
      estimatedDays: '3-7 days',
      tasks: [
        { id: 'prepare', title: 'Prepare offer to purchase', completed: false },
        { id: 'negotiate', title: 'Negotiate terms', completed: false },
        { id: 'accept', title: 'Offer accepted', completed: false }
      ]
    },
    {
      id: 'bond',
      title: 'Bond Application',
      description: 'Securing your home loan',
      estimatedDays: '2-4 weeks',
      tasks: [
        { id: 'submit', title: 'Submit bond application', completed: false },
        { id: 'docs', title: 'Provide required documents', completed: false },
        { id: 'approval', title: 'Bond approval received', completed: false }
      ]
    },
    {
      id: 'inspection',
      title: 'Property Inspection',
      description: 'Ensuring everything is in order',
      estimatedDays: '1-2 weeks',
      tasks: [
        { id: 'electrical', title: 'Electrical compliance certificate', completed: false },
        { id: 'plumbing', title: 'Plumbing inspection', completed: false },
        { id: 'general', title: 'General property inspection', completed: false }
      ]
    },
    {
      id: 'transfer',
      title: 'Transfer & Registration',
      description: 'Legal transfer process',
      estimatedDays: '8-12 weeks',
      tasks: [
        { id: 'attorney', title: 'Transfer attorney appointed', completed: false },
        { id: 'deeds', title: 'Deeds office registration', completed: false },
        { id: 'keys', title: 'Receive keys!', completed: false }
      ]
    }
  ]);

  const handleLogin = () => {
    if (password === 'agent2024') {
      setIsAgentMode(true);
      localStorage.setItem('isAgentLoggedIn', 'true');
      setShowPasswordInput(false);
      setPassword('');
    } else {
      alert('Incorrect password');
    }
  };

  const handleLogout = () => {
    setIsAgentMode(false);
    localStorage.setItem('isAgentLoggedIn', 'false');
  };

  const sendProgressNotification = (stepTitle, taskTitle, isCompleted) => {
    const agentPhone = '27823146558';
    const clientPhone = localStorage.getItem('clientPhone') || '';
    
    const status = isCompleted ? 'completed' : 'updated';
    const message = encodeURIComponent(
      `🏡 Buying Journey Update!\n\nStep: ${stepTitle}\nTask: ${taskTitle}\nStatus: ${status}\n\nYour agent will contact you with more details.`
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

  const toggleTask = (stepId, taskId) => {
    if (!isAgentMode) {
      alert('Agent login required to update progress');
      return;
    }
    
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
    
    // Send notifications after updating
    if (currentStep && currentTask) {
      sendProgressNotification(currentStep.title, currentTask.title, !currentTask.completed);
    }
  };

  const completedTasks = steps.reduce((acc, step) => 
    acc + step.tasks.filter(task => task.completed).length, 0
  );
  const totalTasks = steps.reduce((acc, step) => acc + step.tasks.length, 0);
  const progressPercentage = (completedTasks / totalTasks) * 100;

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {!isAgentMode && <AgentReminder />}
      
      <Card className="shadow-2xl border-0 bg-card">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-card-foreground">Your Buying Journey Progress</CardTitle>
              <CardDescription className="text-card-foreground/70">
                Track your home buying process step-by-step
              </CardDescription>
            </div>
            
            {!isAgentMode ? (
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => setShowPasswordInput(true)}
                className="border-primary/30"
              >
                <Lock className="h-4 w-4 mr-2" />
                Agent Login
              </Button>
            ) : (
              <Button 
                size="sm" 
                variant="outline" 
                onClick={handleLogout}
                className="border-primary/30"
              >
                Logout
              </Button>
            )}
          </div>

          {showPasswordInput && !isAgentMode && (
            <div className="flex gap-2">
              <Input
                type="password"
                placeholder="Enter agent password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                className="bg-input-background text-card-foreground"
              />
              <Button onClick={handleLogin} size="sm">Login</Button>
              <Button onClick={() => setShowPasswordInput(false)} size="sm" variant="outline">Cancel</Button>
            </div>
          )}

          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-card-foreground">Overall Progress</span>
              <span className="text-card-foreground">{completedTasks} of {totalTasks} tasks completed</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {steps.map((step, stepIndex) => {
            const stepCompleted = step.tasks.every(task => task.completed);
            const stepInProgress = step.tasks.some(task => task.completed) && !stepCompleted;
            const completedTaskCount = step.tasks.filter(task => task.completed).length;

            return (
              <Card key={step.id} className={`border-2 transition-all ${
                stepCompleted ? 'border-primary/50 bg-primary/5' : 
                stepInProgress ? 'border-primary/30 bg-card' : 
                'border-border bg-card'
              }`}>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      {stepCompleted ? (
                        <CheckCircle2 className="h-6 w-6 text-primary" />
                      ) : stepInProgress ? (
                        <Clock className="h-6 w-6 text-primary animate-pulse" />
                      ) : (
                        <Circle className="h-6 w-6 text-muted-foreground" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div>
                          <CardTitle className="text-lg text-card-foreground">{step.title}</CardTitle>
                          <CardDescription className="text-card-foreground/70">{step.description}</CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-primary/10 text-card-foreground border-primary/20">
                            {step.estimatedDays}
                          </Badge>
                          {stepCompleted && (
                            <Badge className="bg-primary text-primary-foreground">Completed</Badge>
                          )}
                        </div>
                      </div>

                      <div className="mt-4 space-y-3">
                        {step.tasks.map((task) => (
                          <div
                            key={task.id}
                            className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                              task.completed ? 'bg-primary/10' : 'bg-background'
                            } ${isAgentMode ? 'cursor-pointer hover:bg-primary/20' : ''}`}
                            onClick={() => isAgentMode && toggleTask(step.id, task.id)}
                          >
                            <Checkbox
                              checked={task.completed}
                              onCheckedChange={() => toggleTask(step.id, task.id)}
                              disabled={!isAgentMode}
                              className="flex-shrink-0"
                            />
                            <span className={`flex-1 text-sm ${
                              task.completed ? 'line-through text-card-foreground/60' : 'text-card-foreground'
                            }`}>
                              {task.title}
                            </span>
                            {task.completed && (
                              <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="mt-3 flex items-center gap-2 text-xs text-card-foreground/60">
                        <Progress 
                          value={(completedTaskCount / step.tasks.length) * 100} 
                          className="h-1 flex-1"
                        />
                        <span>{completedTaskCount}/{step.tasks.length}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
