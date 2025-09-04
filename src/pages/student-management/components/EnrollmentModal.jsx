import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const EnrollmentModal = ({ isOpen, onClose, onEnroll }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Student Information
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    grade: '',
    class: '',
    studentId: '',
    
    // Contact Information
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    
    // Parent/Guardian Information
    parentFirstName: '',
    parentLastName: '',
    parentEmail: '',
    parentPhone: '',
    relationship: '',
    emergencyContact: '',
    emergencyPhone: '',
    
    // Academic Information
    previousSchool: '',
    transferReason: '',
    specialNeeds: '',
    medicalConditions: '',
    allergies: ''
  });

  const [errors, setErrors] = useState({});

  const steps = [
    { id: 1, title: 'Student Info', icon: 'User' },
    { id: 2, title: 'Contact Details', icon: 'MapPin' },
    { id: 3, title: 'Parent/Guardian', icon: 'Users' },
    { id: 4, title: 'Academic Info', icon: 'BookOpen' },
    { id: 5, title: 'Review', icon: 'CheckCircle' }
  ];

  const gradeOptions = [
    { value: 'Pre-K', label: 'Pre-K' },
    { value: 'Kindergarten', label: 'Kindergarten' },
    { value: '1st Grade', label: '1st Grade' },
    { value: '2nd Grade', label: '2nd Grade' },
    { value: '3rd Grade', label: '3rd Grade' },
    { value: '4th Grade', label: '4th Grade' },
    { value: '5th Grade', label: '5th Grade' },
    { value: '6th Grade', label: '6th Grade' },
    { value: '7th Grade', label: '7th Grade' },
    { value: '8th Grade', label: '8th Grade' },
    { value: '9th Grade', label: '9th Grade' },
    { value: '10th Grade', label: '10th Grade' },
    { value: '11th Grade', label: '11th Grade' },
    { value: '12th Grade', label: '12th Grade' }
  ];

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
    { value: 'prefer-not-to-say', label: 'Prefer not to say' }
  ];

  const classOptions = [
    { value: 'Class A', label: 'Class A' },
    { value: 'Class B', label: 'Class B' },
    { value: 'Class C', label: 'Class C' },
    { value: 'Class D', label: 'Class D' },
    { value: 'Advanced', label: 'Advanced' },
    { value: 'Remedial', label: 'Remedial' }
  ];

  const relationshipOptions = [
    { value: 'mother', label: 'Mother' },
    { value: 'father', label: 'Father' },
    { value: 'guardian', label: 'Guardian' },
    { value: 'grandparent', label: 'Grandparent' },
    { value: 'other', label: 'Other' }
  ];

  const stateOptions = [
    { value: 'AL', label: 'Alabama' },
    { value: 'AK', label: 'Alaska' },
    { value: 'AZ', label: 'Arizona' },
    { value: 'AR', label: 'Arkansas' },
    { value: 'CA', label: 'California' },
    { value: 'CO', label: 'Colorado' },
    { value: 'CT', label: 'Connecticut' },
    { value: 'DE', label: 'Delaware' },
    { value: 'FL', label: 'Florida' },
    { value: 'GA', label: 'Georgia' }
  ];

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

  const validateStep = (step) => {
    const newErrors = {};
    
    switch (step) {
      case 1:
        if (!formData?.firstName) newErrors.firstName = 'First name is required';
        if (!formData?.lastName) newErrors.lastName = 'Last name is required';
        if (!formData?.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
        if (!formData?.gender) newErrors.gender = 'Gender is required';
        if (!formData?.grade) newErrors.grade = 'Grade is required';
        break;
      case 2:
        if (!formData?.email) newErrors.email = 'Email is required';
        if (!formData?.phone) newErrors.phone = 'Phone is required';
        if (!formData?.address) newErrors.address = 'Address is required';
        if (!formData?.city) newErrors.city = 'City is required';
        if (!formData?.state) newErrors.state = 'State is required';
        if (!formData?.zipCode) newErrors.zipCode = 'ZIP code is required';
        break;
      case 3:
        if (!formData?.parentFirstName) newErrors.parentFirstName = 'Parent first name is required';
        if (!formData?.parentLastName) newErrors.parentLastName = 'Parent last name is required';
        if (!formData?.parentEmail) newErrors.parentEmail = 'Parent email is required';
        if (!formData?.parentPhone) newErrors.parentPhone = 'Parent phone is required';
        if (!formData?.relationship) newErrors.relationship = 'Relationship is required';
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Generate student ID
      const studentId = `STU${Date.now()?.toString()?.slice(-6)}`;
      const enrollmentData = {
        ...formData,
        studentId,
        enrollmentDate: new Date()?.toISOString(),
        status: 'Active'
      };
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      await onEnroll(enrollmentData);
      onClose();
      
    } catch (error) {
      console.error('Enrollment failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="First Name"
                name="firstName"
                value={formData?.firstName}
                onChange={handleInputChange}
                error={errors?.firstName}
                required
              />
              <Input
                label="Last Name"
                name="lastName"
                value={formData?.lastName}
                onChange={handleInputChange}
                error={errors?.lastName}
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Date of Birth"
                type="date"
                name="dateOfBirth"
                value={formData?.dateOfBirth}
                onChange={handleInputChange}
                error={errors?.dateOfBirth}
                required
              />
              <Select
                label="Gender"
                options={genderOptions}
                value={formData?.gender}
                onChange={(value) => handleSelectChange('gender', value)}
                error={errors?.gender}
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Grade Level"
                options={gradeOptions}
                value={formData?.grade}
                onChange={(value) => handleSelectChange('grade', value)}
                error={errors?.grade}
                required
              />
              <Select
                label="Class Assignment"
                options={classOptions}
                value={formData?.class}
                onChange={(value) => handleSelectChange('class', value)}
                placeholder="Select class (optional)"
              />
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Email Address"
                type="email"
                name="email"
                value={formData?.email}
                onChange={handleInputChange}
                error={errors?.email}
                required
              />
              <Input
                label="Phone Number"
                type="tel"
                name="phone"
                value={formData?.phone}
                onChange={handleInputChange}
                error={errors?.phone}
                required
              />
            </div>
            <Input
              label="Street Address"
              name="address"
              value={formData?.address}
              onChange={handleInputChange}
              error={errors?.address}
              required
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="City"
                name="city"
                value={formData?.city}
                onChange={handleInputChange}
                error={errors?.city}
                required
              />
              <Select
                label="State"
                options={stateOptions}
                value={formData?.state}
                onChange={(value) => handleSelectChange('state', value)}
                error={errors?.state}
                required
              />
              <Input
                label="ZIP Code"
                name="zipCode"
                value={formData?.zipCode}
                onChange={handleInputChange}
                error={errors?.zipCode}
                required
              />
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Parent/Guardian First Name"
                name="parentFirstName"
                value={formData?.parentFirstName}
                onChange={handleInputChange}
                error={errors?.parentFirstName}
                required
              />
              <Input
                label="Parent/Guardian Last Name"
                name="parentLastName"
                value={formData?.parentLastName}
                onChange={handleInputChange}
                error={errors?.parentLastName}
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Parent Email"
                type="email"
                name="parentEmail"
                value={formData?.parentEmail}
                onChange={handleInputChange}
                error={errors?.parentEmail}
                required
              />
              <Input
                label="Parent Phone"
                type="tel"
                name="parentPhone"
                value={formData?.parentPhone}
                onChange={handleInputChange}
                error={errors?.parentPhone}
                required
              />
            </div>
            <Select
              label="Relationship to Student"
              options={relationshipOptions}
              value={formData?.relationship}
              onChange={(value) => handleSelectChange('relationship', value)}
              error={errors?.relationship}
              required
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Emergency Contact Name"
                name="emergencyContact"
                value={formData?.emergencyContact}
                onChange={handleInputChange}
                placeholder="Full name"
              />
              <Input
                label="Emergency Contact Phone"
                type="tel"
                name="emergencyPhone"
                value={formData?.emergencyPhone}
                onChange={handleInputChange}
                placeholder="Phone number"
              />
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Previous School"
                name="previousSchool"
                value={formData?.previousSchool}
                onChange={handleInputChange}
                placeholder="School name (if applicable)"
              />
              <Input
                label="Transfer Reason"
                name="transferReason"
                value={formData?.transferReason}
                onChange={handleInputChange}
                placeholder="Reason for transfer"
              />
            </div>
            <Input
              label="Special Educational Needs"
              name="specialNeeds"
              value={formData?.specialNeeds}
              onChange={handleInputChange}
              placeholder="Any special accommodations needed"
            />
            <Input
              label="Medical Conditions"
              name="medicalConditions"
              value={formData?.medicalConditions}
              onChange={handleInputChange}
              placeholder="Any medical conditions to be aware of"
            />
            <Input
              label="Allergies"
              name="allergies"
              value={formData?.allergies}
              onChange={handleInputChange}
              placeholder="Food allergies, medication allergies, etc."
            />
          </div>
        );
        
      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-card-foreground mb-2">
                Review Enrollment Information
              </h3>
              <p className="text-sm text-muted-foreground">
                Please review all information before submitting the enrollment
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-card-foreground mb-2">Student Information</h4>
                  <div className="text-sm space-y-1">
                    <p><span className="text-muted-foreground">Name:</span> {formData?.firstName} {formData?.lastName}</p>
                    <p><span className="text-muted-foreground">Date of Birth:</span> {formData?.dateOfBirth}</p>
                    <p><span className="text-muted-foreground">Grade:</span> {formData?.grade}</p>
                    <p><span className="text-muted-foreground">Class:</span> {formData?.class || 'Not assigned'}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-card-foreground mb-2">Contact Information</h4>
                  <div className="text-sm space-y-1">
                    <p><span className="text-muted-foreground">Email:</span> {formData?.email}</p>
                    <p><span className="text-muted-foreground">Phone:</span> {formData?.phone}</p>
                    <p><span className="text-muted-foreground">Address:</span> {formData?.address}, {formData?.city}, {formData?.state} {formData?.zipCode}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-card-foreground mb-2">Parent/Guardian</h4>
                  <div className="text-sm space-y-1">
                    <p><span className="text-muted-foreground">Name:</span> {formData?.parentFirstName} {formData?.parentLastName}</p>
                    <p><span className="text-muted-foreground">Relationship:</span> {formData?.relationship}</p>
                    <p><span className="text-muted-foreground">Email:</span> {formData?.parentEmail}</p>
                    <p><span className="text-muted-foreground">Phone:</span> {formData?.parentPhone}</p>
                  </div>
                </div>
                
                {(formData?.specialNeeds || formData?.medicalConditions || formData?.allergies) && (
                  <div>
                    <h4 className="font-medium text-card-foreground mb-2">Special Notes</h4>
                    <div className="text-sm space-y-1">
                      {formData?.specialNeeds && <p><span className="text-muted-foreground">Special Needs:</span> {formData?.specialNeeds}</p>}
                      {formData?.medicalConditions && <p><span className="text-muted-foreground">Medical:</span> {formData?.medicalConditions}</p>}
                      {formData?.allergies && <p><span className="text-muted-foreground">Allergies:</span> {formData?.allergies}</p>}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-elevation-4 w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-card-foreground">Enroll New Student</h2>
            <p className="text-sm text-muted-foreground">Step {currentStep} of {steps?.length}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            disabled={isSubmitting}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 border-b border-border">
          <div className="flex items-center justify-between">
            {steps?.map((step, index) => (
              <div key={step?.id} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors ${
                  currentStep > step?.id 
                    ? 'bg-success border-success text-success-foreground' 
                    : currentStep === step?.id 
                    ? 'bg-primary border-primary text-primary-foreground' 
                    : 'border-border text-muted-foreground'
                }`}>
                  {currentStep > step?.id ? (
                    <Icon name="Check" size={16} />
                  ) : (
                    <Icon name={step?.icon} size={16} />
                  )}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  currentStep >= step?.id ? 'text-card-foreground' : 'text-muted-foreground'
                }`}>
                  {step?.title}
                </span>
                {index < steps?.length - 1 && (
                  <div className={`w-8 h-0.5 mx-4 ${
                    currentStep > step?.id ? 'bg-success' : 'bg-border'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-96">
          {renderStepContent()}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1 || isSubmitting}
            iconName="ChevronLeft"
            iconPosition="left"
          >
            Previous
          </Button>
          
          <div className="flex items-center space-x-3">
            {currentStep < 5 ? (
              <Button
                variant="default"
                onClick={handleNext}
                iconName="ChevronRight"
                iconPosition="right"
              >
                Next
              </Button>
            ) : (
              <Button
                variant="default"
                onClick={handleSubmit}
                loading={isSubmitting}
                iconName="UserPlus"
                iconPosition="left"
              >
                {isSubmitting ? 'Enrolling...' : 'Enroll Student'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentModal;