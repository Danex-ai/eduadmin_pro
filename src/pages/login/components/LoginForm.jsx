import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const LoginForm = ({ onLogin, isLoading }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  // Mock credentials for different user types
  const mockCredentials = {
    admin: { email: 'admin@eduadmin.ng', password: 'Admin123!', role: 'administrator' },
    teacher: { email: 'teacher@eduadmin.ng', password: 'Teacher123!', role: 'teacher' },
    student: { email: 'student@eduadmin.ng', password: 'Student123!', role: 'student' },
    parent: { email: 'parent@eduadmin.ng', password: 'Parent123!', role: 'parent' }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData?.password?.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    // Check against mock credentials
    const matchedUser = Object.values(mockCredentials)?.find(
      cred => cred?.email === formData?.email && cred?.password === formData?.password
    );

    if (!matchedUser) {
      setErrors({
        general: `Invalid credentials. Use one of these test accounts:\nAdmin: admin@eduadmin.ng / Admin123!\nTeacher: teacher@eduadmin.ng / Teacher123!\nStudent: student@eduadmin.ng / Student123!\nParent: parent@eduadmin.ng / Parent123!`
      });
      return;
    }

    try {
      if (onLogin) {
        await onLogin(matchedUser);
      }

      // Role-based redirection
      switch (matchedUser?.role) {
        case 'administrator': navigate('/administrator-dashboard');
          break;
        case 'teacher': navigate('/teacher-portal');
          break;
        case 'student': navigate('/student-learning-interface');
          break;
        case 'parent': navigate('/parent-monitoring-dashboard');
          break;
        default:
          navigate('/administrator-dashboard');
      }
    } catch (error) {
      setErrors({ general: 'Login failed. Please try again.' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* General Error Message */}
      {errors?.general && (
        <div className="bg-error/10 border border-error/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="AlertCircle" size={20} className="text-error mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-medium text-error mb-1">Authentication Failed</h4>
              <p className="text-sm text-error whitespace-pre-line">{errors?.general}</p>
            </div>
          </div>
        </div>
      )}
      {/* Email Field */}
      <Input
        label="Email Address"
        type="email"
        name="email"
        placeholder="Enter your email address"
        value={formData?.email}
        onChange={handleInputChange}
        error={errors?.email}
        required
        className="w-full"
      />
      {/* Password Field */}
      <div className="relative">
        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          name="password"
          placeholder="Enter your password"
          value={formData?.password}
          onChange={handleInputChange}
          error={errors?.password}
          required
          className="w-full pr-12"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-smooth"
        >
          <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
        </button>
      </div>
      {/* Remember Me Checkbox */}
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
        
        <button
          type="button"
          onClick={() => navigate('/forgot-password')}
          className="text-sm text-primary hover:text-primary/80 transition-smooth"
        >
          Forgot password?
        </button>
      </div>
      {/* Sign In Button */}
      <Button
        type="submit"
        variant="default"
        loading={isLoading}
        fullWidth
        className="h-12"
      >
        {isLoading ? 'Signing In...' : 'Sign In'}
      </Button>
      {/* Register Link */}
      <div className="text-center pt-4 border-t border-border">
        <p className="text-sm text-muted-foreground">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={() => navigate('/register')}
            className="text-primary hover:text-primary/80 font-medium transition-smooth"
          >
            Register here
          </button>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;