import React from 'react';
import Icon from '../../../components/AppIcon';

const AchievementBadge = ({ achievement, size = 'default' }) => {
  const sizeClasses = {
    small: 'w-12 h-12',
    default: 'w-16 h-16',
    large: 'w-20 h-20'
  };

  const iconSizes = {
    small: 16,
    default: 20,
    large: 24
  };

  const getAchievementColor = (type) => {
    switch (type) {
      case 'gold':
        return 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white';
      case 'silver':
        return 'bg-gradient-to-br from-gray-300 to-gray-500 text-white';
      case 'bronze':
        return 'bg-gradient-to-br from-orange-400 to-orange-600 text-white';
      case 'platinum':
        return 'bg-gradient-to-br from-purple-400 to-purple-600 text-white';
      default:
        return 'bg-gradient-to-br from-primary to-primary/80 text-primary-foreground';
    }
  };

  const getAchievementIcon = (category) => {
    const icons = {
      'academic': 'Award',
      'participation': 'Users',
      'completion': 'CheckCircle',
      'streak': 'Zap',
      'improvement': 'TrendingUp',
      'leadership': 'Crown',
      'creativity': 'Lightbulb',
      'collaboration': 'Handshake'
    };
    return icons?.[category] || 'Star';
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <div className={`${sizeClasses?.[size]} rounded-full flex items-center justify-center shadow-elevation-lg ${getAchievementColor(achievement?.type)} relative`}>
        <Icon 
          name={getAchievementIcon(achievement?.category)} 
          size={iconSizes?.[size]} 
        />
        {achievement?.isNew && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-success rounded-full flex items-center justify-center">
            <Icon name="Sparkles" size={10} className="text-white" />
          </div>
        )}
      </div>
      <div className="text-center">
        <p className={`font-medium text-foreground ${
          size === 'small' ? 'text-xs' : size === 'large' ? 'text-base' : 'text-sm'
        }`}>
          {achievement?.title}
        </p>
        <p className={`text-muted-foreground ${
          size === 'small' ? 'text-xs' : 'text-xs'
        }`}>
          {achievement?.description}
        </p>
        {achievement?.earnedDate && (
          <p className="text-xs text-muted-foreground mt-1">
            Earned {achievement?.earnedDate}
          </p>
        )}
      </div>
    </div>
  );
};

export default AchievementBadge;