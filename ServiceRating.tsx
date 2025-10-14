import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Star, Send, ThumbsUp } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function ServiceRating() {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    const whatsappNumber = '27823146558';
    const message = encodeURIComponent(
      `Service Rating Feedback:\n\nRating: ${rating}/5 stars\n\nFeedback:\n${feedback || 'No additional feedback provided'}`
    );
    
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
    setSubmitted(true);
    toast.success('Thank you for your feedback!');
  };

  if (submitted) {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <Card className="bg-card border-border text-center">
          <CardContent className="pt-12 pb-12">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-green-900/30 rounded-full border-2 border-green-400">
                <ThumbsUp className="h-12 w-12 text-green-400" />
              </div>
            </div>
            <h3 className="text-white mb-3">Thank You for Your Feedback!</h3>
            <p className="text-muted-foreground mb-6">
              Your feedback helps me provide better service to all my clients.
            </p>
            <Button 
              onClick={() => setSubmitted(false)}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              Submit Another Review
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-card rounded-lg">
            <Star className="h-8 w-8 text-white" />
          </div>
        </div>
        <h2 className="text-white">Rate My Service</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Your feedback is valuable and helps me improve my service
        </p>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-white">How was your experience?</CardTitle>
          <CardDescription className="text-muted-foreground">
            Please rate your overall experience working with me
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Star Rating */}
          <div className="flex flex-col items-center space-y-4">
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform hover:scale-110 focus:outline-none"
                >
                  <Star
                    className={`h-12 w-12 ${
                      star <= (hoveredRating || rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-white/30'
                    } transition-colors`}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-white">
                {rating === 5 && 'Excellent!'}
                {rating === 4 && 'Great!'}
                {rating === 3 && 'Good'}
                {rating === 2 && 'Fair'}
                {rating === 1 && 'Needs Improvement'}
              </p>
            )}
          </div>

          {/* Feedback Text */}
          <div className="space-y-2">
            <label className="text-sm text-white">
              Additional Feedback (Optional)
            </label>
            <Textarea
              placeholder="Share your experience, what went well, or how I could improve..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="min-h-32 bg-background border-border text-white placeholder:text-muted-foreground resize-none"
            />
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            disabled={rating === 0}
            className="w-full bg-primary hover:bg-primary/80 text-white disabled:opacity-50"
          >
            <Send className="mr-2 h-4 w-4" />
            Submit Feedback via WhatsApp
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            Your feedback will be sent to me via WhatsApp. Thank you for taking the time to share your experience!
          </p>
        </CardContent>
      </Card>

      {/* Why Feedback Matters */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-white">Why Your Feedback Matters</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-white mt-1">•</span>
              <span>Helps me understand what I'm doing well</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-white mt-1">•</span>
              <span>Identifies areas where I can improve</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-white mt-1">•</span>
              <span>Enables me to provide better service to future clients</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-white mt-1">•</span>
              <span>Builds trust with potential clients through honest reviews</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
