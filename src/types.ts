export interface User {
  id: string;
  email: string;
  createdAt: Date;
}

export interface DecisionOption {
  id: string;
  name: string;
  pros: string[];
  cons: string[];
}

export interface Decision {
  id: string;
  userId: string;
  title: string;
  context?: string;
  confidence: number; // 1-5
  options: DecisionOption[];
  chosenOptionId?: string;
  outcome?: 'good' | 'neutral' | 'bad';
  reflection?: string;
  createdAt: Date;
  lockedAt?: Date;
  completedAt?: Date;
}