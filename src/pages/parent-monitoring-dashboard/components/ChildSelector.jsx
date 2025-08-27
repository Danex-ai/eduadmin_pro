import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChildSelector = ({ children = [], selectedChild, onChildSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChildSelect = (child) => {
    onChildSelect(child);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2"
      >
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
          <Icon name="User" size={16} color="white" />
        </div>
        <div className="flex flex-col items-start">
          <span className="text-sm font-medium text-foreground">
            {selectedChild?.name || 'Select Child'}
          </span>
          <span className="text-xs text-muted-foreground">
            {selectedChild?.class || 'No class'}
          </span>
        </div>
        <Icon name="ChevronDown" size={16} className="text-muted-foreground" />
      </Button>
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-[899]" 
            onClick={() => setIsOpen(false)} 
          />
          <div className="absolute left-0 top-full mt-2 w-64 bg-popover border border-border rounded-lg shadow-elevation-lg z-modal">
            <div className="p-3 border-b border-border">
              <h3 className="font-medium text-popover-foreground">Select Child</h3>
            </div>
            <div className="py-2 max-h-64 overflow-y-auto">
              {children?.map((child) => (
                <button
                  key={child?.id}
                  onClick={() => handleChildSelect(child)}
                  className={`w-full px-3 py-3 text-left transition-smooth hover:bg-muted flex items-center space-x-3 ${
                    selectedChild?.id === child?.id ? 'bg-primary/10' : ''
                  }`}
                >
                  <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                    <Icon name="User" size={18} color="white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-popover-foreground">
                      {child?.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {child?.class} • {child?.school}
                    </div>
                  </div>
                  {selectedChild?.id === child?.id && (
                    <Icon name="Check" size={16} className="text-primary" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChildSelector;