import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionsPanel = ({ onActionClick }) => {
  const quickActions = [
    {
      id: 'approve-schools',
      title: 'Approve Schools',
      description: 'Review pending school registrations',
      icon: 'Building',
      color: 'primary',
      count: 12
    },
    {
      id: 'manage-users',
      title: 'User Management',
      description: 'Add or modify user accounts',
      icon: 'Users',
      color: 'secondary',
      count: null
    },
    {
      id: 'generate-reports',
      title: 'Generate Reports',
      description: 'Create system analytics reports',
      icon: 'FileText',
      color: 'success',
      count: null
    },
    {
      id: 'system-settings',
      title: 'System Settings',
      description: 'Configure platform parameters',
      icon: 'Settings',
      color: 'warning',
      count: null
    },
    {
      id: 'backup-data',
      title: 'Backup Data',
      description: 'Perform system backup',
      icon: 'Database',
      color: 'error',
      count: null
    },
    {
      id: 'broadcast-news',
      title: 'Broadcast News',
      description: 'Send system-wide announcements',
      icon: 'Megaphone',
      color: 'primary',
      count: null
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      primary: 'bg-primary/10 text-primary hover:bg-primary/20',
      secondary: 'bg-secondary/10 text-secondary hover:bg-secondary/20',
      success: 'bg-success/10 text-success hover:bg-success/20',
      warning: 'bg-warning/10 text-warning hover:bg-warning/20',
      error: 'bg-error/10 text-error hover:bg-error/20'
    };
    return colors?.[color] || colors?.primary;
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation">
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-card-foreground flex items-center">
          <Icon name="Zap" size={20} className="mr-2 text-primary" />
          Quick Actions
        </h3>
      </div>
      <div className="p-4">
        <div className="space-y-3">
          {quickActions?.map((action) => (
            <button
              key={action?.id}
              onClick={() => onActionClick && onActionClick(action?.id)}
              className="w-full p-3 rounded-lg border border-border hover:border-primary/50 transition-smooth text-left group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-smooth ${getColorClasses(action?.color)}`}>
                    <Icon name={action?.icon} size={20} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-card-foreground group-hover:text-primary transition-smooth">
                      {action?.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {action?.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {action?.count && (
                    <span className="bg-error text-error-foreground text-xs px-2 py-1 rounded-full">
                      {action?.count}
                    </span>
                  )}
                  <Icon name="ChevronRight" size={16} className="text-muted-foreground group-hover:text-primary transition-smooth" />
                </div>
              </div>
            </button>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-border">
          <Button variant="outline" className="w-full">
            <Icon name="Plus" size={16} className="mr-2" />
            More Actions
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActionsPanel;