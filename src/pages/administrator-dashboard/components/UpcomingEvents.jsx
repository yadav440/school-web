import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UpcomingEvents = () => {
  const events = [
    {
      id: 1,
      title: 'Parent-Teacher Conference',
      description: 'Quarterly academic progress discussions with parents',
      date: new Date('2024-09-15'),
      time: '9:00 AM - 5:00 PM',
      location: 'Main Auditorium',
      type: 'meeting',
      priority: 'high',
      attendees: 150,
      icon: 'Users',
      color: 'bg-primary'
    },
    {
      id: 2,
      title: 'Mid-term Examinations',
      description: 'Semester mid-term assessments for all grades',
      date: new Date('2024-09-20'),
      time: '8:00 AM - 12:00 PM',
      location: 'All Classrooms',
      type: 'academic',
      priority: 'high',
      attendees: 1247,
      icon: 'BookOpen',
      color: 'bg-warning'
    },
    {
      id: 3,
      title: 'Science Fair',
      description: 'Annual student science project exhibition',
      date: new Date('2024-09-25'),
      time: '10:00 AM - 4:00 PM',
      location: 'School Gymnasium',
      type: 'event',
      priority: 'medium',
      attendees: 300,
      icon: 'Beaker',
      color: 'bg-success'
    },
    {
      id: 4,
      title: 'Staff Development Workshop',
      description: 'Professional development training for teachers',
      date: new Date('2024-09-28'),
      time: '2:00 PM - 6:00 PM',
      location: 'Conference Room A',
      type: 'training',
      priority: 'medium',
      attendees: 89,
      icon: 'GraduationCap',
      color: 'bg-secondary'
    },
    {
      id: 5,
      title: 'School Board Meeting',
      description: 'Monthly governance and policy review meeting',
      date: new Date('2024-10-02'),
      time: '7:00 PM - 9:00 PM',
      location: 'Board Room',
      type: 'administrative',
      priority: 'high',
      attendees: 12,
      icon: 'Shield',
      color: 'bg-accent'
    }
  ];

  const formatDate = (date) => {
    const today = new Date();
    const diffTime = date - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays < 7) return `In ${diffDays} days`;
    
    return date?.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date?.getFullYear() !== today?.getFullYear() ? 'numeric' : undefined
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-error';
      case 'medium': return 'border-l-warning';
      default: return 'border-l-muted';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'meeting': return 'Users';
      case 'academic': return 'BookOpen';
      case 'event': return 'Calendar';
      case 'training': return 'GraduationCap';
      case 'administrative': return 'Shield';
      default: return 'Calendar';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-elevation-1 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-card-foreground">Upcoming Events</h2>
          <p className="text-sm text-muted-foreground">
            Important dates and deadlines
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => console.log('View calendar')}
          iconName="Calendar"
          iconPosition="left"
          className="text-sm"
        >
          View Calendar
        </Button>
      </div>
      {/* Events List */}
      <div className="space-y-4">
        {events?.map((event) => (
          <div
            key={event?.id}
            className={`relative p-4 bg-surface rounded-lg border-l-4 ${getPriorityColor(event?.priority)} hover:shadow-elevation-1 transition-all duration-200`}
          >
            <div className="flex items-start space-x-4">
              <div className={`flex-shrink-0 w-10 h-10 ${event?.color} rounded-lg flex items-center justify-center`}>
                <Icon name={event?.icon} size={18} color="white" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-sm font-medium text-card-foreground">
                    {event?.title}
                  </h3>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <Icon name="Clock" size={12} />
                    <span>{formatDate(event?.date)}</span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {event?.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={12} />
                    <span>{event?.time}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="MapPin" size={12} />
                    <span>{event?.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Users" size={12} />
                    <span>{event?.attendees} attendees</span>
                  </div>
                </div>
              </div>

              {/* Priority indicator */}
              {event?.priority === 'high' && (
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 bg-error rounded-full animate-pulse"></div>
                </div>
              )}
            </div>

            {/* Action buttons for high priority events */}
            {event?.priority === 'high' && (
              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  Requires preparation
                </span>
                <Button
                  variant="outline"
                  onClick={() => console.log(`Prepare for ${event?.title}`)}
                  iconName="ArrowRight"
                  iconPosition="right"
                  className="text-xs px-3 py-1 h-auto"
                >
                  Prepare
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Quick Add Event */}
      <div className="mt-6 pt-6 border-t border-border">
        <Button
          variant="ghost"
          onClick={() => console.log('Add new event')}
          iconName="Plus"
          iconPosition="left"
          fullWidth
          className="text-sm"
        >
          Add New Event
        </Button>
      </div>
    </div>
  );
};

export default UpcomingEvents;