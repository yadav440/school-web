import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SystemAlerts = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'warning',
      title: 'Server Maintenance Scheduled',
      message: 'System will be offline tonight from 11:00 PM to 2:00 AM for routine maintenance and updates.',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      priority: 'high',
      category: 'system',
      actionRequired: true,
      dismissed: false
    },
    {
      id: 2,
      type: 'error',
      title: 'Payment Gateway Issue',
      message: 'Fee payment processing is currently experiencing delays. IT team has been notified.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      priority: 'critical',
      category: 'financial',
      actionRequired: true,
      dismissed: false
    },
    {
      id: 3,
      type: 'info',
      title: 'New Feature Available',
      message: 'Parent communication portal has been updated with new messaging features and mobile app support.',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      priority: 'low',
      category: 'feature',
      actionRequired: false,
      dismissed: false
    },
    {
      id: 4,
      type: 'success',
      title: 'Backup Completed',
      message: 'Daily database backup completed successfully. All student and academic data is secure.',
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      priority: 'low',
      category: 'system',
      actionRequired: false,
      dismissed: false
    },
    {
      id: 5,
      type: 'warning',
      title: 'Storage Space Warning',
      message: 'Document storage is at 85% capacity. Consider archiving old files or upgrading storage.',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      priority: 'medium',
      category: 'system',
      actionRequired: true,
      dismissed: false
    }
  ]);

  const getAlertIcon = (type) => {
    switch (type) {
      case 'error': return 'XCircle';
      case 'warning': return 'AlertTriangle';
      case 'success': return 'CheckCircle';
      default: return 'Info';
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'error': return 'text-error';
      case 'warning': return 'text-warning';
      case 'success': return 'text-success';
      default: return 'text-primary';
    }
  };

  const getAlertBg = (type) => {
    switch (type) {
      case 'error': return 'bg-error/10 border-error/20';
      case 'warning': return 'bg-warning/10 border-warning/20';
      case 'success': return 'bg-success/10 border-success/20';
      default: return 'bg-primary/10 border-primary/20';
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'critical': return 'bg-error text-error-foreground';
      case 'high': return 'bg-warning text-warning-foreground';
      case 'medium': return 'bg-accent text-accent-foreground';
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

  const dismissAlert = (id) => {
    setAlerts(prev => prev?.map(alert => 
      alert?.id === id ? { ...alert, dismissed: true } : alert
    ));
  };

  const handleAction = (alert) => {
    console.log(`Handling action for alert: ${alert?.title}`);
    // In a real app, this would trigger specific actions based on alert type
  };

  const activeAlerts = alerts?.filter(alert => !alert?.dismissed);
  const criticalAlerts = activeAlerts?.filter(alert => alert?.priority === 'critical');

  return (
    <div className="bg-card rounded-lg border border-border shadow-elevation-1 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-card-foreground">System Alerts</h2>
          <p className="text-sm text-muted-foreground">
            Important notifications and system status
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {criticalAlerts?.length > 0 && (
            <span className="px-2 py-1 text-xs font-medium bg-error text-error-foreground rounded-full">
              {criticalAlerts?.length} Critical
            </span>
          )}
          <Button
            variant="outline"
            onClick={() => console.log('View all alerts')}
            iconName="Bell"
            iconPosition="left"
            className="text-sm"
          >
            View All
          </Button>
        </div>
      </div>
      {/* Alerts List */}
      <div className="space-y-4 max-h-80 overflow-y-auto">
        {activeAlerts?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="CheckCircle" size={32} className="text-success mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">All systems running smoothly</p>
          </div>
        ) : (
          activeAlerts?.map((alert) => (
            <div
              key={alert?.id}
              className={`p-4 rounded-lg border ${getAlertBg(alert?.type)} transition-all duration-200`}
            >
              <div className="flex items-start space-x-3">
                <div className={`flex-shrink-0 ${getAlertColor(alert?.type)}`}>
                  <Icon name={getAlertIcon(alert?.type)} size={20} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-sm font-medium text-card-foreground">
                      {alert?.title}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityBadge(alert?.priority)}`}>
                        {alert?.priority}
                      </span>
                      <Button
                        variant="ghost"
                        onClick={() => dismissAlert(alert?.id)}
                        className="p-1 h-auto"
                      >
                        <Icon name="X" size={14} />
                      </Button>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3">
                    {alert?.message}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span className="capitalize">{alert?.category}</span>
                      <span>{formatTimestamp(alert?.timestamp)}</span>
                    </div>

                    {alert?.actionRequired && (
                      <Button
                        variant="outline"
                        onClick={() => handleAction(alert)}
                        iconName="ArrowRight"
                        iconPosition="right"
                        className="text-xs px-3 py-1 h-auto"
                      >
                        Take Action
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {/* System Status Summary */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="space-y-1">
            <div className="flex items-center justify-center space-x-1">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-xs font-medium text-success">Online</span>
            </div>
            <p className="text-xs text-muted-foreground">Main System</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-center space-x-1">
              <div className="w-2 h-2 bg-warning rounded-full"></div>
              <span className="text-xs font-medium text-warning">Degraded</span>
            </div>
            <p className="text-xs text-muted-foreground">Payment Gateway</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-center space-x-1">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-xs font-medium text-success">Operational</span>
            </div>
            <p className="text-xs text-muted-foreground">Database</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-center space-x-1">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-xs font-medium text-success">Active</span>
            </div>
            <p className="text-xs text-muted-foreground">Backup System</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemAlerts;