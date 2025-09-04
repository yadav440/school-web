import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';
import Select from './Select';

const AuthForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const roleOptions = [
    { value: 'administrator', label: 'Administrator' },
    { value: 'teacher', label: 'Teacher' },
    { value: 'student', label: 'Student' },
    { value: 'parent', label: 'Parent' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleRoleChange = (value) => {
    setFormData(prev => ({
      ...prev,
      role: value
    }));
    
    if (errors?.role) {
      setErrors(prev => ({
        ...prev,
        role: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData?.role) {
      newErrors.role = 'Please select your role';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock authentication success
      const roleRoutes = {
        administrator: '/administrator-dashboard',
        teacher: '/teacher-dashboard',
        student: '/student-portal',
        parent: '/student-portal'
      };

      // Store user data in localStorage (in real app, use proper auth)
      localStorage.setItem('user', JSON.stringify({
        email: formData?.email,
        role: formData?.role,
        name: formData?.email?.split('@')?.[0]
      }));

      navigate(roleRoutes?.[formData?.role] || '/administrator-dashboard');
    } catch (error) {
      setErrors({ submit: 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    console.log('Forgot password clicked');
    // In real app, navigate to forgot password page
  };

  const handleGuestAccess = () => {
    // Demo access for different roles
    const demoUsers = [
      { role: 'administrator', email: 'admin@schoolhub.edu' },
      { role: 'teacher', email: 'teacher@schoolhub.edu' },
      { role: 'student', email: 'student@schoolhub.edu' }
    ];

    const randomUser = demoUsers?.[Math.floor(Math.random() * demoUsers?.length)];
    
    setFormData({
      email: randomUser?.email,
      password: 'demo123',
      role: randomUser?.role,
      rememberMe: false
    });
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-xl shadow-elevation-2">
            <Icon name="GraduationCap" size={32} color="white" />
          </div>
        </div>
        <h1 className="text-2xl font-semibold text-foreground mb-2">
          Welcome to SchoolHub
        </h1>
        <p className="text-muted-foreground">
          Sign in to access your educational dashboard
        </p>
      </div>
      {/* Trust Indicators */}
      <div className="flex items-center justify-center space-x-6 mb-8 text-xs text-muted-foreground">
        <div className="flex items-center space-x-1">
          <Icon name="Shield" size={14} className="text-success" />
          <span>Secure Login</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="Lock" size={14} className="text-success" />
          <span>Encrypted</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="CheckCircle" size={14} className="text-success" />
          <span>Trusted</span>
        </div>
      </div>
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Role Selection */}
        <Select
          label="I am a..."
          placeholder="Select your role"
          options={roleOptions}
          value={formData?.role}
          onChange={handleRoleChange}
          error={errors?.role}
          required
          className="mb-4"
        />

        {/* Email Input */}
        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData?.email}
          onChange={handleInputChange}
          error={errors?.email}
          required
          className="mb-4"
        />

        {/* Password Input */}
        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData?.password}
          onChange={handleInputChange}
          error={errors?.password}
          required
          className="mb-4"
        />

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData?.rememberMe}
              onChange={handleInputChange}
              className="w-4 h-4 text-primary bg-input border-border rounded focus:ring-primary focus:ring-2"
            />
            <span className="text-sm text-foreground">Remember me</span>
          </label>
          
          <Button
            type="button"
            variant="link"
            onClick={handleForgotPassword}
            className="text-sm p-0 h-auto"
          >
            Forgot password?
          </Button>
        </div>

        {/* Submit Error */}
        {errors?.submit && (
          <div className="flex items-center space-x-2 text-sm text-error bg-error/10 border border-error/20 rounded-md p-3">
            <Icon name="AlertCircle" size={16} />
            <span>{errors?.submit}</span>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          variant="default"
          loading={isLoading}
          fullWidth
          iconName={isLoading ? undefined : "LogIn"}
          iconPosition="right"
          className="mt-6"
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </Button>

        {/* Demo Access */}
        <div className="text-center">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or</span>
            </div>
          </div>
          
          <Button
            type="button"
            variant="outline"
            onClick={handleGuestAccess}
            fullWidth
            iconName="Eye"
            iconPosition="left"
            className="mt-4"
          >
            Try Demo Access
          </Button>
        </div>
      </form>
      {/* Footer */}
      <div className="mt-8 text-center text-xs text-muted-foreground">
        <p>
          By signing in, you agree to our{' '}
          <button className="text-primary hover:underline">Terms of Service</button>
          {' '}and{' '}
          <button className="text-primary hover:underline">Privacy Policy</button>
        </p>
      </div>
      {/* Support */}
      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground mb-2">Need help?</p>
        <div className="flex items-center justify-center space-x-4 text-sm">
          <Button
            variant="ghost"
            onClick={() => console.log('Contact support')}
            iconName="HelpCircle"
            iconPosition="left"
            className="text-xs px-3 py-1 h-auto"
          >
            Support
          </Button>
          <Button
            variant="ghost"
            onClick={() => console.log('System status')}
            iconName="Activity"
            iconPosition="left"
            className="text-xs px-3 py-1 h-auto"
          >
            Status
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;