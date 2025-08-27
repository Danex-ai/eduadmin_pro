import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StudentPerformanceWidget = () => {
  const [selectedClass, setSelectedClass] = useState('JSS 2A');
  const [viewType, setViewType] = useState('overview'); // overview, detailed

  const classOptions = [
    'JSS 2A', 'JSS 2B', 'JSS 3A', 'JSS 1C'
  ];

  const performanceData = [
    { subject: 'Math', average: 78, students: 32, improved: 12, declined: 3 },
    { subject: 'English', average: 82, students: 32, improved: 15, declined: 2 },
    { subject: 'Science', average: 75, students: 32, improved: 10, declined: 5 },
    { subject: 'Social', average: 80, students: 32, improved: 14, declined: 1 }
  ];

  const trendData = [
    { month: 'Jan', math: 72, english: 78, science: 70 },
    { month: 'Feb', math: 75, english: 80, science: 73 },
    { month: 'Mar', math: 78, english: 82, science: 75 },
    { month: 'Apr', math: 76, english: 81, science: 74 },
    { month: 'May', math: 79, english: 83, science: 76 }
  ];

  const recentSubmissions = [
    {
      id: 1,
      student: "Adebayo Olumide",
      assignment: "Algebraic Expressions Worksheet",
      subject: "Mathematics",
      submittedAt: "2025-08-27T08:30:00",
      status: "submitted",
      grade: null
    },
    {
      id: 2,
      student: "Fatima Ibrahim",
      assignment: "Essay: My Future Career",
      subject: "English Language",
      submittedAt: "2025-08-26T16:45:00",
      status: "graded",
      grade: 85
    },
    {
      id: 3,
      student: "Chinedu Okafor",
      assignment: "Science Project Report",
      subject: "Basic Science",
      submittedAt: "2025-08-26T14:20:00",
      status: "late",
      grade: null
    },
    {
      id: 4,
      student: "Aisha Mohammed",
      assignment: "History Timeline",
      subject: "Social Studies",
      submittedAt: "2025-08-25T11:15:00",
      status: "graded",
      grade: 92
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'submitted':
        return 'bg-primary/10 text-primary';
      case 'graded':
        return 'bg-success/10 text-success';
      case 'late':
        return 'bg-error/10 text-error';
      case 'pending':
        return 'bg-warning/10 text-warning';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getGradeColor = (grade) => {
    if (grade >= 90) return 'text-success';
    if (grade >= 80) return 'text-primary';
    if (grade >= 70) return 'text-warning';
    return 'text-error';
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor((now - time) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="bg-surface border border-border rounded-lg shadow-elevation h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="TrendingUp" size={20} className="text-success" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Student Performance</h2>
              <p className="text-sm text-muted-foreground">Class analytics and progress</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e?.target?.value)}
              className="px-3 py-2 text-sm border border-border rounded-md bg-surface text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {classOptions?.map(cls => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex items-center space-x-2">
          <Button
            variant={viewType === 'overview' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewType('overview')}
          >
            Overview
          </Button>
          <Button
            variant={viewType === 'detailed' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewType('detailed')}
          >
            Detailed
          </Button>
        </div>
      </div>
      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {viewType === 'overview' ? (
          <div className="space-y-6">
            {/* Performance Chart */}
            <div>
              <h3 className="text-sm font-medium text-foreground mb-4">Subject Performance</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis 
                      dataKey="subject" 
                      tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
                    />
                    <YAxis 
                      tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'var(--color-popover)',
                        border: '1px solid var(--color-border)',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="average" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Performance Summary Cards */}
            <div className="grid grid-cols-2 gap-4">
              {performanceData?.map((subject) => (
                <div key={subject?.subject} className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-foreground">{subject?.subject}</h4>
                    <span className={`text-lg font-bold ${getGradeColor(subject?.average)}`}>
                      {subject?.average}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center space-x-1">
                      <Icon name="TrendingUp" size={12} className="text-success" />
                      <span>{subject?.improved} improved</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Icon name="TrendingDown" size={12} className="text-error" />
                      <span>{subject?.declined} declined</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Trend Chart */}
            <div>
              <h3 className="text-sm font-medium text-foreground mb-4">Performance Trends</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis 
                      dataKey="month" 
                      tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
                    />
                    <YAxis 
                      tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'var(--color-popover)',
                        border: '1px solid var(--color-border)',
                        borderRadius: '8px'
                      }}
                    />
                    <Line type="monotone" dataKey="math" stroke="var(--color-primary)" strokeWidth={2} />
                    <Line type="monotone" dataKey="english" stroke="var(--color-success)" strokeWidth={2} />
                    <Line type="monotone" dataKey="science" stroke="var(--color-warning)" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Submissions */}
            <div>
              <h3 className="text-sm font-medium text-foreground mb-4">Recent Submissions</h3>
              <div className="space-y-3">
                {recentSubmissions?.map((submission) => (
                  <div key={submission?.id} className="p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-foreground text-sm">{submission?.student}</h4>
                        <p className="text-xs text-muted-foreground">{submission?.assignment}</p>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(submission?.status)}`}>
                          {submission?.status}
                        </span>
                        {submission?.grade && (
                          <div className={`text-sm font-bold mt-1 ${getGradeColor(submission?.grade)}`}>
                            {submission?.grade}%
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{submission?.subject}</span>
                      <span>{formatTimeAgo(submission?.submittedAt)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Footer Actions */}
      <div className="p-6 border-t border-border">
        <div className="flex items-center justify-between">
          <Button variant="outline" size="sm">
            <Icon name="Download" size={14} className="mr-2" />
            Export Report
          </Button>
          <Button variant="default" size="sm">
            <Icon name="BarChart3" size={14} className="mr-2" />
            Detailed Analytics
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StudentPerformanceWidget;