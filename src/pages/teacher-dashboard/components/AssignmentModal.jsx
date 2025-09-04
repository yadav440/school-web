import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AssignmentModal = ({ isOpen, onClose, classes }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    class: '',
    dueDate: '',
    dueTime: '',
    points: '',
    type: 'assignment',
    attachments: []
  });

  const [errors, setErrors] = useState({});

  const assignmentTypes = [
    { value: 'assignment', label: 'Assignment' },
    { value: 'quiz', label: 'Quiz' },
    { value: 'test', label: 'Test' },
    { value: 'project', label: 'Project' },
    { value: 'homework', label: 'Homework' }
  ];

  const classOptions = classes?.map(cls => ({
    value: cls?.id,
    label: `${cls?.subject} - Grade ${cls?.grade} ${cls?.section}`
  }));

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e?.target?.files);
    setFormData(prev => ({
      ...prev,
      attachments: [...prev?.attachments, ...files]
    }));
  };

  const removeAttachment = (index) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev?.attachments?.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.title?.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData?.description?.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData?.class) {
      newErrors.class = 'Please select a class';
    }

    if (!formData?.dueDate) {
      newErrors.dueDate = 'Due date is required';
    }

    if (!formData?.dueTime) {
      newErrors.dueTime = 'Due time is required';
    }

    if (!formData?.points || formData?.points <= 0) {
      newErrors.points = 'Points must be greater than 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Handle assignment creation
    console.log('Creating assignment:', formData);
    
    // Reset form and close modal
    setFormData({
      title: '',
      description: '',
      class: '',
      dueDate: '',
      dueTime: '',
      points: '',
      type: 'assignment',
      attachments: []
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      {/* Modal */}
      <div className="relative bg-card rounded-lg border border-border shadow-elevation-4 w-full max-w-2xl max-h-[90vh] overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-card-foreground">Create Assignment</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Create a new assignment for your students
            </p>
          </div>
          <Button
            variant="ghost"
            onClick={onClose}
            iconName="X"
            className="p-2"
          />
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Input
                  label="Assignment Title"
                  type="text"
                  name="title"
                  placeholder="Enter assignment title"
                  value={formData?.title}
                  onChange={handleInputChange}
                  error={errors?.title}
                  required
                />
              </div>

              <Select
                label="Assignment Type"
                options={assignmentTypes}
                value={formData?.type}
                onChange={(value) => handleSelectChange('type', value)}
                error={errors?.type}
                required
              />

              <Select
                label="Class"
                placeholder="Select class"
                options={classOptions}
                value={formData?.class}
                onChange={(value) => handleSelectChange('class', value)}
                error={errors?.class}
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">
                Description *
              </label>
              <textarea
                name="description"
                placeholder="Enter assignment description and instructions"
                value={formData?.description}
                onChange={handleInputChange}
                rows={4}
                className={`w-full px-3 py-2 border rounded-md text-sm bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent ${
                  errors?.description ? 'border-error' : 'border-border'
                }`}
              />
              {errors?.description && (
                <p className="text-sm text-error mt-1">{errors?.description}</p>
              )}
            </div>

            {/* Due Date and Points */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="Due Date"
                type="date"
                name="dueDate"
                value={formData?.dueDate}
                onChange={handleInputChange}
                error={errors?.dueDate}
                required
              />

              <Input
                label="Due Time"
                type="time"
                name="dueTime"
                value={formData?.dueTime}
                onChange={handleInputChange}
                error={errors?.dueTime}
                required
              />

              <Input
                label="Points"
                type="number"
                name="points"
                placeholder="100"
                value={formData?.points}
                onChange={handleInputChange}
                error={errors?.points}
                required
                min="1"
              />
            </div>

            {/* File Attachments */}
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">
                Attachments
              </label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                  accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center space-y-2"
                >
                  <Icon name="Upload" size={24} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Click to upload files or drag and drop
                  </span>
                  <span className="text-xs text-muted-foreground">
                    PDF, DOC, TXT, JPG, PNG up to 10MB each
                  </span>
                </label>
              </div>

              {/* Attachment List */}
              {formData?.attachments?.length > 0 && (
                <div className="mt-4 space-y-2">
                  {formData?.attachments?.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-surface rounded-lg border border-border">
                      <div className="flex items-center space-x-3">
                        <Icon name="File" size={16} className="text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium text-card-foreground">{file?.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(file?.size / 1024 / 1024)?.toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => removeAttachment(index)}
                        iconName="X"
                        className="p-1 h-auto text-error hover:text-error/80"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border bg-surface">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="default"
            onClick={handleSubmit}
            iconName="Plus"
            iconPosition="left"
          >
            Create Assignment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssignmentModal;