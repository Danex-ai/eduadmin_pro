import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalHeader from '../../components/ui/GlobalHeader';
import PortalNavigation from '../../components/ui/PortalNavigation';
import MetricCard from './components/MetricCard';
import ActivityFeed from './components/ActivityFeed';
import QuickActionsPanel from './components/QuickActionsPanel';
import AnalyticsChart from './components/AnalyticsChart';
import NavigationTabs from './components/NavigationTabs';
import AlertBanner from './components/AlertBanner';
import Icon from '../../components/AppIcon';

const AdministratorDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Mock user data
  const currentUser = {
    name: "Dr. Adebayo Ogundimu",
    email: "adebayo.ogundimu@eduadmin.gov.ng",
    role: "System Administrator"
  };

  // Mock notifications
  const notifications = [
    {
      id: 1,
      title: "New School Registration",
      message: "Lagos State Model College has submitted registration documents",
      time: "5 minutes ago",
      priority: "high",
      read: false
    },
    {
      id: 2,
      title: "System Backup Complete",
      message: "Daily backup completed successfully at 02:00 AM",
      time: "6 hours ago",
      priority: "low",
      read: true
    },
    {
      id: 3,
      title: "BECE Results Published",
      message: "2024 BECE results have been published and are now available",
      time: "1 day ago",
      priority: "medium",
      read: false
    }
  ];

  // Mock critical alerts
  const criticalAlerts = [
    {
      id: 1,
      severity: 'critical',
      title: 'Server Maintenance Required',
      message: 'Database server requires immediate attention. Performance degradation detected.',
      actions: [
        { label: 'View Details', primary: true, onClick: () => console.log('View details') },
        { label: 'Schedule Maintenance', primary: false, onClick: () => console.log('Schedule') }
      ]
    },
    {
      id: 2,
      severity: 'warning',
      title: 'Pending School Approvals',
      message: '12 schools are awaiting approval. Review required within 48 hours.',
      actions: [
        { label: 'Review Now', primary: true, onClick: () => console.log('Review') }
      ]
    }
  ];

  // Mock metrics data
  const metricsData = [
    {
      title: "Total Students Enrolled",
      value: "2,847,392",
      change: "+12.5% from last month",
      changeType: "positive",
      icon: "Users",
      color: "primary"
    },
    {
      title: "Active Schools",
      value: "15,847",
      change: "+3.2% from last month",
      changeType: "positive",
      icon: "Building",
      color: "success"
    },
    {
      title: "Pending Applications",
      value: "1,247",
      change: "-8.1% from last week",
      changeType: "negative",
      icon: "FileText",
      color: "warning"
    },
    {
      title: "System Health",
      value: "98.7%",
      change: "Optimal performance",
      changeType: "positive",
      icon: "Activity",
      color: "success"
    }
  ];

  // Mock activity feed data
  const recentActivities = [
    {
      type: 'registration',
      title: 'New School Registration',
      description: 'Ogun State Grammar School submitted registration documents',
      timestamp: new Date(Date.now() - 300000),
      priority: 'high'
    },
    {
      type: 'approval',
      title: 'School Approved',
      description: 'Federal Government College Kaduna registration approved',
      timestamp: new Date(Date.now() - 900000),
      priority: 'normal'
    },
    {
      type: 'update',
      title: 'Student Record Updated',
      description: 'Bulk update completed for 2,500 student records',
      timestamp: new Date(Date.now() - 1800000),
      priority: 'normal'
    },
    {
      type: 'system',
      title: 'System Backup',
      description: 'Daily backup completed successfully',
      timestamp: new Date(Date.now() - 21600000),
      priority: 'low'
    },
    {
      type: 'alert',
      title: 'Performance Alert',
      description: 'Database query response time increased by 15%',
      timestamp: new Date(Date.now() - 43200000),
      priority: 'high'
    }
  ];

  // Mock analytics data
  const enrollmentTrendsData = [
    { name: 'Jan', value: 2650000 },
    { name: 'Feb', value: 2680000 },
    { name: 'Mar', value: 2720000 },
    { name: 'Apr', value: 2750000 },
    { name: 'May', value: 2780000 },
    { name: 'Jun', value: 2810000 },
    { name: 'Jul', value: 2847392 }
  ];

  const performanceMetricsData = [
    { name: 'Excellent', value: 35 },
    { name: 'Good', value: 28 },
    { name: 'Average', value: 22 },
    { name: 'Below Average', value: 10 },
    { name: 'Poor', value: 5 }
  ];

  const regionalComparisonData = [
    { name: 'Lagos', value: 450000 },
    { name: 'Kano', value: 380000 },
    { name: 'Oyo', value: 320000 },
    { name: 'Kaduna', value: 290000 },
    { name: 'Rivers', value: 250000 },
    { name: 'Ogun', value: 220000 }
  ];

  // Auto-refresh data every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    navigate('/login');
  };

  const handleQuickAction = (actionId) => {
    switch (actionId) {
      case 'approve-schools': console.log('Navigate to school approvals');
        break;
      case 'manage-users': console.log('Navigate to user management');
        break;
      case 'generate-reports': console.log('Navigate to reports');
        break;
      case 'system-settings': console.log('Navigate to settings');
        break;
      case 'backup-data': console.log('Initiate backup');
        break;
      case 'broadcast-news': console.log('Navigate to news broadcast');
        break;
      default:
        console.log('Unknown action:', actionId);
    }
  };

  const renderOverviewContent = () => (
    <>
      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {metricsData?.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric?.title}
            value={metric?.value}
            change={metric?.change}
            changeType={metric?.changeType}
            icon={metric?.icon}
            color={metric?.color}
          />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left Section - Activities and Notifications */}
        <div className="xl:col-span-4 space-y-6">
          <ActivityFeed activities={recentActivities} />
        </div>

        {/* Center Section - Analytics Charts */}
        <div className="xl:col-span-5 space-y-6">
          <AnalyticsChart
            type="line"
            title="Enrollment Trends"
            data={enrollmentTrendsData}
            height={300}
          />
          <AnalyticsChart
            type="bar"
            title="Regional Comparison"
            data={regionalComparisonData}
            height={250}
          />
        </div>

        {/* Right Section - Quick Actions */}
        <div className="xl:col-span-3 space-y-6">
          <QuickActionsPanel onActionClick={handleQuickAction} />
          <div className="bg-card border border-border rounded-lg shadow-elevation p-4">
            <h3 className="text-lg font-semibold text-card-foreground mb-4 flex items-center">
              <Icon name="PieChart" size={20} className="mr-2 text-primary" />
              Performance Distribution
            </h3>
            <AnalyticsChart
              type="pie"
              title=""
              data={performanceMetricsData}
              height={200}
            />
          </div>
        </div>
      </div>
    </>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'schools':
        return (
          <div className="bg-card border border-border rounded-lg shadow-elevation p-8">
            <div className="text-center">
              <Icon name="Building" size={48} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold text-card-foreground mb-2">Schools Management</h3>
              <p className="text-muted-foreground mb-6">
                Manage school registrations, approvals, and institutional operations
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-medium text-card-foreground">Pending Approvals</h4>
                  <p className="text-2xl font-bold text-warning mt-2">12</p>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-medium text-card-foreground">Active Schools</h4>
                  <p className="text-2xl font-bold text-success mt-2">15,847</p>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-medium text-card-foreground">New Registrations</h4>
                  <p className="text-2xl font-bold text-primary mt-2">23</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'students':
        return (
          <div className="bg-card border border-border rounded-lg shadow-elevation p-8">
            <div className="text-center">
              <Icon name="Users" size={48} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold text-card-foreground mb-2">Student Records</h3>
              <p className="text-muted-foreground mb-6">
                Manage student enrollment, academic records, and LIN generation
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-medium text-card-foreground">Total Students</h4>
                  <p className="text-2xl font-bold text-primary mt-2">2,847,392</p>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-medium text-card-foreground">New Enrollments</h4>
                  <p className="text-2xl font-bold text-success mt-2">15,247</p>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-medium text-card-foreground">LINs Generated</h4>
                  <p className="text-2xl font-bold text-warning mt-2">1,892</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'analytics':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AnalyticsChart
                type="line"
                title="Monthly Enrollment Trends"
                data={enrollmentTrendsData}
                height={300}
              />
              <AnalyticsChart
                type="pie"
                title="Performance Distribution"
                data={performanceMetricsData}
                height={300}
              />
            </div>
            <AnalyticsChart
              type="bar"
              title="Regional Student Distribution"
              data={regionalComparisonData}
              height={350}
            />
          </div>
        );
      case 'settings':
        return (
          <div className="bg-card border border-border rounded-lg shadow-elevation p-8">
            <div className="text-center">
              <Icon name="Settings" size={48} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold text-card-foreground mb-2">System Settings</h3>
              <p className="text-muted-foreground mb-6">
                Configure platform parameters, user permissions, and system preferences
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mx-auto">
                <div className="p-4 border border-border rounded-lg text-left">
                  <Icon name="Shield" size={24} className="text-primary mb-2" />
                  <h4 className="font-medium text-card-foreground">Security Settings</h4>
                  <p className="text-sm text-muted-foreground">Manage authentication and access controls</p>
                </div>
                <div className="p-4 border border-border rounded-lg text-left">
                  <Icon name="Database" size={24} className="text-success mb-2" />
                  <h4 className="font-medium text-card-foreground">Data Management</h4>
                  <p className="text-sm text-muted-foreground">Configure backup and data retention policies</p>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return renderOverviewContent();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Global Header */}
      <GlobalHeader 
        user={currentUser}
        onLogout={handleLogout}
        notifications={notifications}
      />
      {/* Portal Navigation */}
      <PortalNavigation 
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      {/* Main Content */}
      <main className={`pt-16 transition-all duration-300 ${
        sidebarCollapsed ? 'lg:pl-16' : 'lg:pl-64'
      }`}>
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Administrator Dashboard</h1>
                <p className="text-muted-foreground">
                  Comprehensive oversight of the educational system
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Last updated</p>
                  <p className="text-sm font-medium text-foreground">
                    {lastUpdated?.toLocaleTimeString('en-NG', { 
                      hour: '2-digit', 
                      minute: '2-digit',
                      timeZone: 'Africa/Lagos'
                    })}
                  </p>
                </div>
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
              </div>
            </div>
          </div>

          {/* Critical Alerts */}
          <AlertBanner alerts={criticalAlerts} />

          {/* Navigation Tabs */}
          <NavigationTabs 
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {/* Tab Content */}
          {renderTabContent()}
        </div>
      </main>
    </div>
  );
};

export default AdministratorDashboard;