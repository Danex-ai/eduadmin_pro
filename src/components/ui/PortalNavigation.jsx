import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const PortalNavigation = ({ isCollapsed = false, onToggleCollapse }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getNavigationItems = () => {
    const path = location?.pathname;
    
    if (path?.includes('administrator-dashboard') || path?.includes('student-registration')) {
      return [
        {
          label: 'Dashboard',
          path: '/administrator-dashboard',
          icon: 'LayoutDashboard',
          description: 'System overview and analytics'
        },
        {
          label: 'Student Registration',
          path: '/student-registration',
          icon: 'UserPlus',
          description: 'Register new students'
        },
        {
          label: 'Reports',
          path: '/reports',
          icon: 'BarChart3',
          description: 'Analytics and reports'
        },
        {
          label: 'Settings',
          path: '/settings',
          icon: 'Settings',
          description: 'System configuration'
        }
      ];
    }
    
    if (path?.includes('teacher-portal')) {
      return [
        {
          label: 'My Classes',
          path: '/teacher-portal',
          icon: 'Users',
          description: 'Manage your classes'
        },
        {
          label: 'Curriculum',
          path: '/curriculum',
          icon: 'BookOpen',
          description: 'Course materials and lessons'
        },
        {
          label: 'Assessments',
          path: '/assessments',
          icon: 'ClipboardCheck',
          description: 'Create and grade assessments'
        },
        {
          label: 'Progress',
          path: '/progress',
          icon: 'TrendingUp',
          description: 'Student progress tracking'
        }
      ];
    }
    
    if (path?.includes('student-learning-interface')) {
      return [
        {
          label: 'My Courses',
          path: '/student-learning-interface',
          icon: 'BookOpen',
          description: 'Access your courses'
        },
        {
          label: 'Assignments',
          path: '/assignments',
          icon: 'FileText',
          description: 'View and submit assignments'
        },
        {
          label: 'Grades',
          path: '/grades',
          icon: 'Award',
          description: 'Check your grades'
        },
        {
          label: 'Schedule',
          path: '/schedule',
          icon: 'Calendar',
          description: 'Class schedule'
        }
      ];
    }
    
    if (path?.includes('parent-monitoring-dashboard')) {
      return [
        {
          label: 'Overview',
          path: '/parent-monitoring-dashboard',
          icon: 'Home',
          description: 'Child progress overview'
        },
        {
          label: 'Grades',
          path: '/child-grades',
          icon: 'Award',
          description: 'Academic performance'
        },
        {
          label: 'Attendance',
          path: '/attendance',
          icon: 'Calendar',
          description: 'Attendance records'
        },
        {
          label: 'Communication',
          path: '/communication',
          icon: 'MessageSquare',
          description: 'School communications'
        }
      ];
    }
    
    return [];
  };

  const navigationItems = getNavigationItems();
  const currentPath = location?.pathname;

  const handleNavigation = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const isDesktopPortal = () => {
    const path = location?.pathname;
    return path?.includes('administrator-dashboard') || 
           path?.includes('student-registration') || 
           path?.includes('teacher-portal');
  };

  const isMobilePortal = () => {
    const path = location?.pathname;
    return path?.includes('student-learning-interface') || 
           path?.includes('parent-monitoring-dashboard');
  };

  // Desktop Sidebar Navigation (Admin/Teacher)
  if (isDesktopPortal()) {
    return (
      <>
        {/* Desktop Sidebar */}
        <nav className={`fixed left-0 top-16 bottom-0 bg-surface border-r border-border z-navigation transition-all duration-300 ${
          isCollapsed ? 'w-16' : 'w-64'
        } hidden lg:block`}>
          <div className="flex flex-col h-full">
            {/* Toggle Button */}
            <div className="p-4 border-b border-border">
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggleCollapse}
                className="w-full justify-center"
              >
                <Icon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={20} />
              </Button>
            </div>

            {/* Navigation Items */}
            <div className="flex-1 py-4">
              {navigationItems?.map((item) => {
                const isActive = currentPath === item?.path;
                return (
                  <button
                    key={item?.path}
                    onClick={() => handleNavigation(item?.path)}
                    className={`w-full flex items-center px-4 py-3 text-left transition-smooth hover:bg-muted group ${
                      isActive ? 'bg-primary/10 text-primary border-r-2 border-primary' : 'text-foreground'
                    }`}
                  >
                    <Icon 
                      name={item?.icon} 
                      size={20} 
                      className={`${isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}`}
                    />
                    {!isCollapsed && (
                      <div className="ml-3 flex-1">
                        <div className="font-medium text-sm">{item?.label}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{item?.description}</div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </nav>
        {/* Mobile Menu Button */}
        <div className="lg:hidden fixed bottom-4 right-4 z-navigation">
          <Button
            variant="default"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-full shadow-elevation-lg"
          >
            <Icon name="Menu" size={20} />
          </Button>
        </div>
        {/* Mobile Navigation Overlay */}
        {mobileMenuOpen && (
          <>
            <div 
              className="fixed inset-0 bg-black/50 z-[899] lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <nav className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border z-modal lg:hidden">
              <div className="grid grid-cols-4 gap-1 p-2">
                {navigationItems?.map((item) => {
                  const isActive = currentPath === item?.path;
                  return (
                    <button
                      key={item?.path}
                      onClick={() => handleNavigation(item?.path)}
                      className={`flex flex-col items-center py-3 px-2 rounded-lg transition-smooth ${
                        isActive ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon name={item?.icon} size={20} />
                      <span className="text-xs mt-1 font-medium">{item?.label}</span>
                    </button>
                  );
                })}
              </div>
            </nav>
          </>
        )}
      </>
    );
  }

  // Mobile Bottom Tab Navigation (Student/Parent)
  if (isMobilePortal()) {
    return (
      <nav className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border z-navigation">
        <div className="grid grid-cols-4 gap-1 p-2">
          {navigationItems?.map((item) => {
            const isActive = currentPath === item?.path;
            return (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`flex flex-col items-center py-3 px-2 rounded-lg transition-smooth ${
                  isActive ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={20} />
                <span className="text-xs mt-1 font-medium">{item?.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    );
  }

  return null;
};

export default PortalNavigation;