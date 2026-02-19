
export enum Difficulty {
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard',
}

export interface Problem {
  id: string;
  title: string;
  difficulty: Difficulty;
  description: string;
  starterCode: string;
  videoSolutionUrl?: string; // Placeholder URL
  acceptanceRate: number;
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  videoLectureUrl: string; // Placeholder for thumbnail
  problems: Problem[];
  progress: number; // 0-100
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface HistoryItem {
  id: string;
  action: 'Solved' | 'Watched';
  title: string;
  date: string;
  type: 'problem' | 'video';
  meta?: string; // e.g. "Medium", "1h 20m"
}

export interface UserStats {
  rank: number;
  problemsSolved: number;
  streak: number;
  skillDistribution: {
    subject: string;
    A: number; // Score
    fullMark: number;
  }[];
  activityData: {
    day: string;
    solved: number;
  }[];
  history: HistoryItem[];
  topicTimeDistribution: {
    topic: string;
    time: number; // hours
  }[];
}

export interface CommunityPost {
  id: string;
  author: string;
  avatar: string;
  title: string;
  content: string;
  likes: number;
  comments: number;
  tags: string[];
  timeAgo: string;
  projectImage?: string;
}

export type ViewState = 'HOME' | 'PROFILE' | 'DASHBOARD' | 'CURRICULUM' | 'SOLVE' | 'COMMUNITY' | 'FAANG' | 'ABOUT';