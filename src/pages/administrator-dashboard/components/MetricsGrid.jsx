import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsGrid = () => {
  const metrics = [
    {
      id: 'enrollment',
      title: 'Total Enrollment',
      value: '1,247',
      change: '+12',
      changeType: 'increase',
      percentage: '+2.4%',
      icon: 'Users',
      color: 'bg-primary',
      description: 'Active students'
    },
    {
      id: 'attendance',
      title: 'Attendance Rate',
      value: '94.2%',
      change: '+1.2%',
      changeType: 'increase',
      percentage: 'This week',
      icon: 'CheckCircle',
      color: 'bg-success',
      description: 'Daily average'
    },
    {
      id: 'staff',
      title: 'Staff Count',
      value: '89',
      change: '+3',
      changeType: 'increase',
      percentage: 'New hires',
      icon: 'GraduationCap',
      color: 'bg-secondary',
      description: 'Active teachers'
    },
    {
      id: 'revenue',
      title: 'Monthly Revenue',
      value: '$124,500',
      change: '-$2,300',
      changeType: 'decrease',
      percentage: '-1.8%',
      icon: 'DollarSign',
      color: 'bg-warning',
      description: 'Fee collection'
    },
    {
      id: 'courses',
      title: 'Active Courses',
      value: '156',
      change: '+8',
      changeType: 'increase',
      percentage: 'This semester',
      icon: 'BookOpen',
      color: 'bg-accent',
      description: 'Running classes'
    },
    {
      id: 'pending',
      title: 'Pending Tasks',
      value: '23',
      change: '-5',
      changeType: 'decrease',
      percentage: 'Today',
      icon: 'Clock',
      color: 'bg-error',
      description: 'Require attention'
    }
  ];

  const getTrendIcon = (changeType) => {
    return changeType === 'increase' ? 'TrendingUp' : 'TrendingDown';
  };

  const getTrendColor = (changeType) => {
    return changeType === 'increase' ? 'text-success' : 'text-error';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {metrics?.map((metric) => (
        <div
          key={metric?.id}
          className="bg-card rounded-lg border border-border shadow-elevation-1 p-6 hover:shadow-elevation-2 transition-all duration-200 animate-scaleHover"
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`flex-shrink-0 w-12 h-12 ${metric?.color} rounded-lg flex items-center justify-center`}>
              <Icon name={metric?.icon} size={24} color="white" />
            </div>
            <div className={`flex items-center space-x-1 ${getTrendColor(metric?.changeType)}`}>
              <Icon name={getTrendIcon(metric?.changeType)} size={16} />
              <span className="text-sm font-medium">{metric?.change}</span>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">
              {metric?.title}
            </h3>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold text-card-foreground">
                {metric?.value}
              </span>
              <span className={`text-sm font-medium ${getTrendColor(metric?.changeType)}`}>
                {metric?.percentage}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              {metric?.description}
            </p>
          </div>

          {/* Progress indicator for some metrics */}
          {metric?.id === 'attendance' && (
            <div className="mt-4">
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-success h-2 rounded-full transition-all duration-300"
                  style={{ width: '94.2%' }}
                ></div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MetricsGrid;