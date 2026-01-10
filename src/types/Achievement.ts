export interface Achievement {
  id: number;
  name: string;
  description: string;
  icon: string;
  color: string;
  unlocked: boolean;
  progress: number;
  category: string;
  reward: { gems: number; exp: number; coins?: number };
  claimed: boolean;
}
