import React from 'react';
import Icon from '../../../components/AppIcon';

const NavigationTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'LayoutDashboard',
      description: 'Overview and quick actions'
    },
    {
      id: 'classes',
      label: 'My Classes',
      icon: 'Users',
      description: 'Manage your classes'
    },
    {
      id: 'lessons',
      label: 'Lesson Plans',
      icon: 'BookOpen',
      description: 'Create and manage lessons'
    },
    {
      id: 'records',
      label: 'Student Records',
      icon: 'FileText',
      description: 'Academic records and progress'
    },
    {
      id: 'resources',
      label: 'Resources',
      icon: 'FolderOpen',
      description: 'Teaching materials and tools'
    }
  ];

  return (
    <div className="bg-surface border-b border-border">
      <div className="px-6">
        <nav className="flex space-x-8 overflow-x-auto">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => onTabChange(tab?.id)}
              className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-smooth whitespace-nowrap ${
                activeTab === tab?.id
                  ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
              }`}
            >
              <Icon 
                name={tab?.icon} 
                size={18} 
                className={activeTab === tab?.id ? 'text-primary' : 'text-muted-foreground'} 
              />
              <div className="text-left">
                <div className="text-sm font-medium">{tab?.label}</div>
                <div className="text-xs opacity-75 hidden lg:block">{tab?.description}</div>
              </div>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default NavigationTabs;