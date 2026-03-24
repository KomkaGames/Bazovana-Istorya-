export interface User {
  id: string;
  name: string;
  email: string;
  isPro: boolean;
  points: number;
  streak: number;
  badges: Badge[];
  completedLessons: string[];
  joinDate: Date;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  earned: boolean;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface VideoLesson {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  subject: string;
  duration: string;
  points: number;
  thumbnail: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  features: string[];
  highlighted: boolean;
  color: string;
}
