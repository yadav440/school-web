import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const AddTeacherModal = ({ isOpen, onClose, onSubmit, departments }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    subject: '',
    qualification: '',
    experience: '',
    bio: '',
    photoFile: null,
    videoFile: null
  });
  const [photoPreview, setPhotoPreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const departmentOptions = departments?.map(dept => ({ value: dept, label: dept }));

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData?.department) {
      newErrors.department = 'Department is required';
    }

    if (!formData?.subject?.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData?.qualification?.trim()) {
      newErrors.qualification = 'Qualification is required';
    }

    if (!formData?.experience?.trim()) {
      newErrors.experience = 'Experience is required';
    }

    setErrors(newErrors);
    return Object?.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user makes selection
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (type, e) => {
    const file = e?.target?.files?.[0];
    if (!file) return;

    // File size validation (5MB for photos, 50MB for videos)
    const maxSize = type === 'photo' ? 5 * 1024 * 1024 : 50 * 1024 * 1024;
    if (file?.size > maxSize) {
      alert(`File size must be less than ${type === 'photo' ? '5MB' : '50MB'}`);
      return;
    }

    // File type validation
    const allowedTypes = type === 'photo' 
      ? ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
      : ['video/mp4', 'video/webm', 'video/ogg'];

    if (!allowedTypes?.includes(file?.type)) {
      alert(`Please select a valid ${type} file`);
      return;
    }

    if (type === 'photo') {
      setFormData(prev => ({ ...prev, photoFile: file }));
      const reader = new FileReader();
      reader.onload = (e) => setPhotoPreview(e?.target?.result);
      reader?.readAsDataURL(file);
    } else {
      setFormData(prev => ({ ...prev, videoFile: file }));
      const url = URL?.createObjectURL(file);
      setVideoPreview(url);
    }
  };

  const removeFile = (type) => {
    if (type === 'photo') {
      setFormData(prev => ({ ...prev, photoFile: null }));
      setPhotoPreview(null);
    } else {
      setFormData(prev => ({ ...prev, videoFile: null }));
      if (videoPreview) {
        URL?.revokeObjectURL(videoPreview);
      }
      setVideoPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // In a real implementation, you would upload files to Supabase storage here
      // For now, we'll simulate the process
      await new Promise(resolve => setTimeout(resolve, 1000));

      const teacherData = {
        ...formData,
        photoUrl: photoPreview, // In real app, this would be the storage URL
        videoUrl: videoPreview  // In real app, this would be the storage URL
      };

      onSubmit?.(teacherData);
      handleClose();
    } catch (error) {
      console.error('Error adding teacher:', error);
      alert('Error adding teacher. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      department: '',
      subject: '',
      qualification: '',
      experience: '',
      bio: '',
      photoFile: null,
      videoFile: null
    });
    setPhotoPreview(null);
    if (videoPreview) {
      URL?.revokeObjectURL(videoPreview);
    }
    setVideoPreview(null);
    setErrors({});
    setIsSubmitting(false);
    onClose?.();
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg border border-border shadow-elevation-3 w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-card-foreground">Add New Teacher</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            iconName="X"
            disabled={isSubmitting}
          />
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-medium text-card-foreground mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Full Name *"
                  name="name"
                  value={formData?.name}
                  onChange={handleInputChange}
                  placeholder="Enter full name"
                  error={errors?.name}
                  leftIcon="User"
                />

                <Input
                  label="Email Address *"
                  name="email"
                  type="email"
                  value={formData?.email}
                  onChange={handleInputChange}
                  placeholder="Enter email address"
                  error={errors?.email}
                  leftIcon="Mail"
                />

                <Input
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={formData?.phone}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                  leftIcon="Phone"
                />

                <Select
                  label="Department *"
                  options={departmentOptions}
                  value={formData?.department}
                  onChange={(value) => handleSelectChange('department', value)}
                  placeholder="Select department"
                  error={errors?.department}
                  leftIcon="Building"
                />
              </div>
            </div>

            {/* Academic Information */}
            <div>
              <h3 className="text-lg font-medium text-card-foreground mb-4">Academic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Subject/Specialization *"
                  name="subject"
                  value={formData?.subject}
                  onChange={handleInputChange}
                  placeholder="e.g., Mathematics, Physics"
                  error={errors?.subject}
                  leftIcon="BookOpen"
                />

                <Input
                  label="Qualification *"
                  name="qualification"
                  value={formData?.qualification}
                  onChange={handleInputChange}
                  placeholder="e.g., PhD in Mathematics"
                  error={errors?.qualification}
                  leftIcon="GraduationCap"
                />

                <Input
                  label="Experience *"
                  name="experience"
                  value={formData?.experience}
                  onChange={handleInputChange}
                  placeholder="e.g., 5 years"
                  error={errors?.experience}
                  leftIcon="Clock"
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-card-foreground mb-2">
                  Bio/Description
                </label>
                <textarea
                  name="bio"
                  value={formData?.bio}
                  onChange={handleInputChange}
                  placeholder="Brief description about the teacher..."
                  rows={3}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                />
              </div>
            </div>

            {/* Media Uploads */}
            <div>
              <h3 className="text-lg font-medium text-card-foreground mb-4">Photos & Videos</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Photo Upload */}
                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">
                    Profile Photo
                  </label>
                  <div className="space-y-4">
                    {photoPreview ? (
                      <div className="relative">
                        <img
                          src={photoPreview}
                          alt="Photo preview"
                          className="w-full h-48 object-cover rounded-lg border border-border"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile('photo')}
                          iconName="X"
                          className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm"
                        />
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                        <Icon name="Camera" size={32} className="text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground mb-2">
                          Upload teacher photo (Max 5MB)
                        </p>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => document?.getElementById('photo-input')?.click()}
                        >
                          Choose Photo
                        </Button>
                      </div>
                    )}
                    
                    <input
                      id="photo-input"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange('photo', e)}
                      className="hidden"
                    />
                  </div>
                </div>

                {/* Video Upload */}
                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">
                    Introduction Video
                  </label>
                  <div className="space-y-4">
                    {videoPreview ? (
                      <div className="relative">
                        <video
                          src={videoPreview}
                          controls
                          className="w-full h-48 object-cover rounded-lg border border-border"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile('video')}
                          iconName="X"
                          className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm"
                        />
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                        <Icon name="Video" size={32} className="text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground mb-2">
                          Upload introduction video (Max 50MB)
                        </p>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => document?.getElementById('video-input')?.click()}
                        >
                          Choose Video
                        </Button>
                      </div>
                    )}
                    
                    <input
                      id="video-input"
                      type="file"
                      accept="video/*"
                      onChange={(e) => handleFileChange('video', e)}
                      className="hidden"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Icon name="Info" size={16} className="text-primary mt-0.5" />
                  <div className="text-sm text-muted-foreground">
                    <p className="mb-1">
                      <strong>Photo requirements:</strong> JPEG, PNG, WebP formats. Maximum 5MB.
                    </p>
                    <p>
                      <strong>Video requirements:</strong> MP4, WebM formats. Maximum 50MB.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            iconName={isSubmitting ? "Loader2" : "Plus"}
            iconPosition="left"
            className={isSubmitting ? "animate-spin" : ""}
          >
            {isSubmitting ? 'Adding Teacher...' : 'Add Teacher'}
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default AddTeacherModal;