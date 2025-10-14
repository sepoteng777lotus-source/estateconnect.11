# Progress Tracker Notification System

## How It Works

When you update any task in the Buying or Selling Progress Trackers, both you (the agent) and your client receive WhatsApp notifications automatically.

## Setup Required

### For Clients to Receive Notifications:

1. **Client must fill out the contact form first**
   - When a client submits the contact form, their phone number is automatically saved
   - This phone number is stored in their browser's local storage
   - The system will use this number to send them progress updates

2. **Phone Number Format:**
   - The system automatically converts any phone number to international format
   - Examples that work:
     - `0823146558` → converts to `27823146558`
     - `823146558` → converts to `27823146558`
     - `27823146558` → stays as is

## What Happens When You Update Progress

### As the Agent:

1. **Log in to the Progress Tracker:**
   - Password: `agent2024`
   - This unlocks editing capabilities

2. **Check/Uncheck a Task:**
   - Click any checkbox to mark a task as complete or incomplete
   - Two WhatsApp notifications open automatically:

### Notification 1 - To You (Agent):
```
Agent Update: Task "Transfer attorney appointed" in "Transfer & Registration" was marked as completed
```

### Notification 2 - To Client:
```
🏡 Buying Journey Update!

Step: Transfer & Registration
Task: Transfer attorney appointed
Status: completed

Your agent will contact you with more details.
```

## Important Notes

### Timing:
- Agent notification opens immediately
- Client notification opens 1 second later
- This prevents both windows from opening at exactly the same time

### Client Must Submit Form First:
- If a client hasn't filled out the contact form, they won't receive notifications
- Only the agent notification will be sent
- Encourage new clients to fill out the contact form to enable notifications

### Weekly Agent Reminders:
- Every Monday, you receive an automated WhatsApp reminder
- Reminds you to update progress for your clients
- Only appears when you're logged in as agent
- Includes the agent password for quick access

## Testing the System

### Test as Agent:

1. Fill out the contact form with your own phone number
2. Log in to either progress tracker (password: agent2024)
3. Check any task
4. You should see two WhatsApp windows open:
   - One to yourself as agent
   - One to yourself as client (since you used your number)

### What to Tell Clients:

> "To receive automatic updates about your property journey, please fill out our contact form. You'll get WhatsApp notifications every time I update your progress!"

## Customization Options

### To Change Agent Phone Number:
In both `BuyingProgressTracker.tsx` and `SellingProgressTracker.tsx`, find:
```javascript
const agentPhone = '27823146558';
```
Change to your preferred number in international format.

### To Change Notification Messages:
Edit the `sendProgressNotification` function in:
- `/components/BuyingProgressTracker.tsx`
- `/components/SellingProgressTracker.tsx`

### To Disable Client Notifications:
Comment out or remove this section:
```javascript
// Send notification to client if phone number is available
if (clientPhone) {
  setTimeout(() => {
    window.open(`https://wa.me/${clientPhone}?text=${message}`, '_blank');
  }, 1000);
}
```

## Privacy & Data Storage

- Phone numbers are stored only in the browser's localStorage
- No data is sent to external servers
- Each client only sees their own stored phone number
- Clearing browser data removes all stored information

## Troubleshooting

### Client Not Receiving Notifications:

1. **Check if they filled out the contact form**
   - Their phone number must be saved first

2. **Verify phone number format**
   - Must be a valid South African number
   - System auto-converts to international format

3. **Check browser localStorage**
   - Open browser console (F12)
   - Go to Application → Local Storage
   - Look for `clientPhone` key

### Multiple Clients:

- Each client's browser stores only their own phone number
- Use separate browsers or incognito mode to test multiple clients
- In production, each client will only receive their own notifications

## Best Practices

1. **Ask clients to fill the form immediately** when they first contact you
2. **Update progress regularly** - clients love seeing progress
3. **Use descriptive task updates** - the exact task title appears in notifications
4. **Check weekly reminders** - they help you stay on top of updates
5. **Test the system** with your own number before using with clients

## Future Enhancements (Optional)

To add:
- Email notifications alongside WhatsApp
- SMS notifications for clients without WhatsApp
- Push notifications for mobile apps
- Client portal for viewing progress history
- Automated notifications when new properties match criteria

---

**Current Setup:**
- ✅ Agent notifications: Working
- ✅ Client notifications: Working (after form submission)
- ✅ Weekly reminders: Working (Mondays)
- ✅ Automatic phone formatting: Working
- ✅ Browser storage: Working
