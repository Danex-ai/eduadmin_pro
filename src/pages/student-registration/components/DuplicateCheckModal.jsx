import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const DuplicateCheckModal = ({ isOpen, onClose, potentialMatches, onConfirmNew, onSelectExisting }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-[899]" onClick={onClose} />
      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-modal p-4">
        <div className="bg-surface border border-border rounded-lg shadow-elevation-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                  <Icon name="AlertTriangle" size={20} className="text-warning" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Potential Duplicate Records Found</h3>
                  <p className="text-sm text-muted-foreground">Similar student records exist in the system</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <Icon name="X" size={20} />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-96">
            <div className="mb-4">
              <p className="text-sm text-muted-foreground">
                We found {potentialMatches?.length} student record(s) that may match the information you entered. 
                Please review and confirm if this is a new student or select an existing record.
              </p>
            </div>

            <div className="space-y-4">
              {potentialMatches?.map((match, index) => (
                <div key={index} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-smooth">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <Icon name="User" size={16} className="text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">{match?.fullName}</h4>
                          <p className="text-sm text-muted-foreground">LIN: {match?.lin}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Date of Birth:</span>
                          <span className="ml-2 text-foreground">{match?.dateOfBirth}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Gender:</span>
                          <span className="ml-2 text-foreground capitalize">{match?.gender}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Phone:</span>
                          <span className="ml-2 text-foreground">{match?.phoneNumber}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">School:</span>
                          <span className="ml-2 text-foreground">{match?.currentSchool}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Parent:</span>
                          <span className="ml-2 text-foreground">{match?.parentName}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Status:</span>
                          <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                            match?.status === 'active' ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'
                          }`}>
                            {match?.status}
                          </span>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center space-x-2">
                        <Icon name="Percent" size={14} className="text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {match?.matchPercentage}% similarity match
                        </span>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onSelectExisting(match)}
                      className="ml-4"
                    >
                      Select This Record
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-border bg-muted/20">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                If none of these records match, you can proceed with creating a new student record.
              </div>
              <div className="flex space-x-3">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button variant="default" onClick={onConfirmNew}>
                  Create New Student
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DuplicateCheckModal;