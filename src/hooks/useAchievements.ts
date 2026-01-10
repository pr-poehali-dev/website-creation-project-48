import { useState, useEffect } from "react";
import { Achievement } from "@/types/Achievement";
import { initialAchievements } from "@/data/achievementsData";
import { achievementsApi } from "@/services/achievementsApi";

export const useAchievements = () => {
  const [selectedCategory, setSelectedCategory] = useState("Все");
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [currentReward, setCurrentReward] = useState<Achievement | null>(null);
  const [totalGems, setTotalGems] = useState(0);
  const [totalExp, setTotalExp] = useState(0);
  const [totalCoins, setTotalCoins] = useState(0);
  const [claimedCount, setClaimedCount] = useState(0);
  const [playerNickname, setPlayerNickname] = useState<string | null>(null);

  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    const saved = localStorage.getItem('achievements');
    return saved ? JSON.parse(saved) : initialAchievements;
  });

  useEffect(() => {
    const nickname = localStorage.getItem('minecraft_nickname');
    if (nickname) {
      setPlayerNickname(nickname);
      loadServerAchievements(nickname);
    }
  }, []);

  const loadServerAchievements = async (nickname: string) => {
    try {
      const serverData = await achievementsApi.getPlayerAchievements(nickname);
      const merged = achievementsApi.mergeAchievements(initialAchievements, serverData);
      setAchievements(merged);
      localStorage.setItem('achievements', JSON.stringify(merged));
    } catch (error) {
      console.error('Failed to load server achievements:', error);
    }
  };

  useEffect(() => {
    localStorage.setItem('achievements', JSON.stringify(achievements));
    
    const claimed = achievements.filter(a => a.claimed).length;
    setClaimedCount(claimed);
    
    const gems = achievements.filter(a => a.claimed).reduce((sum, a) => sum + a.reward.gems, 0);
    const exp = achievements.filter(a => a.claimed).reduce((sum, a) => sum + a.reward.exp, 0);
    const coins = achievements.filter(a => a.claimed).reduce((sum, a) => sum + (a.reward.coins || 0), 0);
    
    setTotalGems(gems);
    setTotalExp(exp);
    setTotalCoins(coins);
  }, [achievements]);

  const categories = ["Все", "PvP", "Прогресс", "Социальное", "Экономика", "Квесты", "Исследование", "Коллекции", "Строительство", "Крафт"];
  
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;

  const claimReward = async (achievement: Achievement) => {
    if (!achievement.unlocked || achievement.claimed) return;
    
    setCurrentReward(achievement);
    setShowRewardModal(true);
    
    setAchievements(prev => 
      prev.map(a => 
        a.id === achievement.id ? { ...a, claimed: true } : a
      )
    );

    if (playerNickname) {
      try {
        await achievementsApi.claimAchievement(playerNickname, achievement.id);
      } catch (error) {
        console.error('Failed to sync claim to server:', error);
      }
    }
  };

  const handleNicknameSet = (nickname: string) => {
    setPlayerNickname(nickname);
    loadServerAchievements(nickname);
  };

  return {
    achievements,
    selectedCategory,
    setSelectedCategory,
    showRewardModal,
    setShowRewardModal,
    currentReward,
    totalGems,
    totalExp,
    totalCoins,
    claimedCount,
    categories,
    unlockedCount,
    totalCount,
    claimReward,
    handleNicknameSet
  };
};