import React from 'react';
import Icon from '../../../components/AppIcon';

const AcademicStatusCard = ({ child }) => {
  const getGradeColor = (grade) => {
    if (grade >= 80) return 'text-success';
    if (grade >= 70) return 'text-warning';
    return 'text-error';
  };

  const getAttendanceColor = (percentage) => {
    if (percentage >= 95) return 'text-success';
    if (percentage >= 85) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-card-foreground">Academic Status</h3>
        <Icon name="TrendingUp" size={20} className="text-primary" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Overall GPA */}
        <div className="bg-muted/50 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Award" size={16} className="text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Overall GPA</span>
          </div>
          <div className={`text-2xl font-bold ${getGradeColor(child?.gpa || 0)}`}>
            {child?.gpa || '0.0'}
          </div>
          <div className="flex items-center space-x-1 mt-1">
            <Icon 
              name={child?.gpaChange >= 0 ? "TrendingUp" : "TrendingDown"} 
              size={12} 
              className={child?.gpaChange >= 0 ? "text-success" : "text-error"} 
            />
            <span className={`text-xs ${child?.gpaChange >= 0 ? "text-success" : "text-error"}`}>
              {child?.gpaChange >= 0 ? '+' : ''}{child?.gpaChange || 0}%
            </span>
          </div>
        </div>

        {/* Attendance */}
        <div className="bg-muted/50 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Calendar" size={16} className="text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Attendance</span>
          </div>
          <div className={`text-2xl font-bold ${getAttendanceColor(child?.attendance || 0)}`}>
            {child?.attendance || 0}%
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {child?.attendanceDays || 0} of {child?.totalDays || 0} days
          </div>
        </div>

        {/* Recent Grades */}
        <div className="bg-muted/50 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="BookOpen" size={16} className="text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Recent Grade</span>
          </div>
          <div className={`text-2xl font-bold ${getGradeColor(child?.recentGrade?.score || 0)}`}>
            {child?.recentGrade?.score || 0}%
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {child?.recentGrade?.subject || 'No recent grades'}
          </div>
        </div>

        {/* Behavior Score */}
        <div className="bg-muted/50 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Heart" size={16} className="text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Behavior</span>
          </div>
          <div className={`text-2xl font-bold ${getGradeColor(child?.behaviorScore || 0)}`}>
            {child?.behaviorScore || 0}/5
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {child?.behaviorNote || 'No notes'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicStatusCard;