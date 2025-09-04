import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AssignmentManager = ({ assignments, onAddAssignment, onUpdateAssignment, onDeleteAssignment }) => {
  const [isAddingAssignment, setIsAddingAssignment] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    maxPoints: '',
    dueDate: '',
    description: ''
  });

  const assignmentTypes = [
    { value: 'homework', label: 'Homework' },
    { value: 'quiz', label: 'Quiz' },
    { value: 'test', label: 'Test' },
    { value: 'project', label: 'Project' },
    { value: 'participation', label: 'Participation' },
    { value: 'extra_credit', label: 'Extra Credit' }
  ];

  const resetForm = () => {
    setFormData({
      title: '',
      type: '',
      maxPoints: '',
      dueDate: '',
      description: ''
    });
    setIsAddingAssignment(false);
    setEditingAssignment(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTypeChange = (value) => {
    setFormData(prev => ({
      ...prev,
      type: value
    }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    if (!formData?.title || !formData?.type || !formData?.maxPoints || !formData?.dueDate) {
      return;
    }

    const assignmentData = {
      ...formData,
      maxPoints: parseInt(formData?.maxPoints),
      id: editingAssignment ? editingAssignment?.id : Date.now()
    };

    if (editingAssignment) {
      onUpdateAssignment(assignmentData);
    } else {
      onAddAssignment(assignmentData);
    }

    resetForm();
  };

  const handleEdit = (assignment) => {
    setFormData({
      title: assignment?.title,
      type: assignment?.type,
      maxPoints: assignment?.maxPoints?.toString(),
      dueDate: assignment?.dueDate,
      description: assignment?.description || ''
    });
    setEditingAssignment(assignment);
    setIsAddingAssignment(true);
  };

  const handleDelete = (assignmentId) => {
    if (window.confirm('Are you sure you want to delete this assignment? This will remove all associated grades.')) {
      onDeleteAssignment(assignmentId);
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'homework': return 'BookOpen';
      case 'quiz': return 'FileText';
      case 'test': return 'ClipboardCheck';
      case 'project': return 'Folder';
      case 'participation': return 'Users';
      case 'extra_credit': return 'Star';
      default: return 'FileText';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'homework': return 'bg-primary text-primary-foreground';
      case 'quiz': return 'bg-secondary text-secondary-foreground';
      case 'test': return 'bg-error text-error-foreground';
      case 'project': return 'bg-accent text-accent-foreground';
      case 'participation': return 'bg-success text-success-foreground';
      case 'extra_credit': return 'bg-warning text-warning-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-elevation-1 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-card-foreground">Assignment Manager</h2>
          <p className="text-sm text-muted-foreground">
            Create and manage assignments for your gradebook
          </p>
        </div>
        <Button
          variant="default"
          onClick={() => setIsAddingAssignment(true)}
          iconName="Plus"
          iconPosition="left"
        >
          Add Assignment
        </Button>
      </div>
      {/* Assignment Form */}
      {isAddingAssignment && (
        <div className="mb-6 p-4 bg-muted/20 rounded-lg border border-border">
          <h3 className="text-md font-medium text-card-foreground mb-4">
            {editingAssignment ? 'Edit Assignment' : 'New Assignment'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Assignment Title"
                name="title"
                value={formData?.title}
                onChange={handleInputChange}
                placeholder="Enter assignment title"
                required
              />
              
              <Select
                label="Assignment Type"
                options={assignmentTypes}
                value={formData?.type}
                onChange={handleTypeChange}
                placeholder="Select type"
                required
              />
              
              <Input
                label="Maximum Points"
                name="maxPoints"
                type="number"
                value={formData?.maxPoints}
                onChange={handleInputChange}
                placeholder="100"
                min="1"
                max="1000"
                required
              />
              
              <Input
                label="Due Date"
                name="dueDate"
                type="date"
                value={formData?.dueDate}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <Input
              label="Description (Optional)"
              name="description"
              value={formData?.description}
              onChange={handleInputChange}
              placeholder="Assignment description or instructions"
            />
            
            <div className="flex items-center space-x-3">
              <Button type="submit" variant="default">
                {editingAssignment ? 'Update Assignment' : 'Create Assignment'}
              </Button>
              <Button type="button" variant="outline" onClick={resetForm}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}
      {/* Assignments List */}
      <div className="space-y-3">
        {assignments?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="FileText" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No assignments created yet</p>
            <p className="text-sm text-muted-foreground">Click "Add Assignment" to get started</p>
          </div>
        ) : (
          assignments?.map((assignment) => (
            <div
              key={assignment?.id}
              className="flex items-center justify-between p-4 bg-surface rounded-lg border border-border hover:shadow-elevation-1 transition-shadow"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getTypeColor(assignment?.type)}`}>
                  <Icon name={getTypeIcon(assignment?.type)} size={20} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium text-card-foreground">{assignment?.title}</h3>
                    <span className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-full capitalize">
                      {assignment?.type?.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                    <span>Due: {assignment?.dueDate}</span>
                    <span>•</span>
                    <span>{assignment?.maxPoints} points</span>
                    {assignment?.description && (
                      <>
                        <span>•</span>
                        <span className="truncate max-w-xs">{assignment?.description}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  onClick={() => handleEdit(assignment)}
                  iconName="Edit"
                  className="p-2"
                />
                <Button
                  variant="ghost"
                  onClick={() => handleDelete(assignment?.id)}
                  iconName="Trash2"
                  className="p-2 text-error hover:text-error"
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AssignmentManager;