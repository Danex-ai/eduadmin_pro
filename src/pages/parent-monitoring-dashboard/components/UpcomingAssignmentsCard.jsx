import React from 'react';
import Icon from '../../../components/AppIcon';

const UpcomingAssignmentsCard = ({ assignments = [] }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-error';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-success';
      default:
        return 'text-muted-foreground';
    }
  };

  const getPriorityBadgeColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-error/10 text-error';
      case 'medium':
        return 'bg-warning/10 text-warning';
      case 'low':
        return 'bg-success/10 text-success';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Overdue';
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    return `${diffDays} days left`;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-card-foreground">Upcoming Assignments</h3>
        <Icon name="Clock" size={20} className="text-primary" />
      </div>
      <div className="space-y-3">
        {assignments?.length > 0 ? (
          assignments?.slice(0, 4)?.map((assignment, index) => (
            <div key={index} className="flex items-start justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="FileText" size={16} className="text-primary" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-card-foreground">{assignment?.title}</div>
                  <div className="text-sm text-muted-foreground">{assignment?.subject}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Due: {assignment?.dueDate}
                  </div>
                  <div className={`text-xs mt-1 px-2 py-1 rounded-full inline-block ${getPriorityBadgeColor(assignment?.priority)}`}>
                    {assignment?.priority} priority
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-sm font-medium ${
                  getDaysUntilDue(assignment?.dueDate)?.includes('Overdue') ? 'text-error' :
                  getDaysUntilDue(assignment?.dueDate)?.includes('today') ? 'text-warning' :
                  'text-muted-foreground'
                }`}>
                  {getDaysUntilDue(assignment?.dueDate)}
                </div>
                {assignment?.status && (
                  <div className="text-xs text-muted-foreground mt-1">
                    {assignment?.status}
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <Icon name="Clock" size={32} className="mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">No upcoming assignments</p>
          </div>
        )}
      </div>
      {assignments?.length > 4 && (
        <div className="mt-4 pt-3 border-t border-border">
          <button className="w-full text-sm text-primary hover:text-primary/80 transition-smooth">
            View all assignments ({assignments?.length})
          </button>
        </div>
      )}
    </div>
  );
};

export default UpcomingAssignmentsCard;