import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SuccessModal = ({ isOpen, onClose, registrationData, onPrintDocument, onNewRegistration }) => {
  if (!isOpen) return null;

  const generateLIN = () => {
    if (registrationData?.selectedSchool) {
      return `LIN-${registrationData?.selectedSchool?.id?.toUpperCase()}-${new Date()?.getFullYear()}-${String(Math.floor(Math.random() * 10000))?.padStart(4, '0')}`;
    }
    return 'LIN-XXXX-XXXX-XXXX';
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-[899]" />
      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-modal p-4">
        <div className="bg-surface border border-border rounded-lg shadow-elevation-lg max-w-lg w-full">
          {/* Header */}
          <div className="p-6 text-center">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="CheckCircle" size={32} className="text-success" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Registration Successful!</h3>
            <p className="text-sm text-muted-foreground">
              Student registration has been completed successfully
            </p>
          </div>

          {/* Content */}
          <div className="px-6 pb-6">
            {/* LIN Display */}
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6 text-center">
              <h4 className="font-medium text-foreground mb-2">Learner Identification Number</h4>
              <div className="text-2xl font-mono font-bold text-primary mb-2">
                {generateLIN()}
              </div>
              <p className="text-xs text-muted-foreground">
                Please save this number for future reference
              </p>
            </div>

            {/* Registration Summary */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Student Name:</span>
                <span className="text-foreground font-medium">
                  {`${registrationData?.firstName || ''} ${registrationData?.lastName || ''}`?.trim()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Class Level:</span>
                <span className="text-foreground">{registrationData?.classLevel || 'N/A'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Assigned School:</span>
                <span className="text-foreground">{registrationData?.selectedSchool?.name || 'N/A'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Registration Date:</span>
                <span className="text-foreground">{new Date()?.toLocaleDateString('en-GB')}</span>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-muted/50 rounded-lg p-4 mb-6">
              <h5 className="font-medium text-foreground mb-2 flex items-center">
                <Icon name="Info" size={16} className="mr-2 text-primary" />
                Next Steps
              </h5>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Print the enrollment document for your records</li>
                <li>• Visit the assigned school with original documents</li>
                <li>• Complete the enrollment process within 7 days</li>
                <li>• Parent/guardian will receive SMS confirmation</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                onClick={onPrintDocument}
                iconName="Printer"
                iconPosition="left"
                className="flex-1"
              >
                Print Document
              </Button>
              <Button
                variant="default"
                onClick={onNewRegistration}
                iconName="Plus"
                iconPosition="left"
                className="flex-1"
              >
                New Registration
              </Button>
            </div>

            {/* Close Button */}
            <div className="mt-4">
              <Button
                variant="ghost"
                onClick={onClose}
                className="w-full"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuccessModal;