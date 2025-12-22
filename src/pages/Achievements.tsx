import { useState, useEffect } from "react";
import SpaceBackground from "@/components/SpaceBackground";
import AchievementsHeader from "@/components/achievements/AchievementsHeader";
import AchievementsList from "@/components/achievements/AchievementsList";
import RewardModal from "@/components/achievements/RewardModal";

interface Achievement {
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

const Achievements = () => {
  const [selectedCategory, setSelectedCategory] = useState("Все");
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [currentReward, setCurrentReward] = useState<Achievement | null>(null);
  const [totalGems, setTotalGems] = useState(0);
  const [totalExp, setTotalExp] = useState(0);
  const [totalCoins, setTotalCoins] = useState(0);
  const [claimedCount, setClaimedCount] = useState(0);

  const initialAchievements: Achievement[] = [
    {
      id: 1,
      name: "Первая кровь",
      description: "Убей первого игрока",
      icon: "Sword",
      color: "red",
      unlocked: true,
      progress: 100,
      category: "PvP",
      reward: { gems: 5, exp: 50, coins: 100 },
      claimed: false
    },
    {
      id: 2,
      name: "Новичок",
      description: "Достигни 10 уровня",
      icon: "Star",
      color: "yellow",
      unlocked: true,
      progress: 100,
      category: "Прогресс",
      reward: { gems: 10, exp: 100, coins: 250 },
      claimed: false
    },
    {
      id: 3,
      name: "Командный игрок",
      description: "Вступи в гильдию",
      icon: "Users",
      color: "blue",
      unlocked: true,
      progress: 100,
      category: "Социальное",
      reward: { gems: 8, exp: 75, coins: 150 },
      claimed: false
    },
    {
      id: 4,
      name: "Ветеран",
      description: "Достигни 50 уровня",
      icon: "Award",
      color: "purple",
      unlocked: false,
      progress: 45,
      category: "Прогресс",
      reward: { gems: 25, exp: 250, coins: 500 },
      claimed: false
    },
    {
      id: 5,
      name: "Убийца",
      description: "Убей 100 игроков",
      icon: "Skull",
      color: "red",
      unlocked: false,
      progress: 67,
      category: "PvP",
      reward: { gems: 15, exp: 150, coins: 300 },
      claimed: false
    },
    {
      id: 6,
      name: "Торговец",
      description: "Заработай 10000 монет",
      icon: "Coins",
      color: "yellow",
      unlocked: true,
      progress: 100,
      category: "Экономика",
      reward: { gems: 20, exp: 200, coins: 1000 },
      claimed: false
    },
    {
      id: 7,
      name: "Исследователь",
      description: "Посети все локации",
      icon: "Map",
      color: "green",
      unlocked: false,
      progress: 80,
      category: "Исследование",
      reward: { gems: 18, exp: 180, coins: 400 },
      claimed: false
    },
    {
      id: 8,
      name: "Квестовый мастер",
      description: "Выполни 100 квестов",
      icon: "CheckCircle",
      color: "blue",
      unlocked: false,
      progress: 92,
      category: "Квесты",
      reward: { gems: 30, exp: 300, coins: 600 },
      claimed: false
    },
    {
      id: 9,
      name: "Миллионер",
      description: "Заработай 1000000 монет",
      icon: "DollarSign",
      color: "yellow",
      unlocked: false,
      progress: 34,
      category: "Экономика",
      reward: { gems: 100, exp: 500, coins: 5000 },
      claimed: false
    },
    {
      id: 10,
      name: "Легенда",
      description: "Достигни 100 уровня",
      icon: "Crown",
      color: "purple",
      unlocked: false,
      progress: 15,
      category: "Прогресс",
      reward: { gems: 200, exp: 1000, coins: 10000 },
      claimed: false
    },
    {
      id: 11,
      name: "Неуязвимый",
      description: "Убей 10 игроков подряд без смерти",
      icon: "Shield",
      color: "blue",
      unlocked: false,
      progress: 60,
      category: "PvP",
      reward: { gems: 22, exp: 220, coins: 450 },
      claimed: false
    },
    {
      id: 12,
      name: "Коллекционер",
      description: "Собери все редкие предметы",
      icon: "Package",
      color: "purple",
      unlocked: false,
      progress: 55,
      category: "Коллекции",
      reward: { gems: 40, exp: 400, coins: 800 },
      claimed: false
    },
    {
      id: 13,
      name: "Друг народа",
      description: "Пригласи 10 друзей",
      icon: "Heart",
      color: "red",
      unlocked: true,
      progress: 100,
      category: "Социальное",
      reward: { gems: 12, exp: 120, coins: 200 },
      claimed: false
    },
    {
      id: 14,
      name: "Строитель",
      description: "Построй 50 зданий",
      icon: "Home",
      color: "green",
      unlocked: false,
      progress: 72,
      category: "Строительство",
      reward: { gems: 28, exp: 280, coins: 550 },
      claimed: false
    },
    {
      id: 15,
      name: "Мастер крафта",
      description: "Создай 500 предметов",
      icon: "Wrench",
      color: "yellow",
      unlocked: false,
      progress: 88,
      category: "Крафт",
      reward: { gems: 35, exp: 350, coins: 700 },
      claimed: false
    }
  ];

  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    const saved = localStorage.getItem('achievements');
    return saved ? JSON.parse(saved) : initialAchievements;
  });

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

  const claimReward = (achievement: Achievement) => {
    if (!achievement.unlocked || achievement.claimed) return;
    
    setCurrentReward(achievement);
    setShowRewardModal(true);
    
    setAchievements(prev => 
      prev.map(a => 
        a.id === achievement.id ? { ...a, claimed: true } : a
      )
    );
  };

  const getColorClasses = (color: string, unlocked: boolean, claimed: boolean) => {
    if (!unlocked) return 'bg-gray-500/20 border-gray-500/30 text-gray-500';
    if (claimed) return 'bg-green-500/20 border-green-500/50 text-green-400';
    
    const colors: Record<string, string> = {
      red: 'bg-red-500/30 border-red-400 text-red-300 shadow-red-500/50',
      yellow: 'bg-yellow-500/30 border-yellow-400 text-yellow-300 shadow-yellow-500/50',
      blue: 'bg-blue-500/30 border-blue-400 text-blue-300 shadow-blue-500/50',
      purple: 'bg-purple-500/30 border-purple-400 text-purple-300 shadow-purple-500/50',
      green: 'bg-green-500/30 border-green-400 text-green-300 shadow-green-500/50',
    };
    
    return colors[color] || 'bg-primary/30 border-primary text-primary shadow-primary/50';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700/40 via-pink-600/20 to-purple-900/30 animate-gradient relative">
      <SpaceBackground />

      <AchievementsHeader
        unlockedCount={unlockedCount}
        totalCount={totalCount}
        claimedCount={claimedCount}
        totalGems={totalGems}
        totalExp={totalExp}
        totalCoins={totalCoins}
      />

      <AchievementsList
        achievements={achievements}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        onClaimReward={claimReward}
        getColorClasses={getColorClasses}
      />

      <RewardModal
        show={showRewardModal}
        reward={currentReward}
        onClose={() => setShowRewardModal(false)}
      />
    </div>
  );
};

export default Achievements;
