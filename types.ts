export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isPro: boolean;
  isOwner?: boolean;
  isAdmin?: boolean;
  subscription: SubscriptionPlan;
  points: number;
  streak: number;
  badges: Badge[];
  completedLessons: string[];
  joinDate: Date;
  dailyMessagesUsed: number;
  lastMessageDate: string;
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
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export type SubscriptionPlan = 'free' | 'basic' | 'pro';

export interface Video {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  thumbnail: string;
  views: number;
  points: number;
  duration: string;
  subject: string;
}

export interface LeaderboardUser {
  id: string;
  name: string;
  avatar: string;
  points: number;
  subscription: SubscriptionPlan;
  streak: number;
}
