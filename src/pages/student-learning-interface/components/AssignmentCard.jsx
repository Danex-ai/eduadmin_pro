import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AssignmentCard = ({ assignment, onViewAssignment, onSubmitAssignment }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'border-l-error bg-error/5';
      case 'medium':
        return 'border-l-warning bg-warning/5';
      case 'low':
        return 'border-l-success bg-success/5';
      default:
        return 'border-l-muted-foreground bg-muted/5';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'submitted':
        return { icon: 'CheckCircle', color: 'text-success' };
      case 'graded':
        return { icon: 'Award', color: 'text-primary' };
      case 'overdue':
        return { icon: 'AlertTriangle', color: 'text-error' };
      case 'pending':
        return { icon: 'Clock', color: 'text-warning' };
      default:
        return { icon: 'FileText', color: 'text-muted-foreground' };
    }
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

  const statusConfig = getStatusIcon(assignment?.status);

  return (
    <div className={`bg-surface border-l-4 border-r border-t border-b border-border rounded-r-lg p-4 shadow-elevation hover:shadow-elevation-lg transition-smooth ${getPriorityColor(assignment?.priority)}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start space-x-3 flex-1">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon 
              name={getSubjectIcon(assignment?.subject)} 
              size={18} 
              className="text-primary" 
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground mb-1 line-clamp-2">
              {assignment?.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-2">
              {assignment?.subject} • {assignment?.teacher}
            </p>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {assignment?.description}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2 flex-shrink-0">
          <Icon 
            name={statusConfig?.icon} 
            size={20} 
            className={statusConfig?.color} 
          />
        </div>
      </div>
      {/* Assignment Details */}
      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div>
          <p className="text-muted-foreground">Due Date</p>
          <p className={`font-medium ${
            assignment?.status === 'overdue' ? 'text-error' : assignment?.isDueSoon ?'text-warning' : 'text-foreground'
          }`}>
            {assignment?.dueDate}
          </p>
        </div>
        <div>
          <p className="text-muted-foreground">Status</p>
          <p className={`font-medium capitalize ${statusConfig?.color}`}>
            {assignment?.status}
          </p>
        </div>
        {assignment?.grade && (
          <>
            <div>
              <p className="text-muted-foreground">Grade</p>
              <p className="font-medium text-foreground">{assignment?.grade}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Points</p>
              <p className="font-medium text-foreground">
                {assignment?.pointsEarned}/{assignment?.totalPoints}
              </p>
            </div>
          </>
        )}
      </div>
      {/* Action Buttons */}
      <div className="flex space-x-2">
        <Button
          variant="default"
          size="sm"
          onClick={() => onViewAssignment(assignment?.id)}
          className="flex-1"
          iconName="Eye"
          iconPosition="left"
        >
          View Details
        </Button>
        {assignment?.status === 'pending' && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onSubmitAssignment(assignment?.id)}
            iconName="Upload"
            iconPosition="left"
          >
            Submit
          </Button>
        )}
      </div>
    </div>
  );
};

export default AssignmentCard;