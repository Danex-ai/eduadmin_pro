import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalHeader from '../../components/ui/GlobalHeader';
import PortalNavigation from '../../components/ui/PortalNavigation';
import RegistrationProgress from './components/RegistrationProgress';
import PersonalInformationForm from './components/PersonalInformationForm';
import AcademicHistoryForm from './components/AcademicHistoryForm';
import SchoolAssignmentForm from './components/SchoolAssignmentForm';
import ConfirmationForm from './components/ConfirmationForm';
import DuplicateCheckModal from './components/DuplicateCheckModal';
import SuccessModal from './components/SuccessModal';
import Button from '../../components/ui/Button';


const StudentRegistration = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [potentialMatches, setPotentialMatches] = useState([]);

  // Mock user data
  const mockUser = {
    name: "Administrator",
    email: "admin@eduadmin.ng",
    role: "Administrator"
  };

  // Mock notifications
  const mockNotifications = [
    {
      id: 1,
      title: "New Registration Deadline",
      message: "Registration deadline for 2025 academic session is approaching",
      time: "2 hours ago",
      read: false,
      priority: "high",
      type: "system"
    },
    {
      id: 2,
      title: "Document Verification",
      message: "5 pending document verifications require attention",
      time: "4 hours ago",
      read: false,
      priority: "medium",
      type: "assignment"
    }
  ];

  // Registration steps
  const steps = [
    {
      id: 'personal',
      title: 'Personal Information',
      description: 'Basic student details'
    },
    {
      id: 'academic',
      title: 'Academic History',
      description: 'Educational background'
    },
    {
      id: 'school',
      title: 'School Assignment',
      description: 'School selection'
    },
    {
      id: 'confirmation',
      title: 'Confirmation',
      description: 'Review and submit'
    }
  ];

  // Mock potential duplicate matches
  const mockPotentialMatches = [
    {
      id: 'STU001',
      fullName: 'John Adebayo Smith',
      lin: 'LIN-SCH001-2024-1234',
      dateOfBirth: '15/03/2010',
      gender: 'male',
      phoneNumber: '+234 801 234 5678',
      currentSchool: 'Government Secondary School, Victoria Island',
      parentName: 'Mrs. Sarah Smith',
      status: 'active',
      matchPercentage: 85
    },
    {
      id: 'STU002',
      fullName: 'John Smith Adebayo',
      lin: 'LIN-SCH002-2023-5678',
      dateOfBirth: '20/03/2010',
      gender: 'male',
      phoneNumber: '+234 802 345 6789',
      currentSchool: 'Federal Government College, Ikoyi',
      parentName: 'Mr. John Smith Sr.',
      status: 'inactive',
      matchPercentage: 78
    }
  ];

  // Load saved form data on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('studentRegistrationDraft');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData?.formData || {});
        setCurrentStep(parsedData?.currentStep || 0);
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  // Save form data to localStorage
  const saveFormData = () => {
    const dataToSave = {
      formData,
      currentStep,
      timestamp: new Date()?.toISOString()
    };
    localStorage.setItem('studentRegistrationDraft', JSON.stringify(dataToSave));
  };

  // Validate current step
  const validateCurrentStep = () => {
    const newErrors = {};

    switch (currentStep) {
      case 0: // Personal Information
        if (!formData?.firstName) newErrors.firstName = 'First name is required';
        if (!formData?.lastName) newErrors.lastName = 'Last name is required';
        if (!formData?.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
        if (!formData?.gender) newErrors.gender = 'Gender is required';
        if (!formData?.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
        if (!formData?.homeAddress) newErrors.homeAddress = 'Home address is required';
        if (!formData?.stateOfOrigin) newErrors.stateOfOrigin = 'State of origin is required';
        if (!formData?.lga) newErrors.lga = 'Local Government Area is required';
        if (!formData?.parentName) newErrors.parentName = 'Parent/Guardian name is required';
        if (!formData?.parentPhone) newErrors.parentPhone = 'Parent/Guardian phone is required';
        break;

      case 1: // Academic History
        if (!formData?.classLevel) newErrors.classLevel = 'Class level is required';
        if (!formData?.previousSchoolType) newErrors.previousSchoolType = 'Previous school type is required';
        if (formData?.previousSchoolType !== 'none' && !formData?.previousSchoolName) {
          newErrors.previousSchoolName = 'Previous school name is required';
        }
        if (formData?.previousSchoolType !== 'none' && !formData?.lastClassCompleted) {
          newErrors.lastClassCompleted = 'Last class completed is required';
        }
        break;

      case 2: // School Assignment
        if (!formData?.selectedSchool) newErrors.selectedSchool = 'School selection is required';
        break;

      case 3: // Confirmation
        // No additional validation needed for confirmation step
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  // Check for duplicate records
  const checkForDuplicates = () => {
    // Simulate duplicate checking logic
    const hasFullName = formData?.firstName && formData?.lastName;
    const hasDateOfBirth = formData?.dateOfBirth;
    
    if (hasFullName && hasDateOfBirth) {
      // Simulate finding potential matches
      const matches = mockPotentialMatches?.filter(match => {
        const fullName = `${formData?.firstName} ${formData?.lastName}`?.toLowerCase();
        return match?.fullName?.toLowerCase()?.includes(fullName?.split(' ')?.[0]) ||
               match?.fullName?.toLowerCase()?.includes(fullName?.split(' ')?.[1]);
      });

      if (matches?.length > 0) {
        setPotentialMatches(matches);
        setShowDuplicateModal(true);
        return true;
      }
    }
    return false;
  };

  // Handle step navigation
  const handleNext = () => {
    if (validateCurrentStep()) {
      if (currentStep === 0) {
        // Check for duplicates after personal information step
        if (checkForDuplicates()) {
          return; // Stop here if duplicates found
        }
      }
      
      setCurrentStep(prev => Math.min(prev + 1, steps?.length - 1));
      saveFormData();
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  // Handle form submission
  const handleSubmit = async (confirmations) => {
    if (!validateCurrentStep()) return;

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear saved draft
      localStorage.removeItem('studentRegistrationDraft');
      
      // Show success modal
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle error (show error message)
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle duplicate modal actions
  const handleConfirmNewStudent = () => {
    setShowDuplicateModal(false);
    setCurrentStep(1); // Continue to next step
    saveFormData();
  };

  const handleSelectExistingStudent = (existingStudent) => {
    setShowDuplicateModal(false);
    // Navigate to existing student record or show details
    console.log('Selected existing student:', existingStudent);
  };

  // Handle success modal actions
  const handlePrintDocument = () => {
    // Implement print functionality
    window.print();
  };

  const handleNewRegistration = () => {
    setShowSuccessModal(false);
    setFormData({});
    setCurrentStep(0);
    setErrors({});
    localStorage.removeItem('studentRegistrationDraft');
  };

  const handleLogout = () => {
    navigate('/login');
  };

  // Render current step component
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <PersonalInformationForm
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            onNext={handleNext}
            onSave={saveFormData}
          />
        );
      case 1:
        return (
          <AcademicHistoryForm
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onSave={saveFormData}
          />
        );
      case 2:
        return (
          <SchoolAssignmentForm
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onSave={saveFormData}
          />
        );
      case 3:
        return (
          <ConfirmationForm
            formData={formData}
            onSubmit={handleSubmit}
            onPrevious={handlePrevious}
            isSubmitting={isSubmitting}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Global Header */}
      <GlobalHeader
        user={mockUser}
        onLogout={handleLogout}
        notifications={mockNotifications}
      />

      {/* Portal Navigation */}
      <PortalNavigation
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
      />

      {/* Main Content */}
      <main className={`pt-16 transition-all duration-300 ${
        isCollapsed ? 'lg:pl-16' : 'lg:pl-64'
      }`}>
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Student Registration</h1>
                <p className="text-muted-foreground mt-1">
                  Register new students and generate Learner Identification Numbers (LIN)
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={() => navigate('/administrator-dashboard')}
                  iconName="ArrowLeft"
                  iconPosition="left"
                >
                  Back to Dashboard
                </Button>
                <Button
                  variant="ghost"
                  onClick={saveFormData}
                  iconName="Save"
                  iconPosition="left"
                >
                  Save Draft
                </Button>
              </div>
            </div>
          </div>

          {/* Registration Progress */}
          <RegistrationProgress currentStep={currentStep} steps={steps} />

          {/* Current Step Form */}
          {renderCurrentStep()}

          {/* Duplicate Check Modal */}
          <DuplicateCheckModal
            isOpen={showDuplicateModal}
            onClose={() => setShowDuplicateModal(false)}
            potentialMatches={potentialMatches}
            onConfirmNew={handleConfirmNewStudent}
            onSelectExisting={handleSelectExistingStudent}
          />

          {/* Success Modal */}
          <SuccessModal
            isOpen={showSuccessModal}
            onClose={() => setShowSuccessModal(false)}
            registrationData={formData}
            onPrintDocument={handlePrintDocument}
            onNewRegistration={handleNewRegistration}
          />
        </div>
      </main>
    </div>
  );
};

export default StudentRegistration;