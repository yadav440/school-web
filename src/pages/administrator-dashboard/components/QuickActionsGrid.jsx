import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';


const QuickActionsGrid = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      id: 'student-enrollment',
      title: 'Student Enrollment',
      description: 'Register new students and manage admissions',
      icon: 'UserPlus',
      color: 'bg-primary',
      route: '/student-management',
      stats: '12 pending'
    },
    {
      id: 'teacher-management',
      title: 'Teacher Management',
      description: 'Manage teacher profiles, photos, and videos',
      icon: 'Users',
      color: 'bg-secondary',
      route: '/teacher-management',
      stats: '89 teachers'
    },
    {
      id: 'course-scheduling',
      title: 'Course Scheduling',
      description: 'Create and manage class schedules',
      icon: 'Calendar',
      color: 'bg-accent',
      action: () => console.log('Course scheduling'),
      stats: '8 conflicts'
    },
    {
      id: 'grade-management',
      title: 'Grade Management',
      description: 'Oversee academic performance and reports',
      icon: 'BookOpen',
      color: 'bg-success',
      route: '/grade-book',
      stats: '156 submissions'
    },
    {
      id: 'financial-reports',
      title: 'Financial Reports',
      description: 'View revenue, expenses, and fee collection',
      icon: 'BarChart3',
      color: 'bg-warning',
      action: () => console.log('Financial reports'),
      stats: '$124.5K collected'
    },
    {
      id: 'system-settings',
      title: 'System Settings',
      description: 'Configure school policies and preferences',
      icon: 'Settings',
      color: 'bg-muted',
      action: () => console.log('System settings'),
      stats: '2 updates available'
    }
  ];

  const handleActionClick = (action) => {
    if (action?.route) {
      navigate(action?.route);
    } else if (action?.action) {
      action?.action();
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-elevation-1 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-card-foreground">Quick Actions</h2>
          <p className="text-sm text-muted-foreground">
            Frequently used administrative functions
          </p>
        </div>
        <Icon name="Zap" size={20} className="text-accent" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickActions?.map((action) => (
          <button
            key={action?.id}
            onClick={() => handleActionClick(action)}
            className="group relative p-4 bg-surface rounded-lg border border-border hover:border-primary/20 hover:shadow-elevation-2 transition-all duration-200 animate-scaleHover text-left"
          >
            <div className="flex items-start space-x-3">
              <div className={`flex-shrink-0 w-10 h-10 ${action?.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                <Icon name={action?.icon} size={20} color="white" />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-card-foreground group-hover:text-primary transition-colors duration-200">
                  {action?.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {action?.description}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs font-medium text-primary">
                    {action?.stats}
                  </span>
                </div>
              </div>
            </div>

            {/* Hover indicator */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Icon name="ArrowRight" size={14} className="text-primary" />
            </div>
          </button>
        ))}
      </div>
      {/* Usage Statistics */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Most used today:</span>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span className="text-card-foreground font-medium">Student Enrollment</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActionsGrid;