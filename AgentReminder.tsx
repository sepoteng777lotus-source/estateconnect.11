import { useEffect, useState } from 'react';
import { Alert, AlertDescription } from './ui/alert';
import { Bell } from 'lucide-react';

interface AgentReminderProps {
  type: 'buying' | 'selling';
}

export function AgentReminder({ type }: AgentReminderProps) {
  const [isAgent, setIsAgent] = useState(false);

  useEffect(() => {
    // Check if user is logged in as agent
    const agentStatus = localStorage.getItem('isAgentLoggedIn');
    setIsAgent(agentStatus === 'true');

    // Set up weekly Monday reminder
    const checkAndNotify = () => {
      const today = new Date();
      const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday
      const lastNotification = localStorage.getItem(`lastAgentReminder_${type}`);
      const lastNotificationDate = lastNotification ? new Date(lastNotification) : null;

      // Check if it's Monday and we haven't sent a reminder this week
      if (dayOfWeek === 1 && agentStatus === 'true') {
        const weekInMs = 7 * 24 * 60 * 60 * 1000;
        if (!lastNotificationDate || (today.getTime() - lastNotificationDate.getTime()) > weekInMs) {
          // Send WhatsApp reminder
          sendWeeklyReminder();
          localStorage.setItem(`lastAgentReminder_${type}`, today.toISOString());
        }
      }
    };

    // Check immediately and then every hour
    checkAndNotify();
    const interval = setInterval(checkAndNotify, 60 * 60 * 1000); // Check every hour

    return () => clearInterval(interval);
  }, [type]);

  const sendWeeklyReminder = () => {
    // This would typically send to your WhatsApp
    const whatsappNumber = '27823146558';
    const message = encodeURIComponent(
      `🔔 Weekly Reminder: Please update the ${type} progress tracker for your clients. Log in with password: agent2024`
    );
    
    // Automatically open WhatsApp with the reminder (only on Mondays)
    if (typeof window !== 'undefined') {
      window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
    }
  };

  // Only show to logged in agents
  if (!isAgent) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto mb-6">
      <Alert className="bg-grey border-border">
        <Bell className="h-4 w-4 text-white" />
        <AlertDescription className="text-white text-sm ml-2">
          <strong>Agent Note:</strong> Remember to update the {type} progress for your clients regularly. 
          You will receive automated WhatsApp reminders every Monday.{' '}
          <code className="bg-black/30 px-2 py-1 rounded text-white">Password: agent2024</code>
        </AlertDescription>
      </Alert>
    </div>
  );
}
