import React from 'react';
import Icon from '../../../components/AppIcon';


const QuickActions = ({ onAction }) => {
  const actions = [
    {
      id: 'join-class',
      label: 'Join Live Class',
      icon: 'Video',
      color: 'bg-success text-success-foreground',
      description: 'Join ongoing virtual classroom'
    },
    {
      id: 'submit-assignment',
      label: 'Submit Work',
      icon: 'Upload',
      color: 'bg-primary text-primary-foreground',
      description: 'Upload completed assignments'
    },
    {
      id: 'study-materials',
      label: 'Study Materials',
      icon: 'BookOpen',
      color: 'bg-secondary text-secondary-foreground',
      description: 'Access learning resources'
    },
    {
      id: 'ask-help',
      label: 'Ask for Help',
      icon: 'HelpCircle',
      color: 'bg-warning text-warning-foreground',
      description: 'Get assistance from teachers'
    }
  ];

  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-elevation">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
        <Icon name="Zap" size={20} className="text-primary" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        {actions?.map((action) => (
          <button
            key={action?.id}
            onClick={() => onAction(action?.id)}
            className="group p-4 rounded-lg border border-border hover:border-primary/50 transition-smooth text-left"
          >
            <div className={`w-12 h-12 rounded-lg ${action?.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
              <Icon name={action?.icon} size={20} />
            </div>
            <h4 className="font-medium text-foreground mb-1 group-hover:text-primary transition-colors">
              {action?.label}
            </h4>
            <p className="text-xs text-muted-foreground">
              {action?.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;