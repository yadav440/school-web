import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import AppImage from '../../../components/AppImage';

const TeacherCard = ({ teacher, onViewProfile, onDelete }) => {
  const handleViewProfile = () => {
    onViewProfile?.(teacher);
  };

  const handleDelete = (e) => {
    e?.stopPropagation();
    onDelete?.(teacher?.id);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success bg-success/10';
      case 'inactive': return 'text-muted-foreground bg-muted/10';
      case 'on-leave': return 'text-warning bg-warning/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  const formatExperience = (experience) => {
    if (!experience) return 'New';
    return experience?.includes('year') ? experience : `${experience} years`;
  };

  return (
    <div className="bg-surface rounded-lg border border-border hover:shadow-elevation-2 transition-all duration-200 animate-scaleHover overflow-hidden">
      {/* Profile Header */}
      <div className="relative">
        <div className="h-32 bg-gradient-to-br from-primary/20 to-secondary/20"></div>
        
        {/* Profile Photo */}
        <div className="absolute -bottom-8 left-6">
          <div className="w-16 h-16 rounded-full border-4 border-white bg-white shadow-elevation-1 overflow-hidden">
            {teacher?.photoUrl ? (
              <AppImage
                src={teacher?.photoUrl}
                alt={teacher?.name}
                className="w-full h-full object-cover"
                fallback={
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <Icon name="User" size={24} className="text-muted-foreground" />
                  </div>
                }
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <Icon name="User" size={24} className="text-muted-foreground" />
              </div>
            )}
          </div>
        </div>

        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(teacher?.status)}`}>
            {teacher?.status?.replace('-', ' ')?.toUpperCase()}
          </span>
        </div>

        {/* Media Indicators */}
        <div className="absolute bottom-4 right-4 flex space-x-2">
          {teacher?.photoUrl && (
            <div className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Icon name="Camera" size={14} className="text-success" />
            </div>
          )}
          {teacher?.videoUrl && (
            <div className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Icon name="Video" size={14} className="text-primary" />
            </div>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 pt-10">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-card-foreground mb-1">
            {teacher?.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-2">
            {teacher?.employeeId} • {teacher?.department}
          </p>
          <p className="text-sm text-card-foreground">
            {teacher?.subject}
          </p>
        </div>

        {/* Quick Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Experience:</span>
            <span className="text-card-foreground font-medium">
              {formatExperience(teacher?.experience)}
            </span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Classes:</span>
            <span className="text-card-foreground font-medium">
              {teacher?.classesAssigned?.length || 0}
            </span>
          </div>

          {teacher?.achievements?.length > 0 && (
            <div className="flex items-center space-x-1 mt-2">
              <Icon name="Award" size={14} className="text-accent" />
              <span className="text-xs text-accent font-medium">
                {teacher?.achievements?.length} Achievement{teacher?.achievements?.length !== 1 ? 's' : ''}
              </span>
            </div>
          )}
        </div>

        {/* Contact Info */}
        <div className="space-y-1 mb-4 text-xs text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Icon name="Mail" size={12} />
            <span className="truncate">{teacher?.email}</span>
          </div>
          {teacher?.phone && (
            <div className="flex items-center space-x-2">
              <Icon name="Phone" size={12} />
              <span>{teacher?.phone}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2 pt-4 border-t border-border">
          <Button
            variant="default"
            size="sm"
            onClick={handleViewProfile}
            iconName="Eye"
            iconPosition="left"
            className="flex-1 text-xs"
          >
            View Profile
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            iconName="Trash2"
            className="text-error hover:text-error hover:bg-error/10"
          />
        </div>
      </div>
    </div>
  );
};

export default TeacherCard;