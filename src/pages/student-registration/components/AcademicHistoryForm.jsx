import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const AcademicHistoryForm = ({ formData, setFormData, errors, onNext, onPrevious, onSave }) => {
  const classLevelOptions = [
    { value: 'jss1', label: 'JSS 1' },
    { value: 'jss2', label: 'JSS 2' },
    { value: 'jss3', label: 'JSS 3' },
    { value: 'ss1', label: 'SS 1' },
    { value: 'ss2', label: 'SS 2' },
    { value: 'ss3', label: 'SS 3' }
  ];

  const previousSchoolTypeOptions = [
    { value: 'public', label: 'Public School' },
    { value: 'private', label: 'Private School' },
    { value: 'none', label: 'No Previous School' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (field, file) => {
    setFormData(prev => ({
      ...prev,
      [field]: file
    }));
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
          <Icon name="BookOpen" size={20} className="text-secondary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Academic History</h3>
          <p className="text-sm text-muted-foreground">Previous educational background</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Academic Details */}
        <div className="space-y-4">
          <Select
            label="Applying for Class Level"
            options={classLevelOptions}
            value={formData?.classLevel || ''}
            onChange={(value) => handleInputChange('classLevel', value)}
            placeholder="Select class level"
            error={errors?.classLevel}
            required
          />

          <Select
            label="Previous School Type"
            options={previousSchoolTypeOptions}
            value={formData?.previousSchoolType || ''}
            onChange={(value) => handleInputChange('previousSchoolType', value)}
            placeholder="Select previous school type"
            error={errors?.previousSchoolType}
            required
          />

          {formData?.previousSchoolType && formData?.previousSchoolType !== 'none' && (
            <>
              <Input
                label="Previous School Name"
                type="text"
                placeholder="Enter previous school name"
                value={formData?.previousSchoolName || ''}
                onChange={(e) => handleInputChange('previousSchoolName', e?.target?.value)}
                error={errors?.previousSchoolName}
                required
              />

              <Input
                label="Previous School Address"
                type="text"
                placeholder="Enter previous school address"
                value={formData?.previousSchoolAddress || ''}
                onChange={(e) => handleInputChange('previousSchoolAddress', e?.target?.value)}
                error={errors?.previousSchoolAddress}
              />

              <Input
                label="Last Class Completed"
                type="text"
                placeholder="e.g., Primary 6, JSS 2"
                value={formData?.lastClassCompleted || ''}
                onChange={(e) => handleInputChange('lastClassCompleted', e?.target?.value)}
                error={errors?.lastClassCompleted}
                required
              />

              <Input
                label="Year of Completion"
                type="number"
                placeholder="Enter year"
                value={formData?.yearOfCompletion || ''}
                onChange={(e) => handleInputChange('yearOfCompletion', e?.target?.value)}
                error={errors?.yearOfCompletion}
                min="2010"
                max="2025"
              />
            </>
          )}
        </div>

        {/* Right Column - Document Upload */}
        <div className="space-y-4">
          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
            <Icon name="Upload" size={32} className="mx-auto text-muted-foreground mb-3" />
            <h4 className="font-medium text-foreground mb-2">Birth Certificate</h4>
            <p className="text-sm text-muted-foreground mb-4">Upload student's birth certificate (PDF, JPG, PNG)</p>
            <Input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => handleFileUpload('birthCertificate', e?.target?.files?.[0])}
              className="mb-2"
            />
            {formData?.birthCertificate && (
              <div className="flex items-center justify-center space-x-2 text-success">
                <Icon name="CheckCircle" size={16} />
                <span className="text-sm">{formData?.birthCertificate?.name}</span>
              </div>
            )}
          </div>

          {formData?.previousSchoolType && formData?.previousSchoolType !== 'none' && (
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <Icon name="FileText" size={32} className="mx-auto text-muted-foreground mb-3" />
              <h4 className="font-medium text-foreground mb-2">Previous School Records</h4>
              <p className="text-sm text-muted-foreground mb-4">Upload previous academic records (PDF, JPG, PNG)</p>
              <Input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => handleFileUpload('academicRecords', e?.target?.files?.[0])}
                className="mb-2"
              />
              {formData?.academicRecords && (
                <div className="flex items-center justify-center space-x-2 text-success">
                  <Icon name="CheckCircle" size={16} />
                  <span className="text-sm">{formData?.academicRecords?.name}</span>
                </div>
              )}
            </div>
          )}

          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size={16} className="text-primary mt-0.5" />
              <div>
                <h5 className="font-medium text-foreground text-sm">Document Requirements</h5>
                <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                  <li>• Birth certificate is mandatory for all students</li>
                  <li>• Previous school records required for transfer students</li>
                  <li>• Maximum file size: 5MB per document</li>
                  <li>• Accepted formats: PDF, JPG, PNG</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex justify-between items-center mt-8 pt-6 border-t border-border">
        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={onPrevious}
            iconName="ChevronLeft"
            iconPosition="left"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={onSave}
            iconName="Save"
            iconPosition="left"
          >
            Save Draft
          </Button>
        </div>

        <Button
          variant="default"
          onClick={onNext}
          iconName="ChevronRight"
          iconPosition="right"
        >
          Continue to School Assignment
        </Button>
      </div>
    </div>
  );
};

export default AcademicHistoryForm;