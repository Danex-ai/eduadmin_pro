import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UpcomingDeadlines = ({ deadlines, onViewAssignment }) => {
  const getPriorityColor = (daysLeft) => {
    if (daysLeft < 0) return 'text-error';
    if (daysLeft <= 1) return 'text-error';
    if (daysLeft <= 3) return 'text-warning';
    return 'text-foreground';
  };

  const getPriorityBg = (daysLeft) => {
    if (daysLeft < 0) return 'bg-error/10 border-error/20';
    if (daysLeft <= 1) return 'bg-error/10 border-error/20';
    if (daysLeft <= 3) return 'bg-warning/10 border-warning/20';
    return 'bg-surface border-border';
  };

  const formatDeadline = (daysLeft) => {
    if (daysLeft < 0) return `${Math.abs(daysLeft)} days overdue`;
    if (daysLeft === 0) return 'Due today';
    if (daysLeft === 1) return 'Due tomorrow';
    return `${daysLeft} days left`;
  };

  const getSubjectIcon = (subject) => {
    const icons = {
      'Mathematics': 'Calculator',
      'English': 'BookOpen',
      'Science': 'Microscope',
      'History': 'Clock',
      'Geography': 'Globe',
      'Physics': 'Zap',
      'Chemistry': 'TestTube',
      'Biology': 'Leaf'
    };
    return icons?.[subject] || 'FileText';
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-elevation">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Upcoming Deadlines</h3>
        <Icon name="Clock" size={20} className="text-primary" />
      </div>
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {deadlines?.length > 0 ? (
          deadlines?.map((deadline, index) => (
            <div 
              key={index} 
              className={`p-4 rounded-lg border transition-smooth ${getPriorityBg(deadline?.daysLeft)}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon 
                      name={getSubjectIcon(deadline?.subject)} 
                      size={16} 
                      className="text-primary" 
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground mb-1 line-clamp-2">
                      {deadline?.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {deadline?.subject} • {deadline?.teacher}
                    </p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className={`text-sm font-medium ${getPriorityColor(deadline?.daysLeft)}`}>
                    {formatDeadline(deadline?.daysLeft)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {deadline?.dueDate}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <span>Type: {deadline?.type}</span>
                  <span>Points: {deadline?.points}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onViewAssignment(deadline?.id)}
                  iconName="Eye"
                  iconPosition="left"
                >
                  View
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <Icon name="CheckCircle" size={32} className="mx-auto text-success mb-2" />
            <p className="text-sm text-muted-foreground">All caught up!</p>
            <p className="text-xs text-muted-foreground">No upcoming deadlines</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingDeadlines;