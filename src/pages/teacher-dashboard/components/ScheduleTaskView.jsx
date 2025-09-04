import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ScheduleTaskView = ({ scheduleData, taskData }) => {
  const [activeTab, setActiveTab] = useState('schedule');

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error bg-error/10 border-error/20';
      case 'medium': return 'text-warning bg-warning/10 border-warning/20';
      case 'low': return 'text-success bg-success/10 border-success/20';
      default: return 'text-muted-foreground bg-muted/10 border-border';
    }
  };

  const formatTime = (time) => {
    return new Date(`2000-01-01 ${time}`)?.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-elevation-1">
      {/* Tab Headers */}
      <div className="flex border-b border-border">
        <button
          onClick={() => setActiveTab('schedule')}
          className={`flex-1 px-6 py-4 text-sm font-medium transition-colors duration-200 ${
            activeTab === 'schedule' ?'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-card-foreground'
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            <Icon name="Calendar" size={16} />
            <span>Today's Schedule</span>
          </div>
        </button>
        <button
          onClick={() => setActiveTab('tasks')}
          className={`flex-1 px-6 py-4 text-sm font-medium transition-colors duration-200 ${
            activeTab === 'tasks' ?'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-card-foreground'
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            <Icon name="CheckSquare" size={16} />
            <span>Pending Tasks</span>
            {taskData?.filter(task => !task?.completed)?.length > 0 && (
              <span className="bg-error text-error-foreground text-xs rounded-full px-2 py-0.5">
                {taskData?.filter(task => !task?.completed)?.length}
              </span>
            )}
          </div>
        </button>
      </div>
      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'schedule' && (
          <div className="space-y-4">
            {scheduleData?.length === 0 ? (
              <div className="text-center py-8">
                <Icon name="Calendar" size={32} className="text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">No classes scheduled for today</p>
              </div>
            ) : (
              scheduleData?.map((item, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-surface rounded-lg border border-border">
                  <div className="flex-shrink-0 text-center">
                    <div className="text-sm font-medium text-card-foreground">
                      {formatTime(item?.startTime)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatTime(item?.endTime)}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-card-foreground mb-1">
                      {item?.subject}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Grade {item?.grade} • Room {item?.room}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {item?.status === 'current' && (
                      <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                    )}
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      item?.status === 'current' ? 'bg-success/10 text-success' :
                      item?.status === 'upcoming'? 'bg-warning/10 text-warning' : 'bg-muted/20 text-muted-foreground'
                    }`}>
                      {item?.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'tasks' && (
          <div className="space-y-4">
            {taskData?.length === 0 ? (
              <div className="text-center py-8">
                <Icon name="CheckSquare" size={32} className="text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">No pending tasks</p>
              </div>
            ) : (
              taskData?.map((task, index) => (
                <div key={index} className={`flex items-start space-x-4 p-4 bg-surface rounded-lg border ${
                  task?.completed ? 'opacity-60' : ''
                }`}>
                  <div className="flex-shrink-0 mt-1">
                    <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                      task?.completed 
                        ? 'bg-success border-success' :'border-border hover:border-primary cursor-pointer'
                    }`}>
                      {task?.completed && (
                        <Icon name="Check" size={12} color="white" />
                      )}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className={`text-sm font-medium ${
                        task?.completed ? 'line-through text-muted-foreground' : 'text-card-foreground'
                      }`}>
                        {task?.title}
                      </h4>
                      <span className={`text-xs px-2 py-1 rounded-full border ${getPriorityColor(task?.priority)}`}>
                        {task?.priority}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      {task?.description}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Icon name="Clock" size={12} />
                        <span>Due: {task?.dueDate}</span>
                      </div>
                      {task?.class && (
                        <div className="flex items-center space-x-1">
                          <Icon name="BookOpen" size={12} />
                          <span>{task?.class}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleTaskView;