import Icon from './ui/icon';

interface PullToRefreshIndicatorProps {
  pullDistance: number;
  threshold: number;
  isRefreshing: boolean;
}

const PullToRefreshIndicator = ({ pullDistance, threshold, isRefreshing }: PullToRefreshIndicatorProps) => {
  const progress = Math.min((pullDistance / threshold) * 100, 100);
  const scale = Math.min(pullDistance / threshold, 1);

  if (pullDistance === 0 && !isRefreshing) return null;

  return (
    <div 
      className="fixed top-0 left-0 right-0 flex justify-center z-50 pointer-events-none"
      style={{ 
        transform: `translateY(${Math.min(pullDistance - 40, 40)}px)`,
        transition: pullDistance === 0 ? 'transform 0.3s ease' : 'none'
      }}
    >
      <div 
        className="bg-card/90 backdrop-blur-lg rounded-full p-3 shadow-lg border border-primary/30"
        style={{ 
          transform: `scale(${scale})`,
          opacity: scale
        }}
      >
        {isRefreshing ? (
          <Icon 
            name="RefreshCw" 
            size={24} 
            className="text-primary animate-spin" 
          />
        ) : (
          <div className="relative">
            <Icon 
              name="ArrowDown" 
              size={24} 
              className="text-primary transition-transform"
              style={{
                transform: progress >= 100 ? 'rotate(180deg)' : 'rotate(0deg)'
              }}
            />
            <svg 
              className="absolute inset-0" 
              viewBox="0 0 24 24"
              style={{ width: 24, height: 24 }}
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-primary/30"
              />
              <circle
                cx="12"
                cy="12"
                r="10"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray={`${progress * 0.628} 62.8`}
                strokeLinecap="round"
                className="text-primary transition-all"
                style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default PullToRefreshIndicator;
