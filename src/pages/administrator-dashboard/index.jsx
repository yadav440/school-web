import React, { useEffect, useState } from 'react';
import Header from '../../components/ui/Header';
import NotificationAlert from '../../components/ui/NotificationAlert';
import MetricsGrid from './components/MetricsGrid';
import QuickActionsGrid from './components/QuickActionsGrid';
import ActivityFeed from './components/ActivityFeed';
import UpcomingEvents from './components/UpcomingEvents';
import SystemAlerts from './components/SystemAlerts';
import EnrollmentChart from './components/EnrollmentChart';

const AdministratorDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userName, setUserName] = useState('Dr. Sarah Johnson');

  useEffect(() => {
    // Update time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    // Get user data from localStorage (mock authentication)
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setUserName(user?.name || 'Administrator');
    }

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header userRole="administrator" userName={userName} />

      {/* Main Content */}
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  Welcome back, {userName}
                </h1>
                <p className="text-muted-foreground">
                  {formatDate(currentTime)} • {formatTime(currentTime)}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <NotificationAlert userRole="administrator" />
              </div>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="mb-8">
            <MetricsGrid />
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <QuickActionsGrid />
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Activity Feed */}
            <div className="lg:col-span-1">
              <ActivityFeed />
            </div>

            {/* Upcoming Events */}
            <div className="lg:col-span-1">
              <UpcomingEvents />
            </div>
          </div>

          {/* Analytics and Alerts */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
            {/* Enrollment Chart */}
            <div className="xl:col-span-2">
              <EnrollmentChart />
            </div>

            {/* System Alerts */}
            <div className="xl:col-span-1">
              <SystemAlerts />
            </div>
          </div>

          {/* Footer Summary */}
          <div className="bg-card rounded-lg border border-border shadow-elevation-1 p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-card-foreground">1,247</h3>
                <p className="text-sm text-muted-foreground">Total Students</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-card-foreground">89</h3>
                <p className="text-sm text-muted-foreground">Faculty Members</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-card-foreground">156</h3>
                <p className="text-sm text-muted-foreground">Active Courses</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-card-foreground">94.2%</h3>
                <p className="text-sm text-muted-foreground">Attendance Rate</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdministratorDashboard;