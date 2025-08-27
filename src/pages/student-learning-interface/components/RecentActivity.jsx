import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentActivity = ({ activities }) => {
  const getActivityIcon = (type) => {
    const icons = {
      'assignment_submitted': 'Upload',
      'grade_received': 'Award',
      'lesson_completed': 'CheckCircle',
      'quiz_taken': 'FileText',
      'announcement': 'Bell',
      'message_received': 'MessageSquare',
      'achievement_earned': 'Star',
      'class_attended': 'Users'
    };
    return icons?.[type] || 'Activity';
  };

  const getActivityColor = (type) => {
    const colors = {
      'assignment_submitted': 'text-primary',
      'grade_received': 'text-success',
      'lesson_completed': 'text-success',
      'quiz_taken': 'text-warning',
      'announcement': 'text-primary',
      'message_received': 'text-secondary',
      'achievement_earned': 'text-warning',
      'class_attended': 'text-primary'
    };
    return colors?.[type] || 'text-muted-foreground';
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-elevation">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
        <Icon name="Activity" size={20} className="text-primary" />
      </div>
      <div className="space-y-4 max-h-80 overflow-y-auto">
        {activities?.length > 0 ? (
          activities?.map((activity, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-smooth">
              <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0 ${getActivityColor(activity?.type)}`}>
                <Icon 
                  name={getActivityIcon(activity?.type)} 
                  size={16} 
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground mb-1">
                  {activity?.title}
                </p>
                <p className="text-xs text-muted-foreground mb-1">
                  {activity?.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {activity?.subject}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatTimeAgo(activity?.timestamp)}
                  </span>
                </div>
              </div>
              {activity?.isNew && (
                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2"></div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <Icon name="Activity" size={32} className="mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">No recent activity</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentActivity;