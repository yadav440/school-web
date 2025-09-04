import React from 'react';
import Icon from '../../../components/AppIcon';

const ClassOverviewCard = ({ classData, onViewClass }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success';
      case 'upcoming': return 'text-warning';
      case 'completed': return 'text-muted-foreground';
      default: return 'text-foreground';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'active': return 'bg-success/10';
      case 'upcoming': return 'bg-warning/10';
      case 'completed': return 'bg-muted/20';
      default: return 'bg-surface';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-elevation-1 p-6 hover:shadow-elevation-2 transition-all duration-200 animate-scaleHover">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-card-foreground mb-1">
            {classData?.subject}
          </h3>
          <p className="text-sm text-muted-foreground">
            Grade {classData?.grade} • {classData?.section}
          </p>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBg(classData?.status)} ${getStatusColor(classData?.status)}`}>
          {classData?.status}
        </div>
      </div>
      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Users" size={16} className="text-muted-foreground" />
            <span className="text-sm text-card-foreground">Students</span>
          </div>
          <span className="text-sm font-medium text-card-foreground">
            {classData?.enrolledStudents}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="BookOpen" size={16} className="text-muted-foreground" />
            <span className="text-sm text-card-foreground">Assignments</span>
          </div>
          <span className="text-sm font-medium text-card-foreground">
            {classData?.pendingAssignments}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} className="text-muted-foreground" />
            <span className="text-sm text-card-foreground">Next Class</span>
          </div>
          <span className="text-sm font-medium text-card-foreground">
            {classData?.nextClass}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          {classData?.recentActivity && (
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          )}
          <span className="text-xs text-muted-foreground">
            {classData?.recentActivity ? 'Recent activity' : 'No recent activity'}
          </span>
        </div>
        <button
          onClick={() => onViewClass(classData)}
          className="text-sm text-primary hover:text-primary/80 font-medium transition-colors duration-200"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ClassOverviewCard;