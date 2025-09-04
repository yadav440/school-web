import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const LoginFooter = () => {
  const handleSupport = () => {
    console.log('Contact support');
  };

  const handleSystemStatus = () => {
    console.log('System status');
  };

  const handleTerms = () => {
    console.log('Terms of service');
  };

  const handlePrivacy = () => {
    console.log('Privacy policy');
  };

  return (
    <div className="space-y-6">
      {/* Legal Links */}
      <div className="text-center text-xs text-muted-foreground">
        <p>
          By signing in, you agree to our{' '}
          <button 
            onClick={handleTerms}
            className="text-primary hover:underline focus:outline-none focus:underline"
          >
            Terms of Service
          </button>
          {' '}and{' '}
          <button 
            onClick={handlePrivacy}
            className="text-primary hover:underline focus:outline-none focus:underline"
          >
            Privacy Policy
          </button>
        </p>
      </div>
      {/* Support Section */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-3">Need help?</p>
        <div className="flex items-center justify-center space-x-4 text-sm">
          <Button
            variant="ghost"
            onClick={handleSupport}
            iconName="HelpCircle"
            iconPosition="left"
            className="text-xs px-3 py-1 h-auto"
          >
            Support
          </Button>
          <Button
            variant="ghost"
            onClick={handleSystemStatus}
            iconName="Activity"
            iconPosition="left"
            className="text-xs px-3 py-1 h-auto"
          >
            System Status
          </Button>
        </div>
      </div>
      {/* Contact Information */}
      <div className="bg-muted/30 rounded-lg p-4 text-center">
        <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="Phone" size={12} />
            <span>1-800-SCHOOL</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Mail" size={12} />
            <span>support@schoolhub.edu</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={12} />
            <span>24/7 Support</span>
          </div>
        </div>
      </div>
      {/* Copyright */}
      <div className="text-center text-xs text-muted-foreground">
        <p>&copy; {new Date()?.getFullYear()} SchoolHub. All rights reserved.</p>
      </div>
    </div>
  );
};

export default LoginFooter;