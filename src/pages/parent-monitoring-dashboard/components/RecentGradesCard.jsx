import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentGradesCard = ({ grades = [] }) => {
  const getGradeColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 70) return 'text-warning';
    return 'text-error';
  };

  const getGradeBadgeColor = (score) => {
    if (score >= 80) return 'bg-success/10 text-success';
    if (score >= 70) return 'bg-warning/10 text-warning';
    return 'bg-error/10 text-error';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-card-foreground">Recent Grades</h3>
        <Icon name="BookOpen" size={20} className="text-primary" />
      </div>
      <div className="space-y-3">
        {grades?.length > 0 ? (
          grades?.slice(0, 5)?.map((grade, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="FileText" size={16} className="text-primary" />
                </div>
                <div>
                  <div className="font-medium text-card-foreground">{grade?.subject}</div>
                  <div className="text-sm text-muted-foreground">{grade?.assignment}</div>
                  <div className="text-xs text-muted-foreground">{grade?.date}</div>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-lg font-bold ${getGradeColor(grade?.score)}`}>
                  {grade?.score}%
                </div>
                <div className={`text-xs px-2 py-1 rounded-full ${getGradeBadgeColor(grade?.score)}`}>
                  {grade?.grade}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <Icon name="BookOpen" size={32} className="mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">No recent grades available</p>
          </div>
        )}
      </div>
      {grades?.length > 5 && (
        <div className="mt-4 pt-3 border-t border-border">
          <button className="w-full text-sm text-primary hover:text-primary/80 transition-smooth">
            View all grades ({grades?.length})
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentGradesCard;