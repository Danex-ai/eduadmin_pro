import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const ConfirmationForm = ({ formData, onSubmit, onPrevious, isSubmitting }) => {
  const [confirmations, setConfirmations] = useState({
    dataAccuracy: false,
    termsAccepted: false,
    privacyConsent: false
  });

  const handleConfirmationChange = (field, checked) => {
    setConfirmations(prev => ({
      ...prev,
      [field]: checked
    }));
  };

  const canSubmit = Object.values(confirmations)?.every(Boolean);

  const generateLIN = () => {
    if (formData?.selectedSchool) {
      return `LIN-${formData?.selectedSchool?.id?.toUpperCase()}-${new Date()?.getFullYear()}-${String(Math.floor(Math.random() * 10000))?.padStart(4, '0')}`;
    }
    return 'LIN-XXXX-XXXX-XXXX';
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
          <Icon name="CheckCircle" size={20} className="text-success" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Registration Confirmation</h3>
          <p className="text-sm text-muted-foreground">Review and confirm student registration details</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Registration Summary */}
        <div className="space-y-6">
          {/* Personal Information Summary */}
          <div className="border border-border rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-3 flex items-center">
              <Icon name="User" size={16} className="mr-2" />
              Personal Information
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Full Name:</span>
                <span className="text-foreground font-medium">
                  {`${formData?.firstName || ''} ${formData?.middleName || ''} ${formData?.lastName || ''}`?.trim()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date of Birth:</span>
                <span className="text-foreground">{formData?.dateOfBirth || 'Not provided'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Gender:</span>
                <span className="text-foreground capitalize">{formData?.gender || 'Not provided'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Phone:</span>
                <span className="text-foreground">{formData?.phoneNumber || 'Not provided'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">State of Origin:</span>
                <span className="text-foreground capitalize">{formData?.stateOfOrigin || 'Not provided'}</span>
              </div>
            </div>
          </div>

          {/* Academic Information Summary */}
          <div className="border border-border rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-3 flex items-center">
              <Icon name="BookOpen" size={16} className="mr-2" />
              Academic Information
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Applying for:</span>
                <span className="text-foreground font-medium">{formData?.classLevel || 'Not selected'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Previous School:</span>
                <span className="text-foreground">{formData?.previousSchoolName || 'None'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Class:</span>
                <span className="text-foreground">{formData?.lastClassCompleted || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Documents:</span>
                <div className="text-right">
                  {formData?.birthCertificate && (
                    <div className="text-success text-xs">✓ Birth Certificate</div>
                  )}
                  {formData?.academicRecords && (
                    <div className="text-success text-xs">✓ Academic Records</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* School Assignment Summary */}
          <div className="border border-border rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-3 flex items-center">
              <Icon name="School" size={16} className="mr-2" />
              School Assignment
            </h4>
            {formData?.selectedSchool ? (
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium text-foreground">{formData?.selectedSchool?.name}</span>
                </div>
                <div className="text-muted-foreground">{formData?.selectedSchool?.address}</div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Available Spaces:</span>
                  <span className="text-success font-medium">{formData?.selectedSchool?.availableSpaces}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Distance:</span>
                  <span className="text-foreground">{formData?.selectedSchool?.distance}</span>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">No school selected</p>
            )}
          </div>
        </div>

        {/* Right Column - LIN and Confirmations */}
        <div className="space-y-6">
          {/* Generated LIN */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Hash" size={24} className="text-primary" />
            </div>
            <h4 className="font-medium text-foreground mb-2">Your Learner Identification Number</h4>
            <div className="text-2xl font-mono font-bold text-primary mb-2">
              {generateLIN()}
            </div>
            <p className="text-xs text-muted-foreground">
              This LIN will be officially assigned upon successful registration
            </p>
          </div>

          {/* Confirmation Checkboxes */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Required Confirmations</h4>
            
            <Checkbox
              label="Data Accuracy Confirmation"
              description="I confirm that all information provided is accurate and complete"
              checked={confirmations?.dataAccuracy}
              onChange={(e) => handleConfirmationChange('dataAccuracy', e?.target?.checked)}
              required
            />

            <Checkbox
              label="Terms and Conditions"
              description="I accept the terms and conditions of the educational system"
              checked={confirmations?.termsAccepted}
              onChange={(e) => handleConfirmationChange('termsAccepted', e?.target?.checked)}
              required
            />

            <Checkbox
              label="Privacy and Data Consent"
              description="I consent to the processing of personal data for educational purposes"
              checked={confirmations?.privacyConsent}
              onChange={(e) => handleConfirmationChange('privacyConsent', e?.target?.checked)}
              required
            />
          </div>

          {/* Important Notes */}
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
              <div>
                <h5 className="font-medium text-foreground text-sm">Important Notes</h5>
                <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                  <li>• Registration is subject to school capacity and verification</li>
                  <li>• Original documents must be presented during enrollment</li>
                  <li>• LIN will be used for all future academic records</li>
                  <li>• Parent/guardian will receive confirmation via SMS/email</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex justify-between items-center mt-8 pt-6 border-t border-border">
        <Button
          variant="outline"
          onClick={onPrevious}
          iconName="ChevronLeft"
          iconPosition="left"
          disabled={isSubmitting}
        >
          Previous
        </Button>

        <Button
          variant="success"
          onClick={() => onSubmit(confirmations)}
          iconName="Check"
          iconPosition="left"
          disabled={!canSubmit}
          loading={isSubmitting}
        >
          Complete Registration
        </Button>
      </div>
    </div>
  );
};

export default ConfirmationForm;