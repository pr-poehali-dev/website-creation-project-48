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

  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements);

  useEffect(() => {
    const nickname = localStorage.getItem('minecraft_nickname');
    const isLocked = localStorage.getItem('minecraft_nickname_locked');
    
    if (nickname && isLocked === 'true') {
      setPlayerNickname(nickname);
      loadServerAchievements(nickname);
    } else {
      setAchievements(initialAchievements);
    }
  }, []);

  const loadServerAchievements = async (nickname: string) => {
    try {
      const serverData = await achievementsApi.getPlayerAchievements(nickname);
      const merged = achievementsApi.mergeAchievements(initialAchievements, serverData);
      setAchievements(merged);
    } catch (error) {
      console.error('Failed to load server achievements:', error);
      setAchievements(initialAchievements);
    }
  };

  useEffect(() => {
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
    if (!achievement.unlocked || achievement.claimed || !playerNickname) return;
    
    setCurrentReward(achievement);
    setShowRewardModal(true);
    
    setAchievements(prev => 
      prev.map(a => 
        a.id === achievement.id ? { ...a, claimed: true } : a
      )
    );

    try {
      await achievementsApi.claimAchievement(playerNickname, achievement.id);
    } catch (error) {
      console.error('Failed to sync claim to server:', error);
      setAchievements(prev => 
        prev.map(a => 
          a.id === achievement.id ? { ...a, claimed: false } : a
        )
      );
    }
  };

  const handleNicknameSet = async (nickname: string) => {
    const isLocked = localStorage.getItem('minecraft_nickname_locked');
    
    if (isLocked === 'true' && playerNickname && playerNickname !== nickname) {
      console.error('Nickname already locked');
      return;
    }
    
    setPlayerNickname(nickname);
    await loadServerAchievements(nickname);
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