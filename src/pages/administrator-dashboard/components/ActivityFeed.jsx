import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityFeed = ({ activities = [] }) => {
  const getActivityIcon = (type) => {
    const icons = {
      registration: 'UserPlus',
      approval: 'CheckCircle',
      update: 'Edit',
      alert: 'AlertTriangle',
      system: 'Settings',
      report: 'FileText'
    };
    return icons?.[type] || 'Bell';
  };

  const getActivityColor = (type) => {
    const colors = {
      registration: 'text-primary',
      approval: 'text-success',
      update: 'text-warning',
      alert: 'text-error',
      system: 'text-muted-foreground',
      report: 'text-secondary'
    };
    return colors?.[type] || 'text-muted-foreground';
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation">
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-card-foreground flex items-center">
          <Icon name="Activity" size={20} className="mr-2 text-primary" />
          Recent Activities
        </h3>
      </div>
      <div className="p-4">
        <div className="space-y-4 max-h-80 overflow-y-auto">
          {activities?.length > 0 ? (
            activities?.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-smooth">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-muted ${getActivityColor(activity?.type)}`}>
                  <Icon name={getActivityIcon(activity?.type)} size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-card-foreground">
                    {activity?.title}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {activity?.description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {formatTime(activity?.timestamp)}
                  </p>
                </div>
                {activity?.priority === 'high' && (
                  <div className="w-2 h-2 bg-error rounded-full flex-shrink-0 mt-2" />
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <Icon name="Activity" size={32} className="mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">No recent activities</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityFeed;