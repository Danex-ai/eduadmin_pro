import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityBadges = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      title: 'SSL Secured',
      description: 'End-to-end encryption'
    },
    {
      icon: 'CheckCircle',
      title: 'FERPA Compliant',
      description: 'Educational privacy standards'
    },
    {
      icon: 'Award',
      title: 'Nigerian Ministry Certified',
      description: 'Government approved platform'
    }
  ];

  return (
    <div className="mt-8 pt-6 border-t border-border">
      <div className="text-center mb-4">
        <h3 className="text-sm font-medium text-foreground mb-2">
          Trusted & Secure Platform
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {securityFeatures?.map((feature, index) => (
          <div key={index} className="flex flex-col items-center text-center p-3 bg-muted/30 rounded-lg">
            <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center mb-2">
              <Icon name={feature?.icon} size={16} className="text-success" />
            </div>
            <h4 className="text-xs font-medium text-foreground mb-1">
              {feature?.title}
            </h4>
            <p className="text-xs text-muted-foreground">
              {feature?.description}
            </p>
          </div>
        ))}
      </div>
      {/* Trust Indicators */}
      <div className="mt-6 text-center">
        <p className="text-xs text-muted-foreground">
          Used by 500+ schools across Nigeria • 50,000+ active users
        </p>
      </div>
    </div>
  );
};

export default SecurityBadges;