import { getAllFeedback } from '@/lib/feedback-store';
import FeedbackClient from './FeedbackClient';

export default function AdminFeedbackPage() {
  const feedbackList = getAllFeedback();
  return <FeedbackClient initialFeedback={feedbackList} />;
}
