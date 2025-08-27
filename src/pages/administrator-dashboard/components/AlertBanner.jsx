import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertBanner = ({ alerts = [] }) => {
  const [dismissedAlerts, setDismissedAlerts] = useState(new Set());

  const handleDismiss = (alertId) => {
    setDismissedAlerts(prev => new Set([...prev, alertId]));
  };

  const getAlertStyles = (severity) => {
    const styles = {
      critical: 'bg-error/10 border-error/20 text-error',
      warning: 'bg-warning/10 border-warning/20 text-warning',
      info: 'bg-primary/10 border-primary/20 text-primary',
      success: 'bg-success/10 border-success/20 text-success'
    };
    return styles?.[severity] || styles?.info;
  };

  const getAlertIcon = (severity) => {
    const icons = {
      critical: 'AlertTriangle',
      warning: 'AlertCircle',
      info: 'Info',
      success: 'CheckCircle'
    };
    return icons?.[severity] || 'Info';
  };

  const visibleAlerts = alerts?.filter(alert => !dismissedAlerts?.has(alert?.id));

  if (visibleAlerts?.length === 0) return null;

  return (
    <div className="space-y-3 mb-6">
      {visibleAlerts?.map((alert) => (
        <div
          key={alert?.id}
          className={`border rounded-lg p-4 ${getAlertStyles(alert?.severity)}`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <Icon 
                name={getAlertIcon(alert?.severity)} 
                size={20} 
                className="mt-0.5 flex-shrink-0"
              />
              <div className="flex-1">
                <h4 className="font-medium text-sm mb-1">{alert?.title}</h4>
                <p className="text-sm opacity-90">{alert?.message}</p>
                {alert?.actions && alert?.actions?.length > 0 && (
                  <div className="flex space-x-2 mt-3">
                    {alert?.actions?.map((action, index) => (
                      <Button
                        key={index}
                        variant={action?.primary ? "default" : "outline"}
                        size="sm"
                        onClick={action?.onClick}
                        className="text-xs"
                      >
                        {action?.label}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={() => handleDismiss(alert?.id)}
              className="p-1 hover:bg-black/10 rounded transition-smooth"
            >
              <Icon name="X" size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlertBanner;