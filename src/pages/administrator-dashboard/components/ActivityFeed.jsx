import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActivityFeed = () => {
  const [filter, setFilter] = useState('all');

  const activities = [
    {
      id: 1,
      type: 'enrollment',
      title: 'New Student Enrollment',
      description: 'Sarah Johnson enrolled in Grade 10, Section A',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      priority: 'medium',
      status: 'completed',
      user: 'Registration Office',
      icon: 'UserPlus',
      color: 'text-primary'
    },
    {
      id: 2,
      type: 'approval',
      title: 'Teacher Application Pending',
      description: 'Michael Rodriguez - Mathematics Teacher position requires approval',
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      priority: 'high',
      status: 'pending',
      user: 'HR Department',
      icon: 'Clock',
      color: 'text-warning'
    },
    {
      id: 3,
      type: 'system',
      title: 'Grade Submission Deadline',
      description: 'Mid-term grades due by September 8th, 2024 - 15 teachers pending',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      priority: 'high',
      status: 'urgent',
      user: 'Academic Office',
      icon: 'AlertTriangle',
      color: 'text-error'
    },
    {
      id: 4,
      type: 'financial',
      title: 'Fee Payment Received',
      description: 'Emma Wilson - Semester fee payment of $2,500 processed',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      priority: 'low',
      status: 'completed',
      user: 'Finance Department',
      icon: 'DollarSign',
      color: 'text-success'
    },
    {
      id: 5,
      type: 'attendance',
      title: 'Low Attendance Alert',
      description: 'Grade 9B - Attendance dropped to 87% this week',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      priority: 'medium',
      status: 'review',
      user: 'Academic Coordinator',
      icon: 'Users',
      color: 'text-warning'
    },
    {
      id: 6,
      type: 'maintenance',
      title: 'System Backup Completed',
      description: 'Daily database backup completed successfully at 2:00 AM',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      priority: 'low',
      status: 'completed',
      user: 'IT Department',
      icon: 'Shield',
      color: 'text-success'
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Activities', count: activities?.length },
    { value: 'pending', label: 'Pending', count: activities?.filter(a => a?.status === 'pending')?.length },
    { value: 'urgent', label: 'Urgent', count: activities?.filter(a => a?.status === 'urgent')?.length },
    { value: 'completed', label: 'Completed', count: activities?.filter(a => a?.status === 'completed')?.length }
  ];

  const filteredActivities = filter === 'all' 
    ? activities 
    : activities?.filter(activity => activity?.status === filter);

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (minutes < 60) return `${minutes}m ago`;
    return `${hours}h ago`;
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high': return 'bg-error/10 text-error border-error/20';
      case 'medium': return 'bg-warning/10 text-warning border-warning/20';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed': return 'bg-success/10 text-success border-success/20';
      case 'pending': return 'bg-warning/10 text-warning border-warning/20';
      case 'urgent': return 'bg-error/10 text-error border-error/20';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-elevation-1 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-card-foreground">Recent Activity</h2>
          <p className="text-sm text-muted-foreground">
            System updates and notifications requiring attention
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => console.log('View all activities')}
          iconName="ExternalLink"
          iconPosition="right"
          className="text-sm"
        >
          View All
        </Button>
      </div>
      {/* Filter Tabs */}
      <div className="flex items-center space-x-1 mb-6 bg-muted rounded-lg p-1">
        {filterOptions?.map((option) => (
          <button
            key={option?.value}
            onClick={() => setFilter(option?.value)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              filter === option?.value
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <span>{option?.label}</span>
            <span className={`px-1.5 py-0.5 text-xs rounded-full ${
              filter === option?.value ? 'bg-primary text-primary-foreground' : 'bg-background text-muted-foreground'
            }`}>
              {option?.count}
            </span>
          </button>
        ))}
      </div>
      {/* Activities List */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredActivities?.map((activity) => (
          <div
            key={activity?.id}
            className="flex items-start space-x-4 p-4 bg-surface rounded-lg border border-border hover:border-primary/20 transition-all duration-200"
          >
            <div className={`flex-shrink-0 w-10 h-10 bg-background rounded-lg flex items-center justify-center ${activity?.color}`}>
              <Icon name={activity?.icon} size={18} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-sm font-medium text-card-foreground">
                  {activity?.title}
                </h3>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityBadge(activity?.priority)}`}>
                    {activity?.priority}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusBadge(activity?.status)}`}>
                    {activity?.status}
                  </span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {activity?.description}
              </p>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Icon name="User" size={12} />
                  <span>{activity?.user}</span>
                </div>
                <span>{formatTimestamp(activity?.timestamp)}</span>
              </div>
            </div>

            {activity?.status === 'pending' && (
              <div className="flex-shrink-0">
                <Button
                  variant="outline"
                  onClick={() => console.log(`Handle activity ${activity?.id}`)}
                  iconName="ArrowRight"
                  iconPosition="right"
                  className="text-xs px-3 py-1 h-auto"
                >
                  Review
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
      {filteredActivities?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Inbox" size={32} className="text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">No activities found</p>
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;