import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const ProgressTracker = ({ progressData = [] }) => {
  const mockData = progressData?.length > 0 ? progressData : [
    { subject: 'Mathematics', current: 85, target: 90, improvement: 5 },
    { subject: 'English', current: 78, target: 85, improvement: -2 },
    { subject: 'Science', current: 92, target: 95, improvement: 8 },
    { subject: 'History', current: 76, target: 80, improvement: 3 },
    { subject: 'Geography', current: 88, target: 90, improvement: 6 }
  ];

  const getProgressColor = (current, target) => {
    const percentage = (current / target) * 100;
    if (percentage >= 95) return 'text-success';
    if (percentage >= 85) return 'text-warning';
    return 'text-error';
  };

  const getImprovementIcon = (improvement) => {
    if (improvement > 0) return 'TrendingUp';
    if (improvement < 0) return 'TrendingDown';
    return 'Minus';
  };

  const getImprovementColor = (improvement) => {
    if (improvement > 0) return 'text-success';
    if (improvement < 0) return 'text-error';
    return 'text-muted-foreground';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-card-foreground">Progress Tracker</h3>
        <Icon name="Target" size={20} className="text-primary" />
      </div>
      {/* Chart */}
      <div className="h-64 w-full mb-4" aria-label="Subject Progress Chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={mockData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="subject" 
              stroke="#6B7280"
              fontSize={10}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis 
              stroke="#6B7280"
              fontSize={12}
              domain={[0, 100]}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                fontSize: '12px'
              }}
              formatter={(value, name) => [
                `${value}%`, 
                name === 'current' ? 'Current Score' : 'Target Score'
              ]}
            />
            <Bar dataKey="current" fill="#1E40AF" radius={[2, 2, 0, 0]} />
            <Bar dataKey="target" fill="#E5E7EB" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      {/* Subject Details */}
      <div className="space-y-3">
        {mockData?.slice(0, 3)?.map((subject, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="BookOpen" size={16} className="text-primary" />
              </div>
              <div>
                <div className="font-medium text-card-foreground">{subject?.subject}</div>
                <div className="text-sm text-muted-foreground">
                  Target: {subject?.target}%
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className={`text-lg font-bold ${getProgressColor(subject?.current, subject?.target)}`}>
                {subject?.current}%
              </div>
              <div className={`flex items-center space-x-1 ${getImprovementColor(subject?.improvement)}`}>
                <Icon 
                  name={getImprovementIcon(subject?.improvement)} 
                  size={12} 
                />
                <span className="text-xs">
                  {subject?.improvement > 0 ? '+' : ''}{subject?.improvement}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-3 border-t border-border">
        <button className="w-full text-sm text-primary hover:text-primary/80 transition-smooth">
          View detailed progress report
        </button>
      </div>
    </div>
  );
};

export default ProgressTracker;