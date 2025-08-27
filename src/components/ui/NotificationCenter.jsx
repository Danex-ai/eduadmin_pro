import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const NotificationCenter = ({ isOpen, onClose, notifications = [], onMarkAsRead, onMarkAllAsRead }) => {
  const [filter, setFilter] = useState('all'); // all, unread, high, medium, low
  const [filteredNotifications, setFilteredNotifications] = useState([]);

  useEffect(() => {
    let filtered = notifications;
    
    switch (filter) {
      case 'unread':
        filtered = notifications?.filter(n => !n?.read);
        break;
      case 'high':
        filtered = notifications?.filter(n => n?.priority === 'high');
        break;
      case 'medium':
        filtered = notifications?.filter(n => n?.priority === 'medium');
        break;
      case 'low':
        filtered = notifications?.filter(n => n?.priority === 'low');
        break;
      default:
        filtered = notifications;
    }
    
    setFilteredNotifications(filtered?.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
  }, [notifications, filter]);

  const unreadCount = notifications?.filter(n => !n?.read)?.length;

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return 'AlertTriangle';
      case 'medium':
        return 'Info';
      case 'low':
        return 'CheckCircle';
      default:
        return 'Bell';
    }
  };

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

  const getNotificationTypeIcon = (type) => {
    switch (type) {
      case 'assignment':
        return 'FileText';
      case 'grade':
        return 'Award';
      case 'attendance':
        return 'Calendar';
      case 'message':
        return 'MessageSquare';
      case 'system':
        return 'Settings';
      case 'reminder':
        return 'Clock';
      default:
        return 'Bell';
    }
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-[899]" onClick={onClose} />
      {/* Notification Panel */}
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-surface border-l border-border z-modal overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border bg-surface">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Icon name="Bell" size={20} className="text-primary" />
              <h2 className="text-lg font-semibold text-foreground">Notifications</h2>
              {unreadCount > 0 && (
                <span className="bg-error text-error-foreground text-xs px-2 py-1 rounded-full">
                  {unreadCount}
                </span>
              )}
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>

          {/* Filter Tabs */}
          <div className="flex space-x-1 bg-muted rounded-lg p-1">
            {[
              { key: 'all', label: 'All' },
              { key: 'unread', label: 'Unread' },
              { key: 'high', label: 'High' },
              { key: 'medium', label: 'Medium' },
              { key: 'low', label: 'Low' }
            ]?.map((tab) => (
              <button
                key={tab?.key}
                onClick={() => setFilter(tab?.key)}
                className={`flex-1 px-3 py-2 text-xs font-medium rounded-md transition-smooth ${
                  filter === tab?.key
                    ? 'bg-surface text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab?.label}
              </button>
            ))}
          </div>

          {/* Actions */}
          {unreadCount > 0 && (
            <div className="mt-3">
              <Button
                variant="outline"
                size="sm"
                onClick={onMarkAllAsRead}
                className="w-full"
              >
                Mark all as read
              </Button>
            </div>
          )}
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto">
          {filteredNotifications?.length > 0 ? (
            <div className="divide-y divide-border">
              {filteredNotifications?.map((notification) => (
                <div
                  key={notification?.id}
                  className={`p-4 hover:bg-muted/50 transition-smooth cursor-pointer ${
                    !notification?.read ? 'bg-primary/5' : ''
                  }`}
                  onClick={() => onMarkAsRead && onMarkAsRead(notification?.id)}
                >
                  <div className="flex items-start space-x-3">
                    {/* Priority Indicator */}
                    <div className={`mt-1 ${getPriorityColor(notification?.priority)}`}>
                      <Icon name={getPriorityIcon(notification?.priority)} size={16} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-2">
                          <Icon 
                            name={getNotificationTypeIcon(notification?.type)} 
                            size={16} 
                            className="text-muted-foreground" 
                          />
                          <h3 className={`text-sm font-medium ${
                            !notification?.read ? 'text-foreground' : 'text-muted-foreground'
                          }`}>
                            {notification?.title}
                          </h3>
                        </div>
                        {!notification?.read && (
                          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                        )}
                      </div>
                      
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {notification?.message}
                      </p>
                      
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-muted-foreground">
                          {formatTime(notification?.timestamp)}
                        </span>
                        {notification?.actionRequired && (
                          <span className="text-xs bg-warning/10 text-warning px-2 py-1 rounded">
                            Action Required
                          </span>
                        )}
                      </div>

                      {/* Action Buttons */}
                      {notification?.actions && notification?.actions?.length > 0 && (
                        <div className="flex space-x-2 mt-3">
                          {notification?.actions?.map((action, index) => (
                            <Button
                              key={index}
                              variant={action?.primary ? "default" : "outline"}
                              size="sm"
                              onClick={(e) => {
                                e?.stopPropagation();
                                action?.onClick && action?.onClick();
                              }}
                            >
                              {action?.label}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center px-4">
              <Icon name="Bell" size={48} className="text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                {filter === 'all' ? 'No notifications' : `No ${filter} notifications`}
              </h3>
              <p className="text-sm text-muted-foreground">
                {filter === 'all' ? "You're all caught up! New notifications will appear here."
                  : `No notifications match the ${filter} filter.`
                }
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border bg-surface">
          <Button variant="outline" className="w-full" onClick={onClose}>
            <Icon name="Settings" size={16} className="mr-2" />
            Notification Settings
          </Button>
        </div>
      </div>
    </>
  );
};

export default NotificationCenter;