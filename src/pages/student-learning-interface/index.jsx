import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalHeader from '../../components/ui/GlobalHeader';
import PortalNavigation from '../../components/ui/PortalNavigation';
import NotificationCenter from '../../components/ui/NotificationCenter';
import CourseCard from './components/CourseCard';
import AssignmentCard from './components/AssignmentCard';
import AchievementBadge from './components/AchievementBadge';
import ProgressChart from './components/ProgressChart';
import QuickActions from './components/QuickActions';
import RecentActivity from './components/RecentActivity';
import UpcomingDeadlines from './components/UpcomingDeadlines';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const StudentLearningInterface = () => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock student data
  const studentData = {
    id: "STU001",
    name: "Adaora Okafor",
    class: "SS3 Science",
    studentId: "2024/STU/001",
    profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    overallGrade: "A",
    attendance: 95,
    completionRate: 87
  };

  // Mock courses data
  const coursesData = [
    {
      id: 1,
      subject: "Mathematics",
      teacher: "Mr. Emeka Nwosu",
      progress: 85,
      hasNewContent: true,
      hasAnnouncement: false,
      nextAssignment: {
        title: "Calculus Problem Set 5",
        dueDate: "Tomorrow",
        isDueSoon: true,
        isOverdue: false
      }
    },
    {
      id: 2,
      subject: "Physics",
      teacher: "Mrs. Fatima Abdullahi",
      progress: 72,
      hasNewContent: false,
      hasAnnouncement: true,
      nextAssignment: {
        title: "Wave Motion Lab Report",
        dueDate: "Dec 30",
        isDueSoon: false,
        isOverdue: false
      }
    },
    {
      id: 3,
      subject: "Chemistry",
      teacher: "Dr. Kemi Adebayo",
      progress: 90,
      hasNewContent: true,
      hasAnnouncement: false,
      nextAssignment: {
        title: "Organic Chemistry Quiz",
        dueDate: "Jan 2",
        isDueSoon: false,
        isOverdue: false
      }
    },
    {
      id: 4,
      subject: "Biology",
      teacher: "Mr. Chidi Okonkwo",
      progress: 78,
      hasNewContent: false,
      hasAnnouncement: false,
      nextAssignment: {
        title: "Genetics Assignment",
        dueDate: "Yesterday",
        isDueSoon: false,
        isOverdue: true
      }
    },
    {
      id: 5,
      subject: "English",
      teacher: "Mrs. Aisha Mohammed",
      progress: 88,
      hasNewContent: true,
      hasAnnouncement: true,
      nextAssignment: {
        title: "Literature Essay",
        dueDate: "Jan 5",
        isDueSoon: false,
        isOverdue: false
      }
    },
    {
      id: 6,
      subject: "Geography",
      teacher: "Mr. Tunde Adeyemi",
      progress: 65,
      hasNewContent: false,
      hasAnnouncement: false,
      nextAssignment: {
        title: "Climate Change Project",
        dueDate: "Jan 8",
        isDueSoon: false,
        isOverdue: false
      }
    }
  ];

  // Mock assignments data
  const assignmentsData = [
    {
      id: 1,
      title: "Calculus Problem Set 5",
      subject: "Mathematics",
      teacher: "Mr. Emeka Nwosu",
      description: "Solve differential equations and integration problems from chapter 12",
      dueDate: "Dec 28, 2024",
      status: "pending",
      priority: "high",
      isDueSoon: true,
      totalPoints: 100
    },
    {
      id: 2,
      title: "Wave Motion Lab Report",
      subject: "Physics",
      teacher: "Mrs. Fatima Abdullahi",
      description: "Complete analysis of wave interference experiment conducted in class",
      dueDate: "Dec 30, 2024",
      status: "submitted",
      priority: "medium",
      isDueSoon: false,
      totalPoints: 75,
      pointsEarned: 68,
      grade: "B+"
    },
    {
      id: 3,
      title: "Genetics Assignment",
      subject: "Biology",
      teacher: "Mr. Chidi Okonkwo",
      description: "Analyze inheritance patterns and create Punnett squares",
      dueDate: "Dec 26, 2024",
      status: "overdue",
      priority: "high",
      isDueSoon: false,
      totalPoints: 50
    },
    {
      id: 4,
      title: "Literature Essay",
      subject: "English",
      teacher: "Mrs. Aisha Mohammed",
      description: "Write a 1500-word essay on themes in \'Things Fall Apart\'",
      dueDate: "Jan 5, 2025",
      status: "pending",
      priority: "medium",
      isDueSoon: false,
      totalPoints: 100
    }
  ];

  // Mock achievements data
  const achievementsData = [
    {
      id: 1,
      title: "Math Wizard",
      description: "Scored 95%+ in 5 consecutive math tests",
      type: "gold",
      category: "academic",
      earnedDate: "Dec 20, 2024",
      isNew: true
    },
    {
      id: 2,
      title: "Perfect Attendance",
      description: "100% attendance for the term",
      type: "silver",
      category: "participation",
      earnedDate: "Dec 15, 2024",
      isNew: false
    },
    {
      id: 3,
      title: "Quick Learner",
      description: "Completed 10 lessons ahead of schedule",
      type: "bronze",
      category: "completion",
      earnedDate: "Dec 10, 2024",
      isNew: false
    },
    {
      id: 4,
      title: "Study Streak",
      description: "7-day consecutive study streak",
      type: "platinum",
      category: "streak",
      earnedDate: "Dec 25, 2024",
      isNew: true
    }
  ];

  // Mock progress data
  const progressData = [
    { name: 'Week 1', value: 65 },
    { name: 'Week 2', value: 72 },
    { name: 'Week 3', value: 78 },
    { name: 'Week 4', value: 85 },
    { name: 'Week 5', value: 82 },
    { name: 'Week 6', value: 87 }
  ];

  // Mock subject performance data
  const subjectPerformanceData = [
    { name: 'Math', value: 85 },
    { name: 'Physics', value: 72 },
    { name: 'Chemistry', value: 90 },
    { name: 'Biology', value: 78 },
    { name: 'English', value: 88 },
    { name: 'Geography', value: 65 }
  ];

  // Mock recent activities
  const recentActivities = [
    {
      type: 'grade_received',
      title: 'Grade Received',
      description: 'Physics Lab Report - Grade: B+',
      subject: 'Physics',
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      isNew: true
    },
    {
      type: 'lesson_completed',
      title: 'Lesson Completed',
      description: 'Completed "Differential Equations" lesson',
      subject: 'Mathematics',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      isNew: true
    },
    {
      type: 'assignment_submitted',
      title: 'Assignment Submitted',
      description: 'Wave Motion Lab Report submitted successfully',
      subject: 'Physics',
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      isNew: false
    },
    {
      type: 'achievement_earned',
      title: 'Achievement Unlocked',
      description: 'Earned "Study Streak" badge',
      subject: 'General',
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
      isNew: false
    },
    {
      type: 'announcement',
      title: 'New Announcement',
      description: 'Holiday schedule updated by administration',
      subject: 'General',
      timestamp: new Date(Date.now() - 172800000), // 2 days ago
      isNew: false
    }
  ];

  // Mock upcoming deadlines
  const upcomingDeadlines = [
    {
      id: 1,
      title: "Calculus Problem Set 5",
      subject: "Mathematics",
      teacher: "Mr. Emeka Nwosu",
      dueDate: "Dec 28, 2024",
      daysLeft: 1,
      type: "Assignment",
      points: 100
    },
    {
      id: 2,
      title: "Organic Chemistry Quiz",
      subject: "Chemistry",
      teacher: "Dr. Kemi Adebayo",
      dueDate: "Jan 2, 2025",
      daysLeft: 6,
      type: "Quiz",
      points: 50
    },
    {
      id: 3,
      title: "Literature Essay",
      subject: "English",
      teacher: "Mrs. Aisha Mohammed",
      dueDate: "Jan 5, 2025",
      daysLeft: 9,
      type: "Essay",
      points: 100
    },
    {
      id: 4,
      title: "Genetics Assignment",
      subject: "Biology",
      teacher: "Mr. Chidi Okonkwo",
      dueDate: "Dec 26, 2024",
      daysLeft: -1,
      type: "Assignment",
      points: 50
    }
  ];

  // Mock notifications
  const notifications = [
    {
      id: 1,
      title: "New Grade Posted",
      message: "Your Physics Lab Report has been graded: B+",
      type: "grade",
      priority: "medium",
      timestamp: new Date(Date.now() - 1800000),
      read: false,
      actionRequired: false
    },
    {
      id: 2,
      title: "Assignment Due Tomorrow",
      message: "Calculus Problem Set 5 is due tomorrow at 11:59 PM",
      type: "assignment",
      priority: "high",
      timestamp: new Date(Date.now() - 3600000),
      read: false,
      actionRequired: true,
      actions: [
        { label: "View Assignment", primary: true, onClick: () => {} },
        { label: "Dismiss", primary: false, onClick: () => {} }
      ]
    },
    {
      id: 3,
      title: "Achievement Unlocked",
      message: "Congratulations! You\'ve earned the \'Study Streak\' badge",
      type: "system",
      priority: "low",
      timestamp: new Date(Date.now() - 86400000),
      read: true,
      actionRequired: false
    }
  ];

  const handleLogout = () => {
    navigate('/login');
  };

  const handleViewCourse = (courseId) => {
    console.log('Viewing course:', courseId);
    // Navigate to course details
  };

  const handleViewGrades = (courseId) => {
    console.log('Viewing grades for course:', courseId);
    // Navigate to grades view
  };

  const handleViewAnnouncements = (courseId) => {
    console.log('Viewing announcements for course:', courseId);
    // Navigate to announcements
  };

  const handleViewAssignment = (assignmentId) => {
    console.log('Viewing assignment:', assignmentId);
    // Navigate to assignment details
  };

  const handleSubmitAssignment = (assignmentId) => {
    console.log('Submitting assignment:', assignmentId);
    // Navigate to submission interface
  };

  const handleQuickAction = (actionId) => {
    console.log('Quick action:', actionId);
    switch (actionId) {
      case 'join-class':
        // Navigate to virtual classroom
        break;
      case 'submit-assignment':
        // Navigate to assignment submission
        break;
      case 'study-materials':
        // Navigate to study materials
        break;
      case 'ask-help':
        // Open help interface
        break;
      default:
        break;
    }
  };

  const handleMarkAsRead = (notificationId) => {
    console.log('Marking notification as read:', notificationId);
  };

  const handleMarkAllAsRead = () => {
    console.log('Marking all notifications as read');
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome back, {studentData?.name}!</h1>
            <p className="text-primary-foreground/80 mb-4">
              {studentData?.class} • Student ID: {studentData?.studentId}
            </p>
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <Icon name="Award" size={16} />
                <span>Overall Grade: {studentData?.overallGrade}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Calendar" size={16} />
                <span>Attendance: {studentData?.attendance}%</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="TrendingUp" size={16} />
                <span>Completion: {studentData?.completionRate}%</span>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="w-20 h-20 bg-primary-foreground/20 rounded-full flex items-center justify-center">
              <Icon name="GraduationCap" size={32} />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <QuickActions onAction={handleQuickAction} />

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-surface border border-border rounded-lg p-4 text-center shadow-elevation">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
            <Icon name="BookOpen" size={20} className="text-primary" />
          </div>
          <p className="text-2xl font-bold text-foreground">{coursesData?.length}</p>
          <p className="text-sm text-muted-foreground">Active Courses</p>
        </div>
        <div className="bg-surface border border-border rounded-lg p-4 text-center shadow-elevation">
          <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-2">
            <Icon name="Clock" size={20} className="text-warning" />
          </div>
          <p className="text-2xl font-bold text-foreground">
            {assignmentsData?.filter(a => a?.status === 'pending')?.length}
          </p>
          <p className="text-sm text-muted-foreground">Pending Tasks</p>
        </div>
        <div className="bg-surface border border-border rounded-lg p-4 text-center shadow-elevation">
          <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-2">
            <Icon name="Award" size={20} className="text-success" />
          </div>
          <p className="text-2xl font-bold text-foreground">{achievementsData?.length}</p>
          <p className="text-sm text-muted-foreground">Achievements</p>
        </div>
        <div className="bg-surface border border-border rounded-lg p-4 text-center shadow-elevation">
          <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-2">
            <Icon name="TrendingUp" size={20} className="text-secondary" />
          </div>
          <p className="text-2xl font-bold text-foreground">{studentData?.completionRate}%</p>
          <p className="text-sm text-muted-foreground">Completion Rate</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* My Courses */}
          <div className="bg-surface border border-border rounded-lg p-6 shadow-elevation">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-foreground">My Courses</h2>
              <Button variant="outline" size="sm" iconName="Grid3X3">
                View All
              </Button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {coursesData?.slice(0, 4)?.map((course) => (
                <CourseCard
                  key={course?.id}
                  course={course}
                  onViewCourse={handleViewCourse}
                  onViewGrades={handleViewGrades}
                  onViewAnnouncements={handleViewAnnouncements}
                />
              ))}
            </div>
          </div>

          {/* Progress Chart */}
          <ProgressChart
            data={progressData}
            type="line"
            title="Weekly Progress"
            subtitle="Your learning progress over the past 6 weeks"
          />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Upcoming Deadlines */}
          <UpcomingDeadlines
            deadlines={upcomingDeadlines}
            onViewAssignment={handleViewAssignment}
          />

          {/* Recent Activity */}
          <RecentActivity activities={recentActivities} />
        </div>
      </div>

      {/* Achievements Section */}
      <div className="bg-surface border border-border rounded-lg p-6 shadow-elevation">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">Recent Achievements</h2>
          <Button variant="outline" size="sm" iconName="Star">
            View All
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {achievementsData?.map((achievement) => (
            <AchievementBadge
              key={achievement?.id}
              achievement={achievement}
              size="default"
            />
          ))}
        </div>
      </div>
    </div>
  );

  const renderCourses = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">My Courses</h1>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" iconName="Filter">
            Filter
          </Button>
          <Button variant="outline" size="sm" iconName="Search">
            Search
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coursesData?.map((course) => (
          <CourseCard
            key={course?.id}
            course={course}
            onViewCourse={handleViewCourse}
            onViewGrades={handleViewGrades}
            onViewAnnouncements={handleViewAnnouncements}
          />
        ))}
      </div>

      {/* Subject Performance Chart */}
      <ProgressChart
        data={subjectPerformanceData}
        type="bar"
        title="Subject Performance"
        subtitle="Your current performance across all subjects"
      />
    </div>
  );

  const renderAssignments = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Assignments</h1>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" iconName="Filter">
            Filter
          </Button>
          <Button variant="outline" size="sm" iconName="Calendar">
            Calendar View
          </Button>
        </div>
      </div>

      {/* Assignment Status Tabs */}
      <div className="flex space-x-1 bg-muted rounded-lg p-1">
        {[
          { key: 'all', label: 'All Assignments' },
          { key: 'pending', label: 'Pending' },
          { key: 'submitted', label: 'Submitted' },
          { key: 'graded', label: 'Graded' },
          { key: 'overdue', label: 'Overdue' }
        ]?.map((tab) => (
          <button
            key={tab?.key}
            className="flex-1 px-4 py-2 text-sm font-medium rounded-md transition-smooth bg-surface text-foreground shadow-sm"
          >
            {tab?.label}
          </button>
        ))}
      </div>

      <div className="grid gap-4">
        {assignmentsData?.map((assignment) => (
          <AssignmentCard
            key={assignment?.id}
            assignment={assignment}
            onViewAssignment={handleViewAssignment}
            onSubmitAssignment={handleSubmitAssignment}
          />
        ))}
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">My Profile</h1>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Info */}
        <div className="lg:col-span-2">
          <div className="bg-surface border border-border rounded-lg p-6 shadow-elevation">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={32} color="white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">{studentData?.name}</h2>
                <p className="text-muted-foreground">{studentData?.class}</p>
                <p className="text-sm text-muted-foreground">ID: {studentData?.studentId}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-foreground mb-3">Academic Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Overall Grade:</span>
                    <span className="font-medium text-foreground">{studentData?.overallGrade}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Attendance:</span>
                    <span className="font-medium text-foreground">{studentData?.attendance}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Completion Rate:</span>
                    <span className="font-medium text-foreground">{studentData?.completionRate}%</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-3">Contact Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email:</span>
                    <span className="font-medium text-foreground">adaora.okafor@school.edu.ng</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Phone:</span>
                    <span className="font-medium text-foreground">+234 801 234 5678</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Guardian:</span>
                    <span className="font-medium text-foreground">Mrs. Chioma Okafor</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <Button variant="default" iconName="Edit" iconPosition="left">
                Edit Profile
              </Button>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div>
          <div className="bg-surface border border-border rounded-lg p-6 shadow-elevation">
            <h3 className="font-semibold text-foreground mb-4">My Achievements</h3>
            <div className="space-y-4">
              {achievementsData?.map((achievement) => (
                <AchievementBadge
                  key={achievement?.id}
                  achievement={achievement}
                  size="small"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'courses':
        return renderCourses();
      case 'assignments':
        return renderAssignments();
      case 'profile':
        return renderProfile();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Global Header */}
      <GlobalHeader
        user={studentData}
        onLogout={handleLogout}
        notifications={notifications}
      />
      {/* Main Content */}
      <main className="pt-16 pb-20 lg:pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Mobile Tab Navigation */}
          <div className="lg:hidden mb-6">
            <div className="flex space-x-1 bg-muted rounded-lg p-1">
              {[
                { key: 'dashboard', label: 'Dashboard', icon: 'Home' },
                { key: 'courses', label: 'Courses', icon: 'BookOpen' },
                { key: 'assignments', label: 'Tasks', icon: 'FileText' },
                { key: 'profile', label: 'Profile', icon: 'User' }
              ]?.map((tab) => (
                <button
                  key={tab?.key}
                  onClick={() => setActiveTab(tab?.key)}
                  className={`flex-1 flex flex-col items-center py-2 px-3 text-xs font-medium rounded-md transition-smooth ${
                    activeTab === tab?.key
                      ? 'bg-surface text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span className="mt-1">{tab?.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Desktop Tab Navigation */}
          <div className="hidden lg:block mb-6">
            <div className="flex space-x-1 bg-muted rounded-lg p-1 w-fit">
              {[
                { key: 'dashboard', label: 'Dashboard', icon: 'Home' },
                { key: 'courses', label: 'My Courses', icon: 'BookOpen' },
                { key: 'assignments', label: 'Assignments', icon: 'FileText' },
                { key: 'profile', label: 'Profile', icon: 'User' }
              ]?.map((tab) => (
                <button
                  key={tab?.key}
                  onClick={() => setActiveTab(tab?.key)}
                  className={`flex items-center space-x-2 py-2 px-4 text-sm font-medium rounded-md transition-smooth ${
                    activeTab === tab?.key
                      ? 'bg-surface text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          {renderContent()}
        </div>
      </main>
      {/* Portal Navigation */}
      <PortalNavigation onToggleCollapse={() => {}} />
      {/* Notification Center */}
      <NotificationCenter
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        notifications={notifications}
        onMarkAsRead={handleMarkAsRead}
        onMarkAllAsRead={handleMarkAllAsRead}
      />
    </div>
  );
};

export default StudentLearningInterface;