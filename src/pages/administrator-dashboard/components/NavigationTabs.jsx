import React from 'react';
import Icon from '../../../components/AppIcon';

const NavigationTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      icon: 'LayoutDashboard',
      description: 'System overview and key metrics'
    },
    {
      id: 'schools',
      label: 'Schools Management',
      icon: 'Building',
      description: 'Manage school registrations and operations'
    },
    {
      id: 'students',
      label: 'Student Records',
      icon: 'Users',
      description: 'Student enrollment and academic records'
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: 'TrendingUp',
      description: 'Performance metrics and data insights'
    },
    {
      id: 'settings',
      label: 'System Settings',
      icon: 'Settings',
      description: 'Platform configuration and preferences'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation mb-6">
      <div className="flex overflow-x-auto">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => onTabChange(tab?.id)}
            className={`flex-1 min-w-0 px-6 py-4 text-left transition-smooth border-b-2 ${
              activeTab === tab?.id
                ? 'border-primary bg-primary/5 text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Icon 
                name={tab?.icon} 
                size={20} 
                className={activeTab === tab?.id ? 'text-primary' : 'text-muted-foreground'}
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm truncate">{tab?.label}</h3>
                <p className="text-xs opacity-75 truncate mt-0.5">{tab?.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default NavigationTabs;