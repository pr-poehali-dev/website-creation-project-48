import SpaceBackground from "@/components/SpaceBackground";
import AchievementsHeader from "@/components/achievements/AchievementsHeader";
import AchievementsList from "@/components/achievements/AchievementsList";
import RewardModal from "@/components/achievements/RewardModal";
import { useAchievements } from "@/hooks/useAchievements";
import { getColorClasses } from "@/utils/achievementHelpers";

const Achievements = () => {
  const {
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
  } = useAchievements();

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
        onNicknameSet={handleNicknameSet}
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