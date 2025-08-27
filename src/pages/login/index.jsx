import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import SecurityBadges from './components/SecurityBadges';
import UserTypeGuide from './components/UserTypeGuide';

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (userData) => {
    setIsLoading(true);
    
    // Simulate authentication process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Store user data in localStorage for demo purposes
    localStorage.setItem('eduadmin_user', JSON.stringify({
      ...userData,
      loginTime: new Date()?.toISOString(),
      sessionId: Math.random()?.toString(36)?.substr(2, 9)
    }));
    
    setIsLoading(false);
  };

  return (
    <>
      <Helmet>
        <title>Login - EduAdmin Pro | Educational Administration Platform</title>
        <meta name="description" content="Sign in to EduAdmin Pro - Comprehensive cloud-based educational administration platform for public school system management and digitization." />
        <meta name="keywords" content="education, school management, student portal, teacher portal, parent portal, administrator dashboard, Nigeria education" />
      </Helmet>
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        
        {/* Educational Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-success/5 rounded-full blur-2xl" />
        </div>

        {/* Main Login Container */}
        <div className="relative w-full max-w-md">
          <div className="bg-surface border border-border rounded-2xl shadow-elevation-lg p-8">
            {/* Login Header */}
            <LoginHeader />

            {/* Login Form */}
            <LoginForm onLogin={handleLogin} isLoading={isLoading} />

            {/* User Type Guide */}
            <UserTypeGuide />

            {/* Security Badges */}
            <SecurityBadges />
          </div>

          {/* Footer Information */}
          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">
              © {new Date()?.getFullYear()} EduAdmin Pro. All rights reserved.
            </p>
            <div className="flex justify-center space-x-4 mt-2">
              <button className="text-xs text-muted-foreground hover:text-foreground transition-smooth">
                Privacy Policy
              </button>
              <button className="text-xs text-muted-foreground hover:text-foreground transition-smooth">
                Terms of Service
              </button>
              <button className="text-xs text-muted-foreground hover:text-foreground transition-smooth">
                Support
              </button>
            </div>
          </div>
        </div>

        {/* Loading Overlay */}
        {isLoading && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-modal">
            <div className="bg-surface rounded-lg p-6 flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
              <span className="text-foreground font-medium">Authenticating...</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default LoginPage;