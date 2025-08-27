import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CourseCard = ({ course, onViewCourse, onViewGrades, onViewAnnouncements }) => {
  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-success';
    if (progress >= 60) return 'bg-warning';
    return 'bg-error';
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
      'Biology': 'Leaf',
      'Literature': 'Book',
      'Computer Science': 'Monitor'
    };
    return icons?.[subject] || 'BookOpen';
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-4 shadow-elevation hover:shadow-elevation-lg transition-smooth">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon 
              name={getSubjectIcon(course?.subject)} 
              size={20} 
              className="text-primary" 
            />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{course?.subject}</h3>
            <p className="text-sm text-muted-foreground">{course?.teacher}</p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          {course?.hasNewContent && (
            <div className="w-2 h-2 bg-success rounded-full"></div>
          )}
          {course?.hasAnnouncement && (
            <Icon name="Bell" size={16} className="text-warning" />
          )}
        </div>
      </div>
      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Progress</span>
          <span className="text-sm font-medium text-foreground">{course?.progress}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(course?.progress)}`}
            style={{ width: `${course?.progress}%` }}
          ></div>
        </div>
      </div>
      {/* Next Assignment */}
      {course?.nextAssignment && (
        <div className="mb-4 p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Next Assignment</p>
              <p className="text-xs text-muted-foreground">{course?.nextAssignment?.title}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Due</p>
              <p className={`text-sm font-medium ${
                course?.nextAssignment?.isOverdue ? 'text-error' : course?.nextAssignment?.isDueSoon ?'text-warning' : 'text-foreground'
              }`}>
                {course?.nextAssignment?.dueDate}
              </p>
            </div>
          </div>
        </div>
      )}
      {/* Quick Actions */}
      <div className="flex space-x-2">
        <Button
          variant="default"
          size="sm"
          onClick={() => onViewCourse(course?.id)}
          className="flex-1"
          iconName="Play"
          iconPosition="left"
        >
          Continue
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewGrades(course?.id)}
          iconName="Award"
        />
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewAnnouncements(course?.id)}
          iconName="MessageSquare"
        />
      </div>
    </div>
  );
};

export default CourseCard;