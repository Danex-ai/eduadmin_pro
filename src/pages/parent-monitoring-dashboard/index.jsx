import React, { useState, useEffect } from 'react';
import GlobalHeader from '../../components/ui/GlobalHeader';
import PortalNavigation from '../../components/ui/PortalNavigation';
import ChildSelector from './components/ChildSelector';
import AcademicStatusCard from './components/AcademicStatusCard';
import RecentGradesCard from './components/RecentGradesCard';
import UpcomingAssignmentsCard from './components/UpcomingAssignmentsCard';
import CommunicationCenter from './components/CommunicationCenter';
import AttendanceChart from './components/AttendanceChart';
import QuickActions from './components/QuickActions';
import ProgressTracker from './components/ProgressTracker';
import Icon from '../../components/AppIcon';

const ParentMonitoringDashboard = () => {
  const [selectedChild, setSelectedChild] = useState(null);
  const [notifications, setNotifications] = useState([]);

  // Mock data for children
  const mockChildren = [
    {
      id: 1,
      name: "Adaora Okafor",
      class: "JSS 2A",
      school: "Government Secondary School Lagos",
      gpa: 3.8,
      gpaChange: 5,
      attendance: 94,
      attendanceDays: 47,
      totalDays: 50,
      recentGrade: { score: 85, subject: "Mathematics" },
      behaviorScore: 4,
      behaviorNote: "Excellent behavior"
    },
    {
      id: 2,
      name: "Chinedu Okafor",
      class: "Primary 5B",
      school: "Government Primary School Lagos",
      gpa: 3.2,
      gpaChange: -2,
      attendance: 88,
      attendanceDays: 44,
      totalDays: 50,
      recentGrade: { score: 72, subject: "English" },
      behaviorScore: 3,
      behaviorNote: "Good progress"
    }
  ];

  // Mock recent grades
  const mockRecentGrades = [
    {
      subject: "Mathematics",
      assignment: "Algebra Test",
      score: 85,
      grade: "B+",
      date: "25/08/2025"
    },
    {
      subject: "English Language",
      assignment: "Essay Writing",
      score: 78,
      grade: "B",
      date: "23/08/2025"
    },
    {
      subject: "Physics",
      assignment: "Lab Report",
      score: 92,
      grade: "A-",
      date: "22/08/2025"
    },
    {
      subject: "Chemistry",
      assignment: "Periodic Table Quiz",
      score: 88,
      grade: "B+",
      date: "20/08/2025"
    },
    {
      subject: "Biology",
      assignment: "Cell Structure",
      score: 76,
      grade: "B",
      date: "18/08/2025"
    }
  ];

  // Mock upcoming assignments
  const mockUpcomingAssignments = [
    {
      title: "History Project",
      subject: "History",
      dueDate: "2025-08-30",
      priority: "high",
      status: "Not started"
    },
    {
      title: "Math Homework",
      subject: "Mathematics",
      dueDate: "2025-08-28",
      priority: "medium",
      status: "In progress"
    },
    {
      title: "Science Lab Report",
      subject: "Physics",
      dueDate: "2025-09-02",
      priority: "low",
      status: "Not started"
    },
    {
      title: "English Essay",
      subject: "English",
      dueDate: "2025-08-29",
      priority: "high",
      status: "Draft completed"
    }
  ];

  // Mock messages
  const mockMessages = [
    {
      from: "Mrs. Adebayo (Mathematics Teacher)",
      subject: "Excellent Progress in Algebra",
      content: "Adaora has shown remarkable improvement in algebra. Her recent test score of 85% demonstrates her dedication to learning. Keep encouraging her at home.",
      timestamp: new Date(Date.now() - 3600000),
      priority: "medium",
      read: false
    },
    {
      from: "Mr. Okonkwo (Class Teacher)",
      subject: "Parent-Teacher Meeting Reminder",
      content: "This is a reminder about the upcoming parent-teacher meeting scheduled for Friday, August 30th at 2:00 PM. Please confirm your attendance.",
      timestamp: new Date(Date.now() - 7200000),
      priority: "high",
      read: false
    },
    {
      from: "School Administration",
      subject: "Fee Payment Confirmation",
      content: "We acknowledge receipt of your payment for the second term fees. Receipt number: FEE/2025/0847. Thank you for your prompt payment.",
      timestamp: new Date(Date.now() - 86400000),
      priority: "low",
      read: true
    }
  ];

  // Mock announcements
  const mockAnnouncements = [
    {
      title: "Inter-House Sports Competition",
      content: "The annual inter-house sports competition will be held on September 15th, 2025. All students are encouraged to participate. Registration forms are available at the school office.",
      timestamp: new Date(Date.now() - 1800000),
      category: "Sports"
    },
    {
      title: "New Library Books Available",
      content: "The school library has received new books covering various subjects. Students can now borrow these books during library hours. Please see the librarian for more information.",
      timestamp: new Date(Date.now() - 3600000),
      category: "Academic"
    },
    {
      title: "School Closure Notice",
      content: "The school will be closed on September 1st, 2025 for Independence Day celebration. Classes will resume on September 2nd, 2025.",
      timestamp: new Date(Date.now() - 86400000),
      category: "Important"
    }
  ];

  // Mock notifications for header
  const mockNotifications = [
    {
      id: 1,
      title: "New Grade Posted",
      message: "Mathematics test grade has been posted for Adaora",
      time: "5 minutes ago",
      priority: "medium",
      read: false,
      type: "grade"
    },
    {
      id: 2,
      title: "Assignment Due Tomorrow",
      message: "History project is due tomorrow for Adaora",
      time: "2 hours ago",
      priority: "high",
      read: false,
      type: "assignment"
    },
    {
      id: 3,
      title: "Teacher Message",
      message: "New message from Mrs. Adebayo about Adaora's progress",
      time: "1 day ago",
      priority: "medium",
      read: true,
      type: "message"
    }
  ];

  // Mock user data
  const mockUser = {
    name: "Mr. Emeka Okafor",
    email: "emeka.okafor@email.com",
    role: "Parent"
  };

  useEffect(() => {
    // Set first child as default selected
    if (mockChildren?.length > 0) {
      setSelectedChild(mockChildren?.[0]);
    }
    setNotifications(mockNotifications);
  }, []);

  const handleChildSelect = (child) => {
    setSelectedChild(child);
  };

  const handleQuickAction = (actionId) => {
    console.log('Quick action clicked:', actionId);
    // Handle quick actions here
    switch (actionId) {
      case 'report-absence': alert('Report Absence feature would open here');
        break;
      case 'permission-slip': alert('Permission Slip form would open here');
        break;
      case 'schedule-meeting': alert('Meeting scheduler would open here');
        break;
      case 'message-teacher': alert('Teacher messaging interface would open here');
        break;
      case 'view-calendar': alert('School calendar would open here');
        break;
      case 'payment-history': alert('Payment history would open here');
        break;
      default:
        break;
    }
  };

  const handleLogout = () => {
    console.log('Logging out...');
    // Handle logout logic here
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Global Header */}
      <GlobalHeader 
        user={mockUser}
        notifications={notifications}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <main className="pt-16 pb-20 lg:pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Page Header with Child Selector */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div className="mb-4 sm:mb-0">
              <h1 className="text-2xl font-bold text-foreground">Parent Dashboard</h1>
              <p className="text-muted-foreground">Monitor your child's academic progress and school activities</p>
            </div>
            <ChildSelector 
              children={mockChildren}
              selectedChild={selectedChild}
              onChildSelect={handleChildSelect}
            />
          </div>

          {/* Dashboard Content */}
          {selectedChild ? (
            <div className="space-y-6">
              {/* Academic Status Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AcademicStatusCard child={selectedChild} />
                <AttendanceChart />
              </div>

              {/* Grades and Assignments */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RecentGradesCard grades={mockRecentGrades} />
                <UpcomingAssignmentsCard assignments={mockUpcomingAssignments} />
              </div>

              {/* Communication and Progress */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <CommunicationCenter 
                  messages={mockMessages}
                  announcements={mockAnnouncements}
                />
                <ProgressTracker />
              </div>

              {/* Quick Actions */}
              <QuickActions onActionClick={handleQuickAction} />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <Icon name="Users" size={64} className="text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-2">No Child Selected</h2>
              <p className="text-muted-foreground text-center">
                Please select a child from the dropdown above to view their dashboard
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Mobile Navigation */}
      <PortalNavigation onToggleCollapse={() => {}} />
    </div>
  );
};

export default ParentMonitoringDashboard;