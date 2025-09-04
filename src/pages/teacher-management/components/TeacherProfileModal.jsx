import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';
import AppImage from '../../../components/AppImage';

const TeacherProfileModal = ({ isOpen, onClose, teacher, onUpdate, departments }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [photoPreview, setPhotoPreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const departmentOptions = departments?.map(dept => ({ value: dept, label: dept }));

  useEffect(() => {
    if (teacher) {
      setFormData({
        name: teacher?.name || '',
        email: teacher?.email || '',
        phone: teacher?.phone || '',
        department: teacher?.department || '',
        subject: teacher?.subject || '',
        qualification: teacher?.qualification || '',
        experience: teacher?.experience || '',
        bio: teacher?.bio || '',
        photoFile: null,
        videoFile: null
      });
      setPhotoPreview(teacher?.photoUrl);
      setVideoPreview(teacher?.videoUrl);
    }
  }, [teacher]);

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
    
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (type, e) => {
    const file = e?.target?.files?.[0];
    if (!file) return;

    const maxSize = type === 'photo' ? 5 * 1024 * 1024 : 50 * 1024 * 1024;
    if (file?.size > maxSize) {
      alert(`File size must be less than ${type === 'photo' ? '5MB' : '50MB'}`);
      return;
    }

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
      setPhotoPreview(teacher?.photoUrl);
    } else {
      setFormData(prev => ({ ...prev, videoFile: null }));
      if (videoPreview && videoPreview !== teacher?.videoUrl) {
        URL?.revokeObjectURL(videoPreview);
      }
      setVideoPreview(teacher?.videoUrl);
    }
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // In a real implementation, you would upload files to Supabase storage here
      await new Promise(resolve => setTimeout(resolve, 1000));

      const updatedTeacher = {
        ...teacher,
        ...formData,
        photoUrl: photoPreview,
        videoUrl: videoPreview
      };

      onUpdate?.(updatedTeacher);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating teacher:', error);
      alert('Error updating teacher. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: teacher?.name || '',
      email: teacher?.email || '',
      phone: teacher?.phone || '',
      department: teacher?.department || '',
      subject: teacher?.subject || '',
      qualification: teacher?.qualification || '',
      experience: teacher?.experience || '',
      bio: teacher?.bio || '',
      photoFile: null,
      videoFile: null
    });
    setPhotoPreview(teacher?.photoUrl);
    setVideoPreview(teacher?.videoUrl);
    setIsEditing(false);
    setErrors({});
  };

  const handleClose = () => {
    handleCancel();
    onClose?.();
  };

  if (!isOpen || !teacher) return null;

  return createPortal(
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg border border-border shadow-elevation-3 w-full max-w-6xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-card-foreground">Teacher Profile</h2>
            <p className="text-sm text-muted-foreground">
              {teacher?.employeeId} • {teacher?.department}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            {!isEditing && (
              <Button
                variant="outline"
                onClick={() => setIsEditing(true)}
                iconName="Edit"
                iconPosition="left"
              >
                Edit Profile
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              iconName="X"
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="p-6">
            {/* Profile Header */}
            <div className="flex flex-col lg:flex-row gap-6 mb-8">
              {/* Photo Section */}
              <div className="flex-shrink-0">
                <div className="w-48 h-48 rounded-lg overflow-hidden border-2 border-border bg-muted">
                  {photoPreview ? (
                    <AppImage
                      src={photoPreview}
                      alt={teacher?.name}
                      className="w-full h-full object-cover"
                      fallback={
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                          <Icon name="User" size={48} className="text-muted-foreground" />
                        </div>
                      }
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <Icon name="User" size={48} className="text-muted-foreground" />
                    </div>
                  )}
                </div>

                {isEditing && (
                  <div className="mt-4 space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => document?.getElementById('profile-photo-input')?.click()}
                      iconName="Camera"
                      iconPosition="left"
                      className="w-full"
                    >
                      Update Photo
                    </Button>
                    {photoPreview && photoPreview !== teacher?.photoUrl && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile('photo')}
                        iconName="X"
                        className="w-full text-error"
                      >
                        Remove Photo
                      </Button>
                    )}
                    <input
                      id="profile-photo-input"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange('photo', e)}
                      className="hidden"
                    />
                  </div>
                )}
              </div>

              {/* Basic Info */}
              <div className="flex-1">
                {isEditing ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Full Name *"
                      name="name"
                      value={formData?.name}
                      onChange={handleInputChange}
                      error={errors?.name}
                      leftIcon="User"
                    />

                    <Input
                      label="Email Address *"
                      name="email"
                      type="email"
                      value={formData?.email}
                      onChange={handleInputChange}
                      error={errors?.email}
                      leftIcon="Mail"
                    />

                    <Input
                      label="Phone Number"
                      name="phone"
                      type="tel"
                      value={formData?.phone}
                      onChange={handleInputChange}
                      leftIcon="Phone"
                    />

                    <Select
                      label="Department *"
                      options={departmentOptions}
                      value={formData?.department}
                      onChange={(value) => handleSelectChange('department', value)}
                      error={errors?.department}
                      leftIcon="Building"
                    />

                    <Input
                      label="Subject/Specialization *"
                      name="subject"
                      value={formData?.subject}
                      onChange={handleInputChange}
                      error={errors?.subject}
                      leftIcon="BookOpen"
                    />

                    <Input
                      label="Qualification *"
                      name="qualification"
                      value={formData?.qualification}
                      onChange={handleInputChange}
                      error={errors?.qualification}
                      leftIcon="GraduationCap"
                    />

                    <Input
                      label="Experience *"
                      name="experience"
                      value={formData?.experience}
                      onChange={handleInputChange}
                      error={errors?.experience}
                      leftIcon="Clock"
                    />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold text-card-foreground mb-2">
                        {teacher?.name}
                      </h3>
                      <p className="text-lg text-muted-foreground">
                        {teacher?.subject} • {teacher?.department}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Icon name="Mail" size={16} className="text-muted-foreground" />
                        <span className="text-sm text-card-foreground">{teacher?.email}</span>
                      </div>

                      {teacher?.phone && (
                        <div className="flex items-center space-x-2">
                          <Icon name="Phone" size={16} className="text-muted-foreground" />
                          <span className="text-sm text-card-foreground">{teacher?.phone}</span>
                        </div>
                      )}

                      <div className="flex items-center space-x-2">
                        <Icon name="GraduationCap" size={16} className="text-muted-foreground" />
                        <span className="text-sm text-card-foreground">{teacher?.qualification}</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Icon name="Clock" size={16} className="text-muted-foreground" />
                        <span className="text-sm text-card-foreground">{teacher?.experience} experience</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Icon name="Calendar" size={16} className="text-muted-foreground" />
                        <span className="text-sm text-card-foreground">
                          Joined {new Date(teacher?.joinDate)?.toLocaleDateString()}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Icon name="CheckCircle" size={16} className="text-success" />
                        <span className="text-sm text-success font-medium">
                          {teacher?.status?.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bio Section */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-card-foreground mb-3">Bio</h4>
              {isEditing ? (
                <textarea
                  name="bio"
                  value={formData?.bio}
                  onChange={handleInputChange}
                  placeholder="Brief description about the teacher..."
                  rows={4}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                />
              ) : (
                <p className="text-muted-foreground">
                  {teacher?.bio || 'No bio available.'}
                </p>
              )}
            </div>

            {/* Video Section */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-card-foreground mb-3">Introduction Video</h4>
              
              {videoPreview ? (
                <div className="relative">
                  <video
                    src={videoPreview}
                    controls
                    className="w-full max-w-md h-64 object-cover rounded-lg border border-border"
                  />
                  {isEditing && (
                    <div className="mt-4 space-y-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => document?.getElementById('profile-video-input')?.click()}
                        iconName="Video"
                        iconPosition="left"
                      >
                        Update Video
                      </Button>
                      {videoPreview !== teacher?.videoUrl && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile('video')}
                          iconName="X"
                          className="text-error ml-2"
                        >
                          Remove Video
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  {isEditing ? (
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors max-w-md">
                      <Icon name="Video" size={32} className="text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Upload introduction video (Max 50MB)
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => document?.getElementById('profile-video-input')?.click()}
                      >
                        Choose Video
                      </Button>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No introduction video available.</p>
                  )}
                </div>
              )}

              {isEditing && (
                <input
                  id="profile-video-input"
                  type="file"
                  accept="video/*"
                  onChange={(e) => handleFileChange('video', e)}
                  className="hidden"
                />
              )}
            </div>

            {/* Classes and Achievements */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Assigned Classes */}
              <div>
                <h4 className="text-lg font-semibold text-card-foreground mb-3">Assigned Classes</h4>
                {teacher?.classesAssigned?.length > 0 ? (
                  <div className="space-y-2">
                    {teacher?.classesAssigned?.map((className, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 p-2 bg-muted/50 rounded-lg"
                      >
                        <Icon name="BookOpen" size={16} className="text-primary" />
                        <span className="text-sm text-card-foreground">{className}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No classes assigned yet.</p>
                )}
              </div>

              {/* Achievements */}
              <div>
                <h4 className="text-lg font-semibold text-card-foreground mb-3">Achievements</h4>
                {teacher?.achievements?.length > 0 ? (
                  <div className="space-y-2">
                    {teacher?.achievements?.map((achievement, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 p-2 bg-muted/50 rounded-lg"
                      >
                        <Icon name="Award" size={16} className="text-accent" />
                        <span className="text-sm text-card-foreground">{achievement}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No achievements recorded yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSubmitting}
              iconName={isSubmitting ? "Loader2" : "Save"}
              iconPosition="left"
              className={isSubmitting ? "animate-spin" : ""}
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default TeacherProfileModal;