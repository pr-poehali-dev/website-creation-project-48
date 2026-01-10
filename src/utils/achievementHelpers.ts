export const getColorClasses = (color: string, unlocked: boolean, claimed: boolean): string => {
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
