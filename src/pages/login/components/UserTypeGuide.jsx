import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UserTypeGuide = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const userTypes = [
    {
      type: 'Administrator',
      icon: 'Shield',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      description: 'System management, student registration, school operations oversight',
      features: ['Student Management', 'School Registration', 'Analytics Dashboard', 'System Configuration']
    },
    {
      type: 'Teacher',
      icon: 'Users',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      description: 'Classroom management, curriculum delivery, student assessment',
      features: ['Class Management', 'Lesson Planning', 'Grade Recording', 'Student Progress']
    },
    {
      type: 'Student',
      icon: 'BookOpen',
      color: 'text-success',
      bgColor: 'bg-success/10',
      description: 'Access learning materials, submit assignments, track progress',
      features: ['Course Access', 'Assignment Submission', 'Grade Viewing', 'Schedule Management']
    },
    {
      type: 'Parent',
      icon: 'Heart',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      description: 'Monitor child progress, communicate with teachers, track attendance',
      features: ['Progress Monitoring', 'Teacher Communication', 'Attendance Tracking', 'School Updates']
    }
  ];

  return (
    <div className="mt-6">
      <Button
        variant="ghost"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-3 text-sm"
      >
        <span className="flex items-center space-x-2">
          <Icon name="HelpCircle" size={16} />
          <span>User Type Guide</span>
        </span>
        <Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={16} />
      </Button>
      {isExpanded && (
        <div className="mt-4 space-y-4 bg-muted/30 rounded-lg p-4">
          <h3 className="text-sm font-medium text-foreground mb-3">
            Choose your portal based on your role:
          </h3>
          
          {userTypes?.map((user, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-surface rounded-lg border border-border">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${user?.bgColor}`}>
                <Icon name={user?.icon} size={18} className={user?.color} />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-foreground mb-1">
                  {user?.type}
                </h4>
                <p className="text-xs text-muted-foreground mb-2">
                  {user?.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {user?.features?.map((feature, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}

          <div className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded-lg">
            <div className="flex items-start space-x-2">
              <Icon name="Info" size={16} className="text-primary mt-0.5" />
              <div>
                <p className="text-xs text-primary font-medium mb-1">
                  First Time Users
                </p>
                <p className="text-xs text-primary/80">
                  Contact your school administrator to get your login credentials and role assignment.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTypeGuide;