import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = ({ onActionClick }) => {
  const quickActions = [
    {
      id: 'report-absence',
      label: 'Report Absence',
      icon: 'Calendar',
      color: 'bg-error/10 text-error',
      description: 'Notify school of absence'
    },
    {
      id: 'permission-slip',
      label: 'Permission Slip',
      icon: 'FileText',
      color: 'bg-warning/10 text-warning',
      description: 'Submit permission forms'
    },
    {
      id: 'schedule-meeting',
      label: 'Schedule Meeting',
      icon: 'Clock',
      color: 'bg-primary/10 text-primary',
      description: 'Meet with teachers'
    },
    {
      id: 'message-teacher',
      label: 'Message Teacher',
      icon: 'MessageSquare',
      color: 'bg-success/10 text-success',
      description: 'Direct communication'
    },
    {
      id: 'view-calendar',
      label: 'School Calendar',
      icon: 'Calendar',
      color: 'bg-secondary/10 text-secondary',
      description: 'View school events'
    },
    {
      id: 'payment-history',
      label: 'Payment History',
      icon: 'CreditCard',
      color: 'bg-primary/10 text-primary',
      description: 'View fee payments'
    }
  ];

  const handleActionClick = (actionId) => {
    if (onActionClick) {
      onActionClick(actionId);
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-card-foreground">Quick Actions</h3>
        <Icon name="Zap" size={20} className="text-primary" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        {quickActions?.map((action) => (
          <Button
            key={action?.id}
            variant="ghost"
            onClick={() => handleActionClick(action?.id)}
            className="h-auto p-3 flex flex-col items-center space-y-2 hover:bg-muted/50"
          >
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${action?.color}`}>
              <Icon name={action?.icon} size={20} />
            </div>
            <div className="text-center">
              <div className="text-sm font-medium text-card-foreground">
                {action?.label}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {action?.description}
              </div>
            </div>
          </Button>
        ))}
      </div>
      <div className="mt-4 pt-3 border-t border-border">
        <Button variant="outline" className="w-full">
          <Icon name="Settings" size={16} className="mr-2" />
          More Options
        </Button>
      </div>
    </div>
  );
};

export default QuickActions;