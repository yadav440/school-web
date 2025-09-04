import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const NotificationAlert = ({ userRole = 'administrator' }) => {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Mock notifications based on user role
  const mockNotifications = {
    administrator: [
      {
        id: 1,
        title: 'New Teacher Registration',
        message: 'Sarah Johnson has submitted her application for review.',
        type: 'info',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        read: false,
        priority: 'medium'
      },
      {
        id: 2,
        title: 'System Maintenance',
        message: 'Scheduled maintenance tonight from 11 PM to 2 AM.',
        type: 'warning',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        read: false,
        priority: 'high'
      },
      {
        id: 3,
        title: 'Monthly Report Ready',
        message: 'September academic performance report is available.',
        type: 'success',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        read: true,
        priority: 'low'
      }
    ],
    teacher: [
      {
        id: 1,
        title: 'Grade Submission Reminder',
        message: 'Math quiz grades are due by Friday, September 8th.',
        type: 'warning',
        timestamp: new Date(Date.now() - 45 * 60 * 1000),
        read: false,
        priority: 'high'
      },
      {
        id: 2,
        title: 'Parent Conference Request',
        message: 'Mrs. Smith requested a meeting about Alex\'s progress.',
        type: 'info',
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
        read: false,
        priority: 'medium'
      },
      {
        id: 3,
        title: 'New Assignment Template',
        message: 'Science department shared a new lab report template.',
        type: 'success',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
        read: true,
        priority: 'low'
      }
    ],
    student: [
      {
        id: 1,
        title: 'Assignment Due Tomorrow',
        message: 'History essay on World War II is due September 5th.',
        type: 'warning',
        timestamp: new Date(Date.now() - 20 * 60 * 1000),
        read: false,
        priority: 'high'
      },
      {
        id: 2,
        title: 'New Grade Posted',
        message: 'Your Math quiz grade has been posted: A-',
        type: 'success',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        read: false,
        priority: 'medium'
      },
      {
        id: 3,
        title: 'Library Book Reminder',
        message: 'Return "To Kill a Mockingbird" by September 10th.',
        type: 'info',
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
        read: true,
        priority: 'low'
      }
    ]
  };

  useEffect(() => {
    const roleNotifications = mockNotifications?.[userRole] || [];
    setNotifications(roleNotifications);
    setUnreadCount(roleNotifications?.filter(n => !n?.read)?.length);
  }, [userRole]);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success': return 'CheckCircle';
      case 'warning': return 'AlertTriangle';
      case 'error': return 'XCircle';
      default: return 'Info';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'success': return 'text-success';
      case 'warning': return 'text-warning';
      case 'error': return 'text-error';
      default: return 'text-primary';
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high': return 'bg-error text-error-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev?.map(notification => 
        notification?.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev?.map(notification => ({ ...notification, read: true }))
    );
    setUnreadCount(0);
  };

  const clearNotification = (id) => {
    setNotifications(prev => prev?.filter(n => n?.id !== id));
    const notification = notifications?.find(n => n?.id === id);
    if (notification && !notification?.read) {
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
  };

  return (
    <div className="relative">
      {/* Notification Bell */}
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2"
      >
        <Icon name="Bell" size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center animate-fadeIn">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </Button>
      {/* Notification Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-popover border border-border rounded-md shadow-elevation-3 animate-fadeIn z-50">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <h3 className="text-sm font-semibold text-popover-foreground">
              Notifications
            </h3>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                onClick={markAllAsRead}
                className="text-xs px-2 py-1 h-auto"
              >
                Mark all read
              </Button>
            )}
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications?.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Icon name="Bell" size={32} className="text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">No notifications</p>
              </div>
            ) : (
              notifications?.map((notification) => (
                <div
                  key={notification?.id}
                  className={`px-4 py-3 border-b border-border last:border-b-0 hover:bg-muted transition-colors duration-200 ${
                    !notification?.read ? 'bg-muted/50' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`flex-shrink-0 ${getNotificationColor(notification?.type)}`}>
                      <Icon name={getNotificationIcon(notification?.type)} size={16} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium text-popover-foreground truncate">
                          {notification?.title}
                        </p>
                        <div className="flex items-center space-x-2">
                          {notification?.priority === 'high' && (
                            <span className={`px-1.5 py-0.5 text-xs font-medium rounded ${getPriorityBadge(notification?.priority)}`}>
                              High
                            </span>
                          )}
                          <Button
                            variant="ghost"
                            onClick={() => clearNotification(notification?.id)}
                            className="p-1 h-auto opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Icon name="X" size={12} />
                          </Button>
                        </div>
                      </div>
                      
                      <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                        {notification?.message}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {formatTimestamp(notification?.timestamp)}
                        </span>
                        
                        {!notification?.read && (
                          <Button
                            variant="ghost"
                            onClick={() => markAsRead(notification?.id)}
                            className="text-xs px-2 py-1 h-auto"
                          >
                            Mark read
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {notifications?.length > 0 && (
            <div className="px-4 py-3 border-t border-border">
              <Button
                variant="ghost"
                onClick={() => {
                  console.log('View all notifications');
                  setIsOpen(false);
                }}
                className="w-full text-sm"
              >
                View all notifications
              </Button>
            </div>
          )}
        </div>
      )}
      {/* Click outside to close */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default NotificationAlert;