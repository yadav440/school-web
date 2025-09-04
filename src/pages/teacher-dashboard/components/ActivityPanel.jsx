import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ActivityPanel = ({ submissions, alerts, notifications }) => {
  const [activeSection, setActiveSection] = useState('submissions');

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - new Date(timestamp);
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const getSubmissionIcon = (type) => {
    switch (type) {
      case 'assignment': return 'FileText';
      case 'quiz': return 'HelpCircle';
      case 'project': return 'Folder';
      default: return 'File';
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'grade': return 'TrendingUp';
      case 'attendance': return 'UserCheck';
      case 'behavior': return 'AlertTriangle';
      default: return 'Info';
    }
  };

  const getAlertColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-error bg-error/10';
      case 'medium': return 'text-warning bg-warning/10';
      case 'low': return 'text-success bg-success/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-elevation-1">
      {/* Section Headers */}
      <div className="flex border-b border-border">
        <button
          onClick={() => setActiveSection('submissions')}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors duration-200 ${
            activeSection === 'submissions' ?'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-card-foreground'
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            <Icon name="Upload" size={14} />
            <span>Submissions</span>
            {submissions?.length > 0 && (
              <span className="bg-primary text-primary-foreground text-xs rounded-full px-2 py-0.5">
                {submissions?.length}
              </span>
            )}
          </div>
        </button>
        
        <button
          onClick={() => setActiveSection('alerts')}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors duration-200 ${
            activeSection === 'alerts' ?'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-card-foreground'
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            <Icon name="AlertCircle" size={14} />
            <span>Alerts</span>
            {alerts?.length > 0 && (
              <span className="bg-warning text-warning-foreground text-xs rounded-full px-2 py-0.5">
                {alerts?.length}
              </span>
            )}
          </div>
        </button>
        
        <button
          onClick={() => setActiveSection('messages')}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors duration-200 ${
            activeSection === 'messages' ?'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-card-foreground'
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            <Icon name="MessageSquare" size={14} />
            <span>Messages</span>
            {notifications?.filter(n => !n?.read)?.length > 0 && (
              <span className="bg-accent text-accent-foreground text-xs rounded-full px-2 py-0.5">
                {notifications?.filter(n => !n?.read)?.length}
              </span>
            )}
          </div>
        </button>
      </div>
      {/* Content */}
      <div className="p-4 max-h-96 overflow-y-auto">
        {activeSection === 'submissions' && (
          <div className="space-y-3">
            {submissions?.length === 0 ? (
              <div className="text-center py-6">
                <Icon name="Upload" size={24} className="text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No recent submissions</p>
              </div>
            ) : (
              submissions?.map((submission, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-surface rounded-lg hover:bg-muted/50 transition-colors duration-200">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name={getSubmissionIcon(submission?.type)} size={16} className="text-primary" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-medium text-card-foreground truncate">
                        {submission?.assignment}
                      </h4>
                      <span className="text-xs text-muted-foreground">
                        {formatTimeAgo(submission?.submittedAt)}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">
                      by {submission?.studentName}
                    </p>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-muted-foreground">
                        {submission?.class}
                      </span>
                      {submission?.isLate && (
                        <span className="text-xs px-1.5 py-0.5 bg-error/10 text-error rounded">
                          Late
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeSection === 'alerts' && (
          <div className="space-y-3">
            {alerts?.length === 0 ? (
              <div className="text-center py-6">
                <Icon name="AlertCircle" size={24} className="text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No alerts</p>
              </div>
            ) : (
              alerts?.map((alert, index) => (
                <div key={index} className={`flex items-start space-x-3 p-3 rounded-lg border ${getAlertColor(alert?.severity)}`}>
                  <div className="flex-shrink-0 mt-0.5">
                    <Icon name={getAlertIcon(alert?.type)} size={16} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-medium">
                        {alert?.title}
                      </h4>
                      <span className="text-xs opacity-75">
                        {formatTimeAgo(alert?.timestamp)}
                      </span>
                    </div>
                    <p className="text-xs opacity-90 mb-2">
                      {alert?.message}
                    </p>
                    {alert?.student && (
                      <p className="text-xs opacity-75">
                        Student: {alert?.student}
                      </p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeSection === 'messages' && (
          <div className="space-y-3">
            {notifications?.length === 0 ? (
              <div className="text-center py-6">
                <Icon name="MessageSquare" size={24} className="text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No messages</p>
              </div>
            ) : (
              notifications?.map((notification, index) => (
                <div key={index} className={`flex items-start space-x-3 p-3 bg-surface rounded-lg hover:bg-muted/50 transition-colors duration-200 ${
                  !notification?.read ? 'border-l-4 border-primary' : ''
                }`}>
                  <div className="flex-shrink-0 w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                    <Icon name="User" size={16} className="text-accent" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className={`text-sm font-medium ${!notification?.read ? 'text-card-foreground' : 'text-muted-foreground'}`}>
                        {notification?.from}
                      </h4>
                      <span className="text-xs text-muted-foreground">
                        {formatTimeAgo(notification?.timestamp)}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">
                      {notification?.subject}
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {notification?.preview}
                    </p>
                  </div>
                  
                  {!notification?.read && (
                    <div className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2"></div>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityPanel;