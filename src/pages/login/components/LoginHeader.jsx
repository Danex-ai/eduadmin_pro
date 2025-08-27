import React from 'react';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  return (
    <div className="text-center mb-8">
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-elevation-lg">
          <Icon name="GraduationCap" size={32} color="white" />
        </div>
      </div>

      {/* Welcome Message */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-text-primary">
          Welcome to EduAdmin Pro
        </h1>
        <p className="text-muted-foreground">
          Sign in to access your educational portal
        </p>
      </div>

      {/* Platform Description */}
      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <p className="text-sm text-muted-foreground">
          Comprehensive cloud-based educational administration platform for public school system management and digitization.
        </p>
      </div>
    </div>
  );
};

export default LoginHeader;