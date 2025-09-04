import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickActionCard = ({ action, onActionClick }) => {
  const getActionColor = (type) => {
    switch (type) {
      case 'grade': return 'bg-primary';
      case 'assignment': return 'bg-secondary';
      case 'attendance': return 'bg-success';
      case 'communication': return 'bg-accent';
      default: return 'bg-muted';
    }
  };

  return (
    <button
      onClick={() => onActionClick(action)}
      className="group w-full bg-card rounded-lg border border-border shadow-elevation-1 p-6 hover:shadow-elevation-2 hover:border-primary/20 transition-all duration-200 animate-scaleHover text-left"
    >
      <div className="flex items-start space-x-4">
        <div className={`flex-shrink-0 w-12 h-12 ${getActionColor(action?.type)} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
          <Icon name={action?.icon} size={24} color="white" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-card-foreground group-hover:text-primary transition-colors duration-200 mb-1">
            {action?.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
            {action?.description}
          </p>
          
          {action?.badge && (
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-warning/10 text-warning">
                {action?.badge}
              </span>
            </div>
          )}
        </div>

        <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Icon name="ArrowRight" size={16} className="text-primary" />
        </div>
      </div>
    </button>
  );
};

export default QuickActionCard;