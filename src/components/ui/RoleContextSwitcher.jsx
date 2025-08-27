import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const RoleContextSwitcher = ({ currentRole, availableRoles = [], onRoleSwitch, user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const roleConfig = {
    administrator: {
      label: 'Administrator',
      icon: 'Shield',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      description: 'System management and oversight',
      defaultPath: '/administrator-dashboard'
    },
    teacher: {
      label: 'Teacher',
      icon: 'Users',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      description: 'Classroom and curriculum management',
      defaultPath: '/teacher-portal'
    },
    student: {
      label: 'Student',
      icon: 'BookOpen',
      color: 'text-success',
      bgColor: 'bg-success/10',
      description: 'Learning and coursework access',
      defaultPath: '/student-learning-interface'
    },
    parent: {
      label: 'Parent',
      icon: 'Heart',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      description: 'Child progress monitoring',
      defaultPath: '/parent-monitoring-dashboard'
    }
  };

  const handleRoleSwitch = async (newRole) => {
    try {
      // Call the role switch handler if provided
      if (onRoleSwitch) {
        await onRoleSwitch(newRole);
      }

      // Navigate to the default path for the new role
      const config = roleConfig?.[newRole];
      if (config && config?.defaultPath) {
        navigate(config?.defaultPath);
      }

      setIsOpen(false);
    } catch (error) {
      console.error('Failed to switch role:', error);
    }
  };

  // Don't render if user doesn't have multiple roles
  if (!availableRoles || availableRoles?.length <= 1) {
    return null;
  }

  const currentConfig = roleConfig?.[currentRole];

  return (
    <div className="relative">
      {/* Current Role Display */}
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2"
      >
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${currentConfig?.bgColor || 'bg-muted'}`}>
          <Icon 
            name={currentConfig?.icon || 'User'} 
            size={16} 
            className={currentConfig?.color || 'text-muted-foreground'} 
          />
        </div>
        <div className="hidden md:flex flex-col items-start">
          <span className="text-sm font-medium text-foreground">
            {currentConfig?.label || 'Unknown Role'}
          </span>
          <span className="text-xs text-muted-foreground">Switch Role</span>
        </div>
        <Icon name="ChevronDown" size={16} className="text-muted-foreground" />
      </Button>
      {/* Role Switcher Dropdown */}
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-[899]" 
            onClick={() => setIsOpen(false)} 
          />
          <div className="absolute right-0 top-full mt-2 w-72 bg-popover border border-border rounded-lg shadow-elevation-lg z-modal">
            {/* Header */}
            <div className="p-4 border-b border-border">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="User" size={20} color="white" />
                </div>
                <div>
                  <h3 className="font-medium text-popover-foreground">
                    {user?.name || 'User'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Switch between your roles
                  </p>
                </div>
              </div>
            </div>

            {/* Available Roles */}
            <div className="py-2">
              {availableRoles?.map((role) => {
                const config = roleConfig?.[role];
                const isCurrentRole = role === currentRole;
                
                return (
                  <button
                    key={role}
                    onClick={() => handleRoleSwitch(role)}
                    disabled={isCurrentRole}
                    className={`w-full px-4 py-3 text-left transition-smooth flex items-center space-x-3 ${
                      isCurrentRole 
                        ? 'bg-primary/10 cursor-not-allowed' :'hover:bg-muted cursor-pointer'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      config?.bgColor || 'bg-muted'
                    }`}>
                      <Icon 
                        name={config?.icon || 'User'} 
                        size={18} 
                        className={config?.color || 'text-muted-foreground'} 
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-popover-foreground">
                          {config?.label || role}
                        </span>
                        {isCurrentRole && (
                          <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        {config?.description || 'Role description'}
                      </p>
                    </div>
                    {!isCurrentRole && (
                      <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Footer */}
            <div className="border-t border-border p-3">
              <p className="text-xs text-muted-foreground text-center">
                Role switching maintains your session security
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RoleContextSwitcher;