import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentActivitiesWidget = () => {
  const [filter, setFilter] = useState('all'); // all, assignments, grades, messages

  const activities = [
    {
      id: 1,
      type: 'assignment',
      title: 'New assignment created',
      description: 'Algebraic Expressions Worksheet for JSS 2A',
      timestamp: '2025-08-27T09:30:00',
      user: 'You',
      metadata: {
        class: 'JSS 2A',
        subject: 'Mathematics',
        dueDate: '2025-08-30'
      }
    },
    {
      id: 2,
      type: 'grade',
      title: 'Grades submitted',
      description: 'English Language test results for JSS 2B',
      timestamp: '2025-08-27T08:15:00',
      user: 'You',
      metadata: {
        class: 'JSS 2B',
        subject: 'English Language',
        studentsGraded: 28
      }
    },
    {
      id: 3,
      type: 'message',
      title: 'Message received',
      description: 'Parent inquiry about student progress',
      timestamp: '2025-08-26T16:45:00',
      user: 'Mrs. Adebayo',
      metadata: {
        student: 'Adebayo Olumide',
        class: 'JSS 2A',
        priority: 'medium'
      }
    },
    {
      id: 4,
      type: 'attendance',
      title: 'Attendance recorded',
      description: 'Morning attendance for JSS 3A',
      timestamp: '2025-08-26T08:00:00',
      user: 'You',
      metadata: {
        class: 'JSS 3A',
        present: 32,
        total: 35
      }
    },
    {
      id: 5,
      type: 'lesson',
      title: 'Lesson notes uploaded',
      description: 'Quadratic Equations lesson materials',
      timestamp: '2025-08-25T14:30:00',
      user: 'You',
      metadata: {
        class: 'JSS 3A',
        subject: 'Mathematics',
        files: 3
      }
    },
    {
      id: 6,
      type: 'meeting',
      title: 'Meeting scheduled',
      description: 'Parent-teacher conference with Mr. Ibrahim',
      timestamp: '2025-08-25T11:20:00',
      user: 'You',
      metadata: {
        student: 'Fatima Ibrahim',
        date: '2025-08-28',
        time: '14:00'
      }
    }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'assignment':
        return 'FileText';
      case 'grade':
        return 'Award';
      case 'message':
        return 'MessageSquare';
      case 'attendance':
        return 'Users';
      case 'lesson':
        return 'BookOpen';
      case 'meeting':
        return 'Calendar';
      default:
        return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'assignment':
        return 'bg-primary/10 text-primary';
      case 'grade':
        return 'bg-success/10 text-success';
      case 'message':
        return 'bg-warning/10 text-warning';
      case 'attendance':
        return 'bg-secondary/10 text-secondary';
      case 'lesson':
        return 'bg-primary/10 text-primary';
      case 'meeting':
        return 'bg-success/10 text-success';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const filteredActivities = activities?.filter(activity => {
    if (filter === 'all') return true;
    if (filter === 'assignments') return activity?.type === 'assignment';
    if (filter === 'grades') return activity?.type === 'grade';
    if (filter === 'messages') return activity?.type === 'message';
    return true;
  });

  const filterOptions = [
    { value: 'all', label: 'All Activities', count: activities?.length },
    { value: 'assignments', label: 'Assignments', count: activities?.filter(a => a?.type === 'assignment')?.length },
    { value: 'grades', label: 'Grades', count: activities?.filter(a => a?.type === 'grade')?.length },
    { value: 'messages', label: 'Messages', count: activities?.filter(a => a?.type === 'message')?.length }
  ];

  return (
    <div className="bg-surface border border-border rounded-lg shadow-elevation h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
              <Icon name="Activity" size={20} className="text-warning" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Recent Activities</h2>
              <p className="text-sm text-muted-foreground">Your latest teaching activities</p>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <Icon name="MoreVertical" size={16} />
          </Button>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-1 bg-muted rounded-lg p-1">
          {filterOptions?.map((option) => (
            <button
              key={option?.value}
              onClick={() => setFilter(option?.value)}
              className={`flex-1 px-3 py-2 text-xs font-medium rounded-md transition-smooth ${
                filter === option?.value
                  ? 'bg-surface text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <span>{option?.label}</span>
              <span className="ml-1 opacity-60">({option?.count})</span>
            </button>
          ))}
        </div>
      </div>
      {/* Activities List */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-4">
          {filteredActivities?.map((activity) => (
            <div
              key={activity?.id}
              className="flex items-start space-x-4 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-smooth cursor-pointer"
            >
              {/* Activity Icon */}
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${getActivityColor(activity?.type)}`}>
                <Icon name={getActivityIcon(activity?.type)} size={18} />
              </div>

              {/* Activity Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="text-sm font-medium text-foreground">{activity?.title}</h3>
                  <span className="text-xs text-muted-foreground flex-shrink-0">
                    {formatTimeAgo(activity?.timestamp)}
                  </span>
                </div>
                
                <p className="text-sm text-muted-foreground mb-2">{activity?.description}</p>
                
                {/* Metadata */}
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  {activity?.metadata?.class && (
                    <span className="flex items-center space-x-1">
                      <Icon name="Users" size={12} />
                      <span>{activity?.metadata?.class}</span>
                    </span>
                  )}
                  {activity?.metadata?.subject && (
                    <span className="flex items-center space-x-1">
                      <Icon name="BookOpen" size={12} />
                      <span>{activity?.metadata?.subject}</span>
                    </span>
                  )}
                  {activity?.metadata?.studentsGraded && (
                    <span className="flex items-center space-x-1">
                      <Icon name="Award" size={12} />
                      <span>{activity?.metadata?.studentsGraded} students</span>
                    </span>
                  )}
                  {activity?.metadata?.present && (
                    <span className="flex items-center space-x-1">
                      <Icon name="CheckCircle" size={12} />
                      <span>{activity?.metadata?.present}/{activity?.metadata?.total}</span>
                    </span>
                  )}
                </div>

                {/* Action Buttons for specific activities */}
                {activity?.type === 'message' && (
                  <div className="mt-3">
                    <Button variant="outline" size="sm">
                      <Icon name="Reply" size={12} className="mr-1" />
                      Reply
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredActivities?.length === 0 && (
          <div className="text-center py-12">
            <Icon name="Activity" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No activities found</h3>
            <p className="text-sm text-muted-foreground">
              {filter === 'all' ? "You haven't performed any activities yet." 
                : `No ${filter} activities found.`
              }
            </p>
          </div>
        )}
      </div>
      {/* Footer */}
      <div className="p-6 border-t border-border">
        <Button variant="outline" size="sm" className="w-full">
          <Icon name="History" size={14} className="mr-2" />
          View Activity History
        </Button>
      </div>
    </div>
  );
};

export default RecentActivitiesWidget;