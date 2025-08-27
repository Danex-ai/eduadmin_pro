import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import GlobalHeader from '../../components/ui/GlobalHeader';
import PortalNavigation from '../../components/ui/PortalNavigation';
import NotificationCenter from '../../components/ui/NotificationCenter';
import RoleContextSwitcher from '../../components/ui/RoleContextSwitcher';
import ClassScheduleWidget from './components/ClassScheduleWidget';
import StudentPerformanceWidget from './components/StudentPerformanceWidget';
import QuickActionsPanel from './components/QuickActionsPanel';
import NavigationTabs from './components/NavigationTabs';
import RecentActivitiesWidget from './components/RecentActivitiesWidget';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const TeacherPortal = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notificationCenterOpen, setNotificationCenterOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Mock user data
  const user = {
    id: 'TCH001',
    name: 'Mrs. Adunni Okafor',
    email: 'adunni.okafor@eduadmin.ng',
    role: 'teacher',
    avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
    employeeId: 'EMP-TCH-2023-001',
    subjects: ['Mathematics', 'Basic Science'],
    classes: ['JSS 2A', 'JSS 2B', 'JSS 3A', 'JSS 1C']
  };

  // Mock notifications
  const notifications = [
    {
      id: 1,
      type: 'message',
      title: 'New message from parent',
      message: 'Mrs. Adebayo inquired about her child\'s mathematics progress and requested a meeting to discuss improvement strategies.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      priority: 'medium',
      read: false,
      actionRequired: true,
      actions: [
        { label: 'Reply', primary: true, onClick: () => console.log('Reply to parent') },
        { label: 'Schedule Meeting', primary: false, onClick: () => console.log('Schedule meeting') }
      ]
    },
    {
      id: 2,
      type: 'assignment',
      title: 'Assignment deadline reminder',
      message: '15 students from JSS 2A haven\'t submitted their English essays yet. Deadline is tomorrow.',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      priority: 'high',
      read: false,
      actionRequired: true,
      actions: [
        { label: 'Send Reminder', primary: true, onClick: () => console.log('Send reminder') },
        { label: 'Extend Deadline', primary: false, onClick: () => console.log('Extend deadline') }
      ]
    },
    {
      id: 3,
      type: 'system',
      title: 'Curriculum update available',
      message: 'New mathematics curriculum guidelines have been published by the Ministry of Education.',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      priority: 'low',
      read: true,
      actionRequired: false,
      actions: [
        { label: 'View Update', primary: true, onClick: () => console.log('View curriculum update') }
      ]
    },
    {
      id: 4,
      type: 'grade',
      title: 'Grade submission reminder',
      message: 'Monthly grades for JSS 3A Mathematics are due in 3 days.',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      priority: 'medium',
      read: false,
      actionRequired: true,
      actions: [
        { label: 'Submit Grades', primary: true, onClick: () => console.log('Submit grades') }
      ]
    },
    {
      id: 5,
      type: 'attendance',
      title: 'Attendance alert',
      message: 'Student Chinedu Okafor has been absent for 3 consecutive days.',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      priority: 'high',
      read: true,
      actionRequired: true,
      actions: [
        { label: 'Contact Parent', primary: true, onClick: () => console.log('Contact parent') },
        { label: 'View Record', primary: false, onClick: () => console.log('View attendance record') }
      ]
    }
  ];

  // Available roles for role switching
  const availableRoles = ['teacher', 'administrator'];

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    console.log('Logging out...');
    // Logout logic would go here
  };

  const handleRoleSwitch = async (newRole) => {
    console.log('Switching to role:', newRole);
    // Role switching logic would go here
  };

  const handleMarkAsRead = (notificationId) => {
    console.log('Marking notification as read:', notificationId);
    // Mark notification as read logic would go here
  };

  const handleMarkAllAsRead = () => {
    console.log('Marking all notifications as read');
    // Mark all notifications as read logic would go here
  };

  const getGreeting = () => {
    const hour = currentTime?.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const renderDashboardContent = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-primary/80 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              {getGreeting()}, {user?.name?.split(' ')?.[1]}!
            </h1>
            <p className="text-primary-foreground/80 mb-4">
              Welcome to your teaching workspace. You have 4 classes scheduled today.
            </p>
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <Icon name="Calendar" size={16} />
                <span>{currentTime?.toLocaleDateString('en-GB', { 
                  weekday: 'long', 
                  day: 'numeric', 
                  month: 'long', 
                  year: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} />
                <span>{currentTime?.toLocaleTimeString('en-GB', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}</span>
              </div>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
              <Icon name="GraduationCap" size={48} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left Column - Class Schedule */}
        <div className="xl:col-span-6">
          <ClassScheduleWidget />
        </div>

        {/* Right Column - Performance & Actions */}
        <div className="xl:col-span-6 space-y-6">
          <StudentPerformanceWidget />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Quick Actions */}
        <div className="xl:col-span-4">
          <QuickActionsPanel />
        </div>

        {/* Recent Activities */}
        <div className="xl:col-span-8">
          <RecentActivitiesWidget />
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboardContent();
      case 'classes':
        return (
          <div className="bg-surface border border-border rounded-lg shadow-elevation p-8 text-center">
            <Icon name="Users" size={64} className="mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">My Classes</h2>
            <p className="text-muted-foreground mb-4">
              Manage your classes, view student lists, and track attendance.
            </p>
            <Button variant="default">
              <Icon name="Plus" size={16} className="mr-2" />
              Add New Class
            </Button>
          </div>
        );
      case 'lessons':
        return (
          <div className="bg-surface border border-border rounded-lg shadow-elevation p-8 text-center">
            <Icon name="BookOpen" size={64} className="mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">Lesson Plans</h2>
            <p className="text-muted-foreground mb-4">
              Create, organize, and share your lesson plans and teaching materials.
            </p>
            <Button variant="default">
              <Icon name="Plus" size={16} className="mr-2" />
              Create Lesson Plan
            </Button>
          </div>
        );
      case 'records':
        return (
          <div className="bg-surface border border-border rounded-lg shadow-elevation p-8 text-center">
            <Icon name="FileText" size={64} className="mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">Student Records</h2>
            <p className="text-muted-foreground mb-4">
              Access student academic records, grades, and progress reports.
            </p>
            <Button variant="default">
              <Icon name="Search" size={16} className="mr-2" />
              Search Records
            </Button>
          </div>
        );
      case 'resources':
        return (
          <div className="bg-surface border border-border rounded-lg shadow-elevation p-8 text-center">
            <Icon name="FolderOpen" size={64} className="mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">Resources</h2>
            <p className="text-muted-foreground mb-4">
              Access teaching resources, curriculum materials, and educational tools.
            </p>
            <Button variant="default">
              <Icon name="Upload" size={16} className="mr-2" />
              Upload Resource
            </Button>
          </div>
        );
      default:
        return renderDashboardContent();
    }
  };

  return (
    <>
      <Helmet>
        <title>Teacher Portal - EduAdmin Pro</title>
        <meta name="description" content="Teacher workspace for managing classes, curriculum delivery, and student progress tracking in EduAdmin Pro educational administration platform." />
        <meta name="keywords" content="teacher portal, classroom management, lesson plans, student records, educational platform, Nigeria education" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Global Header */}
        <GlobalHeader
          user={user}
          onLogout={handleLogout}
          notifications={notifications}
        />

        {/* Role Context Switcher */}
        <div className="fixed top-20 right-6 z-navigation">
          <RoleContextSwitcher
            currentRole="teacher"
            availableRoles={availableRoles}
            onRoleSwitch={handleRoleSwitch}
            user={user}
          />
        </div>

        {/* Portal Navigation */}
        <PortalNavigation
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        {/* Main Content */}
        <main className={`pt-16 transition-all duration-300 ${
          sidebarCollapsed ? 'lg:pl-16' : 'lg:pl-64'
        }`}>
          {/* Navigation Tabs */}
          <NavigationTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {/* Page Content */}
          <div className="p-6">
            {renderTabContent()}
          </div>
        </main>

        {/* Notification Center */}
        <NotificationCenter
          isOpen={notificationCenterOpen}
          onClose={() => setNotificationCenterOpen(false)}
          notifications={notifications}
          onMarkAsRead={handleMarkAsRead}
          onMarkAllAsRead={handleMarkAllAsRead}
        />

        {/* Mobile Bottom Navigation Spacing */}
        <div className="h-20 lg:hidden" />
      </div>
    </>
  );
};

export default TeacherPortal;