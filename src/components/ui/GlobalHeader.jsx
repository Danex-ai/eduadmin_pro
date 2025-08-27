import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const GlobalHeader = ({ user, onLogout, notifications = [] }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const unreadCount = notifications?.filter(n => !n?.read)?.length;

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    navigate('/login');
  };

  const getPortalName = () => {
    const path = location?.pathname;
    if (path?.includes('administrator-dashboard')) return 'Administrator Portal';
    if (path?.includes('teacher-portal')) return 'Teacher Workspace';
    if (path?.includes('student-learning-interface')) return 'Student Portal';
    if (path?.includes('parent-monitoring-dashboard')) return 'Parent Portal';
    if (path?.includes('student-registration')) return 'Student Registration';
    return 'EduAdmin Pro';
  };

  const getUserRole = () => {
    const path = location?.pathname;
    if (path?.includes('administrator-dashboard') || path?.includes('student-registration')) return 'Administrator';
    if (path?.includes('teacher-portal')) return 'Teacher';
    if (path?.includes('student-learning-interface')) return 'Student';
    if (path?.includes('parent-monitoring-dashboard')) return 'Parent';
    return 'User';
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-surface border-b border-border z-header">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="GraduationCap" size={20} color="white" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-semibold text-text-primary">EduAdmin Pro</h1>
              <span className="text-xs text-text-secondary">{getPortalName()}</span>
            </div>
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative"
            >
              <Icon name="Bell" size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </Button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-popover border border-border rounded-lg shadow-elevation-lg z-notification">
                <div className="p-4 border-b border-border">
                  <h3 className="font-medium text-popover-foreground">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications?.length > 0 ? (
                    notifications?.slice(0, 5)?.map((notification, index) => (
                      <div
                        key={index}
                        className={`p-3 border-b border-border last:border-b-0 ${
                          !notification?.read ? 'bg-muted' : ''
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            notification?.priority === 'high' ? 'bg-error' :
                            notification?.priority === 'medium' ? 'bg-warning' : 'bg-success'
                          }`} />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-popover-foreground">
                              {notification?.title}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {notification?.message}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {notification?.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-center">
                      <Icon name="Bell" size={32} className="mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">No notifications</p>
                    </div>
                  )}
                </div>
                {notifications?.length > 5 && (
                  <div className="p-3 border-t border-border">
                    <Button variant="ghost" size="sm" className="w-full">
                      View all notifications
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 px-3"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              <div className="hidden md:flex flex-col items-start">
                <span className="text-sm font-medium text-text-primary">
                  {user?.name || 'User'}
                </span>
                <span className="text-xs text-text-secondary">{getUserRole()}</span>
              </div>
              <Icon name="ChevronDown" size={16} />
            </Button>

            {/* User Dropdown */}
            {showUserMenu && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-popover border border-border rounded-lg shadow-elevation-lg z-notification">
                <div className="p-3 border-b border-border">
                  <p className="font-medium text-popover-foreground">{user?.name || 'User'}</p>
                  <p className="text-sm text-muted-foreground">{user?.email || 'user@example.com'}</p>
                  <p className="text-xs text-muted-foreground mt-1">{getUserRole()}</p>
                </div>
                <div className="py-2">
                  <button className="w-full px-3 py-2 text-left text-sm text-popover-foreground hover:bg-muted transition-smooth flex items-center space-x-2">
                    <Icon name="User" size={16} />
                    <span>Profile Settings</span>
                  </button>
                  <button className="w-full px-3 py-2 text-left text-sm text-popover-foreground hover:bg-muted transition-smooth flex items-center space-x-2">
                    <Icon name="Settings" size={16} />
                    <span>Preferences</span>
                  </button>
                  <button className="w-full px-3 py-2 text-left text-sm text-popover-foreground hover:bg-muted transition-smooth flex items-center space-x-2">
                    <Icon name="HelpCircle" size={16} />
                    <span>Help & Support</span>
                  </button>
                </div>
                <div className="border-t border-border py-2">
                  <button
                    onClick={handleLogout}
                    className="w-full px-3 py-2 text-left text-sm text-destructive hover:bg-muted transition-smooth flex items-center space-x-2"
                  >
                    <Icon name="LogOut" size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Click outside handlers */}
      {(showNotifications || showUserMenu) && (
        <div
          className="fixed inset-0 z-[799]"
          onClick={() => {
            setShowNotifications(false);
            setShowUserMenu(false);
          }}
        />
      )}
    </header>
  );
};

export default GlobalHeader;