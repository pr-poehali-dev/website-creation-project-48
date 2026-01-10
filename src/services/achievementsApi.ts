import { Achievement } from "@/types/Achievement";

const API_URL = "https://functions.poehali.dev/20aa0766-e878-400c-bcd0-ac7b60321b95";

export interface PlayerAchievementData {
  achievement_id: number;
  unlocked: boolean;
  progress: number;
  claimed: boolean;
  unlocked_at: string | null;
  claimed_at: string | null;
}

export const achievementsApi = {
  async getPlayerAchievements(nickname: string): Promise<PlayerAchievementData[]> {
    const response = await fetch(`${API_URL}?nickname=${encodeURIComponent(nickname)}`);
    if (!response.ok) throw new Error('Failed to fetch achievements');
    const data = await response.json();
    return data.achievements || [];
  },

  async updateAchievement(nickname: string, achievementId: number, unlocked: boolean, progress: number): Promise<void> {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nickname,
        achievement_id: achievementId,
        unlocked,
        progress
      })
    });
    if (!response.ok) throw new Error('Failed to update achievement');
  },

  async claimAchievement(nickname: string, achievementId: number): Promise<void> {
    const response = await fetch(API_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nickname,
        achievement_id: achievementId,
        claimed: true
      })
    });
    if (!response.ok) throw new Error('Failed to claim achievement');
  },

  mergeAchievements(localAchievements: Achievement[], serverData: PlayerAchievementData[]): Achievement[] {
    const serverMap = new Map(serverData.map(a => [a.achievement_id, a]));
    
    return localAchievements.map(achievement => {
      const serverAch = serverMap.get(achievement.id);
      if (serverAch) {
        return {
          ...achievement,
          unlocked: serverAch.unlocked,
          progress: serverAch.progress,
          claimed: serverAch.claimed
        };
      }
      return achievement;
    });
  }
};
