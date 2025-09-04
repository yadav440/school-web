import React from 'react';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl shadow-elevation-3">
          <Icon name="GraduationCap" size={40} color="white" />
        </div>
      </div>
      <h1 className="text-3xl font-semibold text-foreground mb-3">
        Welcome to SchoolHub
      </h1>
      <p className="text-muted-foreground text-lg mb-2">
        Your comprehensive educational management platform
      </p>
      <p className="text-sm text-muted-foreground">
        Streamlining education through innovative technology
      </p>
      {/* Current Date Display */}
      <div className="mt-4 inline-flex items-center space-x-2 px-3 py-1 bg-muted/50 rounded-full">
        <Icon name="Calendar" size={14} className="text-primary" />
        <span className="text-xs text-muted-foreground">
          {new Date()?.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </span>
      </div>
    </div>
  );
};

export default LoginHeader;