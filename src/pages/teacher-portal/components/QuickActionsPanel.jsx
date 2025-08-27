import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionsPanel = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'message',
      title: 'New message from parent',
      message: 'Mrs. Adebayo inquired about her child\'s mathematics progress',
      time: '2 hours ago',
      priority: 'medium',
      read: false
    },
    {
      id: 2,
      type: 'assignment',
      title: 'Assignment deadline reminder',
      message: '15 students haven\'t submitted their English essays yet',
      time: '4 hours ago',
      priority: 'high',
      read: false
    },
    {
      id: 3,
      type: 'system',
      title: 'Curriculum update available',
      message: 'New mathematics curriculum guidelines have been published',
      time: '1 day ago',
      priority: 'low',
      read: true
    }
  ]);

  const quickActions = [
    {
      id: 1,
      title: 'Take Attendance',
      description: 'Mark student attendance for current class',
      icon: 'Users',
      color: 'bg-primary',
      action: () => console.log('Take attendance')
    },
    {
      id: 2,
      title: 'Create Assignment',
      description: 'Design new assignment or homework',
      icon: 'FileText',
      color: 'bg-success',
      action: () => console.log('Create assignment')
    },
    {
      id: 3,
      title: 'Upload Lesson Notes',
      description: 'Share lesson materials with students',
      icon: 'Upload',
      color: 'bg-warning',
      action: () => console.log('Upload lesson notes')
    },
    {
      id: 4,
      title: 'Grade Submissions',
      description: 'Review and grade pending submissions',
      icon: 'Award',
      color: 'bg-secondary',
      action: () => console.log('Grade submissions')
    },
    {
      id: 5,
      title: 'Send Message',
      description: 'Communicate with students or parents',
      icon: 'MessageSquare',
      color: 'bg-primary',
      action: () => console.log('Send message')
    },
    {
      id: 6,
      title: 'Schedule Meeting',
      description: 'Book parent-teacher conference',
      icon: 'Calendar',
      color: 'bg-success',
      action: () => console.log('Schedule meeting')
    }
  ];

  const upcomingTasks = [
    {
      id: 1,
      title: 'Grade JSS 2A Mathematics Test',
      dueDate: '2025-08-28',
      priority: 'high',
      completed: false
    },
    {
      id: 2,
      title: 'Prepare JSS 3A Science Lesson Plan',
      dueDate: '2025-08-29',
      priority: 'medium',
      completed: false
    },
    {
      id: 3,
      title: 'Submit Monthly Progress Report',
      dueDate: '2025-08-30',
      priority: 'high',
      completed: false
    },
    {
      id: 4,
      title: 'Parent Meeting - Fatima Ibrahim',
      dueDate: '2025-08-28',
      priority: 'medium',
      completed: false
    }
  ];

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

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'message':
        return 'MessageSquare';
      case 'assignment':
        return 'FileText';
      case 'system':
        return 'Settings';
      default:
        return 'Bell';
    }
  };

  const markAsRead = (notificationId) => {
    setNotifications(prev => 
      prev?.map(notif => 
        notif?.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const toggleTask = (taskId) => {
    // Task completion logic would go here
    console.log('Toggle task:', taskId);
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions Grid */}
      <div className="bg-surface border border-border rounded-lg shadow-elevation p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Zap" size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Quick Actions</h2>
            <p className="text-sm text-muted-foreground">Common teaching tasks</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {quickActions?.map((action) => (
            <button
              key={action?.id}
              onClick={action?.action}
              className="p-4 text-left bg-muted/30 hover:bg-muted/50 rounded-lg transition-smooth group"
            >
              <div className="flex items-start space-x-3">
                <div className={`w-10 h-10 ${action?.color} rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform`}>
                  <Icon name={action?.icon} size={18} color="white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-foreground text-sm mb-1">{action?.title}</h3>
                  <p className="text-xs text-muted-foreground">{action?.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Notifications */}
      <div className="bg-surface border border-border rounded-lg shadow-elevation p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
              <Icon name="Bell" size={20} className="text-warning" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Notifications</h2>
              <p className="text-sm text-muted-foreground">
                {notifications?.filter(n => !n?.read)?.length} unread
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <Icon name="Settings" size={16} className="mr-2" />
            Settings
          </Button>
        </div>

        <div className="space-y-3">
          {notifications?.slice(0, 3)?.map((notification) => (
            <div
              key={notification?.id}
              className={`p-3 rounded-lg border transition-smooth cursor-pointer ${
                !notification?.read 
                  ? 'bg-primary/5 border-primary/20 hover:bg-primary/10' :'bg-muted/30 border-border hover:bg-muted/50'
              }`}
              onClick={() => markAsRead(notification?.id)}
            >
              <div className="flex items-start space-x-3">
                <div className={`mt-1 ${getPriorityColor(notification?.priority)}`}>
                  <Icon name={getNotificationIcon(notification?.type)} size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <h3 className={`text-sm font-medium ${
                      !notification?.read ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {notification?.title}
                    </h3>
                    {!notification?.read && (
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {notification?.message}
                  </p>
                  <span className="text-xs text-muted-foreground mt-1">
                    {notification?.time}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <Button variant="outline" size="sm" className="w-full">
            <Icon name="Eye" size={14} className="mr-2" />
            View All Notifications
          </Button>
        </div>
      </div>
      {/* Upcoming Tasks */}
      <div className="bg-surface border border-border rounded-lg shadow-elevation p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
            <Icon name="CheckSquare" size={20} className="text-success" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Upcoming Tasks</h2>
            <p className="text-sm text-muted-foreground">
              {upcomingTasks?.filter(t => !t?.completed)?.length} pending tasks
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {upcomingTasks?.map((task) => (
            <div
              key={task?.id}
              className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-smooth"
            >
              <button
                onClick={() => toggleTask(task?.id)}
                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-smooth ${
                  task?.completed
                    ? 'bg-success border-success' :'border-border hover:border-primary'
                }`}
              >
                {task?.completed && <Icon name="Check" size={12} color="white" />}
              </button>
              <div className="flex-1">
                <h3 className={`text-sm font-medium ${
                  task?.completed ? 'text-muted-foreground line-through' : 'text-foreground'
                }`}>
                  {task?.title}
                </h3>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs text-muted-foreground">
                    Due: {new Date(task.dueDate)?.toLocaleDateString('en-GB')}
                  </span>
                  <span className={`text-xs font-medium ${getPriorityColor(task?.priority)}`}>
                    {task?.priority}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <Button variant="default" size="sm" className="w-full">
            <Icon name="Plus" size={14} className="mr-2" />
            Add New Task
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActionsPanel;