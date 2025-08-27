import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PersonalInformationForm = ({ formData, setFormData, errors, onNext, onSave }) => {
  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' }
  ];

  const stateOptions = [
    { value: 'abia', label: 'Abia' },
    { value: 'adamawa', label: 'Adamawa' },
    { value: 'akwa-ibom', label: 'Akwa Ibom' },
    { value: 'anambra', label: 'Anambra' },
    { value: 'bauchi', label: 'Bauchi' },
    { value: 'bayelsa', label: 'Bayelsa' },
    { value: 'benue', label: 'Benue' },
    { value: 'borno', label: 'Borno' },
    { value: 'cross-river', label: 'Cross River' },
    { value: 'delta', label: 'Delta' },
    { value: 'ebonyi', label: 'Ebonyi' },
    { value: 'edo', label: 'Edo' },
    { value: 'ekiti', label: 'Ekiti' },
    { value: 'enugu', label: 'Enugu' },
    { value: 'gombe', label: 'Gombe' },
    { value: 'imo', label: 'Imo' },
    { value: 'jigawa', label: 'Jigawa' },
    { value: 'kaduna', label: 'Kaduna' },
    { value: 'kano', label: 'Kano' },
    { value: 'katsina', label: 'Katsina' },
    { value: 'kebbi', label: 'Kebbi' },
    { value: 'kogi', label: 'Kogi' },
    { value: 'kwara', label: 'Kwara' },
    { value: 'lagos', label: 'Lagos' },
    { value: 'nasarawa', label: 'Nasarawa' },
    { value: 'niger', label: 'Niger' },
    { value: 'ogun', label: 'Ogun' },
    { value: 'ondo', label: 'Ondo' },
    { value: 'osun', label: 'Osun' },
    { value: 'oyo', label: 'Oyo' },
    { value: 'plateau', label: 'Plateau' },
    { value: 'rivers', label: 'Rivers' },
    { value: 'sokoto', label: 'Sokoto' },
    { value: 'taraba', label: 'Taraba' },
    { value: 'yobe', label: 'Yobe' },
    { value: 'zamfara', label: 'Zamfara' },
    { value: 'fct', label: 'Federal Capital Territory' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="User" size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>
          <p className="text-sm text-muted-foreground">Enter student's basic details</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Primary Fields */}
        <div className="space-y-4">
          <Input
            label="First Name"
            type="text"
            placeholder="Enter first name"
            value={formData?.firstName || ''}
            onChange={(e) => handleInputChange('firstName', e?.target?.value)}
            error={errors?.firstName}
            required
          />

          <Input
            label="Last Name"
            type="text"
            placeholder="Enter last name"
            value={formData?.lastName || ''}
            onChange={(e) => handleInputChange('lastName', e?.target?.value)}
            error={errors?.lastName}
            required
          />

          <Input
            label="Middle Name"
            type="text"
            placeholder="Enter middle name (optional)"
            value={formData?.middleName || ''}
            onChange={(e) => handleInputChange('middleName', e?.target?.value)}
          />

          <Input
            label="Date of Birth"
            type="date"
            value={formData?.dateOfBirth || ''}
            onChange={(e) => handleInputChange('dateOfBirth', e?.target?.value)}
            error={errors?.dateOfBirth}
            required
          />

          <Select
            label="Gender"
            options={genderOptions}
            value={formData?.gender || ''}
            onChange={(value) => handleInputChange('gender', value)}
            placeholder="Select gender"
            error={errors?.gender}
            required
          />

          <Input
            label="Phone Number"
            type="tel"
            placeholder="Enter phone number"
            value={formData?.phoneNumber || ''}
            onChange={(e) => handleInputChange('phoneNumber', e?.target?.value)}
            error={errors?.phoneNumber}
            required
          />
        </div>

        {/* Right Column - Supporting Information */}
        <div className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="Enter email address (optional)"
            value={formData?.email || ''}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            error={errors?.email}
          />

          <Input
            label="Home Address"
            type="text"
            placeholder="Enter home address"
            value={formData?.homeAddress || ''}
            onChange={(e) => handleInputChange('homeAddress', e?.target?.value)}
            error={errors?.homeAddress}
            required
          />

          <Select
            label="State of Origin"
            options={stateOptions}
            value={formData?.stateOfOrigin || ''}
            onChange={(value) => handleInputChange('stateOfOrigin', value)}
            placeholder="Select state of origin"
            error={errors?.stateOfOrigin}
            searchable
            required
          />

          <Input
            label="Local Government Area"
            type="text"
            placeholder="Enter LGA"
            value={formData?.lga || ''}
            onChange={(e) => handleInputChange('lga', e?.target?.value)}
            error={errors?.lga}
            required
          />

          <Input
            label="Parent/Guardian Name"
            type="text"
            placeholder="Enter parent/guardian name"
            value={formData?.parentName || ''}
            onChange={(e) => handleInputChange('parentName', e?.target?.value)}
            error={errors?.parentName}
            required
          />

          <Input
            label="Parent/Guardian Phone"
            type="tel"
            placeholder="Enter parent/guardian phone"
            value={formData?.parentPhone || ''}
            onChange={(e) => handleInputChange('parentPhone', e?.target?.value)}
            error={errors?.parentPhone}
            required
          />
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex justify-between items-center mt-8 pt-6 border-t border-border">
        <Button
          variant="outline"
          onClick={onSave}
          iconName="Save"
          iconPosition="left"
        >
          Save Draft
        </Button>

        <Button
          variant="default"
          onClick={onNext}
          iconName="ChevronRight"
          iconPosition="right"
        >
          Continue to Academic History
        </Button>
      </div>
    </div>
  );
};

export default PersonalInformationForm;