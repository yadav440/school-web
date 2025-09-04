import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BulkActions = ({ selectedStudents, onBulkAction, onClearSelection }) => {
  const [selectedAction, setSelectedAction] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const actionOptions = [
    { value: '', label: 'Select bulk action...' },
    { value: 'update-status', label: 'Update Status' },
    { value: 'assign-class', label: 'Assign to Class' },
    { value: 'send-message', label: 'Send Message to Parents' },
    { value: 'generate-report', label: 'Generate Report' },
    { value: 'export-data', label: 'Export Student Data' },
    { value: 'schedule-meeting', label: 'Schedule Parent Meeting' },
    { value: 'update-grade', label: 'Update Grade Level' },
    { value: 'archive', label: 'Archive Students' }
  ];

  const handleBulkAction = async () => {
    if (!selectedAction || selectedStudents?.length === 0) return;

    setIsProcessing(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      await onBulkAction(selectedAction, selectedStudents);
      setSelectedAction('');
      
    } catch (error) {
      console.error('Bulk action failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const getActionIcon = (action) => {
    switch (action) {
      case 'update-status': return 'RefreshCw';
      case 'assign-class': return 'Users';
      case 'send-message': return 'MessageSquare';
      case 'generate-report': return 'FileText';
      case 'export-data': return 'Download';
      case 'schedule-meeting': return 'Calendar';
      case 'update-grade': return 'TrendingUp';
      case 'archive': return 'Archive';
      default: return 'Settings';
    }
  };

  const getActionDescription = (action) => {
    switch (action) {
      case 'update-status': return 'Change enrollment status for selected students';
      case 'assign-class': return 'Move students to a different class or section';
      case 'send-message': return 'Send notification to parents of selected students';
      case 'generate-report': return 'Create academic report for selected students';
      case 'export-data': return 'Download student information as CSV/PDF';
      case 'schedule-meeting': return 'Schedule parent-teacher conferences';
      case 'update-grade': return 'Promote or change grade level';
      case 'archive': return 'Move students to archived status';
      default: return '';
    }
  };

  if (selectedStudents?.length === 0) {
    return null;
  }

  return (
    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6 animate-fadeIn">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Selection Info */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-full">
            <span className="text-sm font-medium text-primary-foreground">
              {selectedStudents?.length}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-card-foreground">
              {selectedStudents?.length} student{selectedStudents?.length !== 1 ? 's' : ''} selected
            </p>
            <p className="text-xs text-muted-foreground">
              Choose an action to apply to all selected students
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="min-w-64">
            <Select
              placeholder="Select bulk action..."
              options={actionOptions}
              value={selectedAction}
              onChange={setSelectedAction}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="default"
              onClick={handleBulkAction}
              disabled={!selectedAction || isProcessing}
              loading={isProcessing}
              iconName={selectedAction ? getActionIcon(selectedAction) : 'Play'}
              iconPosition="left"
            >
              {isProcessing ? 'Processing...' : 'Apply Action'}
            </Button>
            
            <Button
              variant="outline"
              onClick={onClearSelection}
              iconName="X"
              iconPosition="left"
              size="sm"
            >
              Clear
            </Button>
          </div>
        </div>
      </div>
      {/* Action Description */}
      {selectedAction && (
        <div className="mt-3 pt-3 border-t border-primary/20">
          <div className="flex items-center space-x-2 text-sm">
            <Icon name="Info" size={16} className="text-primary" />
            <span className="text-muted-foreground">
              {getActionDescription(selectedAction)}
            </span>
          </div>
        </div>
      )}
      {/* Quick Actions */}
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="text-xs text-muted-foreground mr-2">Quick actions:</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSelectedAction('update-status')}
          className="text-xs h-6 px-2"
        >
          Update Status
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSelectedAction('send-message')}
          className="text-xs h-6 px-2"
        >
          Message Parents
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSelectedAction('export-data')}
          className="text-xs h-6 px-2"
        >
          Export Data
        </Button>
      </div>
    </div>
  );
};

export default BulkActions;