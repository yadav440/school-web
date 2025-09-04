import React from 'react';
import Icon from '../AppIcon';


const QuickActionsPanel = ({ userRole = 'administrator', onActionClick }) => {
  const quickActions = {
    administrator: [
      {
        id: 'add-student',
        title: 'Add Student',
        description: 'Register new student',
        icon: 'UserPlus',
        color: 'bg-primary',
        action: () => onActionClick?.('add-student') || console.log('Add student')
      },
      {
        id: 'add-teacher',
        title: 'Add Teacher',
        description: 'Register new teacher',
        icon: 'GraduationCap',
        color: 'bg-secondary',
        action: () => onActionClick?.('add-teacher') || console.log('Add teacher')
      },
      {
        id: 'view-reports',
        title: 'View Reports',
        description: 'Academic performance',
        icon: 'BarChart3',
        color: 'bg-accent',
        action: () => onActionClick?.('view-reports') || console.log('View reports')
      },
      {
        id: 'manage-classes',
        title: 'Manage Classes',
        description: 'Class schedules & rooms',
        icon: 'Calendar',
        color: 'bg-success',
        action: () => onActionClick?.('manage-classes') || console.log('Manage classes')
      },
      {
        id: 'system-settings',
        title: 'System Settings',
        description: 'Configure system',
        icon: 'Settings',
        color: 'bg-warning',
        action: () => onActionClick?.('system-settings') || console.log('System settings')
      },
      {
        id: 'announcements',
        title: 'Announcements',
        description: 'School-wide messages',
        icon: 'Megaphone',
        color: 'bg-primary',
        action: () => onActionClick?.('announcements') || console.log('Announcements')
      }
    ],
    teacher: [
      {
        id: 'grade-assignment',
        title: 'Grade Assignment',
        description: 'Review & grade work',
        icon: 'BookOpen',
        color: 'bg-primary',
        action: () => onActionClick?.('grade-assignment') || console.log('Grade assignment')
      },
      {
        id: 'create-assignment',
        title: 'Create Assignment',
        description: 'New homework/test',
        icon: 'PlusCircle',
        color: 'bg-secondary',
        action: () => onActionClick?.('create-assignment') || console.log('Create assignment')
      },
      {
        id: 'attendance',
        title: 'Take Attendance',
        description: 'Mark student presence',
        icon: 'CheckSquare',
        color: 'bg-success',
        action: () => onActionClick?.('attendance') || console.log('Take attendance')
      },
      {
        id: 'message-parents',
        title: 'Message Parents',
        description: 'Send updates',
        icon: 'MessageSquare',
        color: 'bg-accent',
        action: () => onActionClick?.('message-parents') || console.log('Message parents')
      },
      {
        id: 'lesson-plan',
        title: 'Lesson Plans',
        description: 'Plan curriculum',
        icon: 'FileText',
        color: 'bg-warning',
        action: () => onActionClick?.('lesson-plan') || console.log('Lesson plans')
      },
      {
        id: 'class-roster',
        title: 'Class Roster',
        description: 'View student list',
        icon: 'Users',
        color: 'bg-secondary',
        action: () => onActionClick?.('class-roster') || console.log('Class roster')
      }
    ],
    student: [
      {
        id: 'view-assignments',
        title: 'View Assignments',
        description: 'Homework & projects',
        icon: 'BookOpen',
        color: 'bg-primary',
        action: () => onActionClick?.('view-assignments') || console.log('View assignments')
      },
      {
        id: 'check-grades',
        title: 'Check Grades',
        description: 'Academic progress',
        icon: 'TrendingUp',
        color: 'bg-success',
        action: () => onActionClick?.('check-grades') || console.log('Check grades')
      },
      {
        id: 'submit-assignment',
        title: 'Submit Work',
        description: 'Upload assignments',
        icon: 'Upload',
        color: 'bg-accent',
        action: () => onActionClick?.('submit-assignment') || console.log('Submit assignment')
      },
      {
        id: 'view-schedule',
        title: 'Class Schedule',
        description: 'Daily timetable',
        icon: 'Calendar',
        color: 'bg-secondary',
        action: () => onActionClick?.('view-schedule') || console.log('View schedule')
      },
      {
        id: 'library-books',
        title: 'Library Books',
        description: 'Borrowed books',
        icon: 'Book',
        color: 'bg-warning',
        action: () => onActionClick?.('library-books') || console.log('Library books')
      },
      {
        id: 'announcements',
        title: 'Announcements',
        description: 'School updates',
        icon: 'Bell',
        color: 'bg-primary',
        action: () => onActionClick?.('announcements') || console.log('View announcements')
      }
    ]
  };

  const actions = quickActions?.[userRole] || [];

  return (
    <div className="bg-card rounded-lg border border-border shadow-elevation-1 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-card-foreground">Quick Actions</h2>
          <p className="text-sm text-muted-foreground">
            Frequently used functions for {userRole}s
          </p>
        </div>
        <Icon name="Zap" size={20} className="text-accent" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {actions?.map((action) => (
          <button
            key={action?.id}
            onClick={action?.action}
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
            <span className="text-card-foreground font-medium">
              {userRole === 'administrator' ? 'View Reports' : 
               userRole === 'teacher'? 'Grade Assignment' : 'Check Grades'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActionsPanel;