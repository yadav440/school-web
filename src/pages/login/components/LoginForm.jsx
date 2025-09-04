import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const LoginForm = () => {
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
    { value: 'parent', label: 'Parent' },
    { value: 'support', label: 'Support Staff' }
  ];

  // Mock credentials for different roles
  const mockCredentials = {
    administrator: { email: 'admin@schoolhub.edu', password: 'admin123' },
    teacher: { email: 'teacher@schoolhub.edu', password: 'teacher123' },
    student: { email: 'student@schoolhub.edu', password: 'student123' },
    parent: { email: 'parent@schoolhub.edu', password: 'parent123' },
    support: { email: 'support@schoolhub.edu', password: 'support123' }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
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
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Check mock credentials
      const mockCred = mockCredentials?.[formData?.role];
      if (formData?.email !== mockCred?.email || formData?.password !== mockCred?.password) {
        setErrors({ 
          submit: `Invalid credentials. Use ${mockCred?.email} with password ${mockCred?.password}` 
        });
        setIsLoading(false);
        return;
      }

      const roleRoutes = {
        administrator: '/administrator-dashboard',
        teacher: '/teacher-dashboard',
        student: '/student-portal',
        parent: '/student-portal',
        support: '/administrator-dashboard'
      };

      localStorage.setItem('user', JSON.stringify({
        email: formData?.email,
        role: formData?.role,
        name: formData?.email?.split('@')?.[0],
        loginTime: new Date()?.toISOString()
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
  };

  const handleRegister = () => {
    console.log('Register new account clicked');
  };

  const fillDemoCredentials = (role) => {
    const cred = mockCredentials?.[role];
    setFormData(prev => ({
      ...prev,
      email: cred?.email,
      password: cred?.password,
      role: role
    }));
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
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

        {errors?.submit && (
          <div className="flex items-center space-x-2 text-sm text-error bg-error/10 border border-error/20 rounded-md p-3">
            <Icon name="AlertCircle" size={16} />
            <span>{errors?.submit}</span>
          </div>
        )}

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
            onClick={handleRegister}
            fullWidth
            iconName="UserPlus"
            iconPosition="left"
            className="mt-4"
          >
            Register New Account
          </Button>
        </div>

        {/* Demo Credentials */}
        <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border">
          <p className="text-xs text-muted-foreground mb-3 text-center">Quick Demo Access:</p>
          <div className="grid grid-cols-2 gap-2">
            {Object.keys(mockCredentials)?.slice(0, 4)?.map((role) => (
              <Button
                key={role}
                type="button"
                variant="ghost"
                onClick={() => fillDemoCredentials(role)}
                className="text-xs px-2 py-1 h-auto capitalize"
              >
                {role}
              </Button>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;