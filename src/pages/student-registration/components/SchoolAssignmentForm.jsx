import React, { useState, useEffect } from 'react';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SchoolAssignmentForm = ({ formData, setFormData, errors, onNext, onPrevious, onSave }) => {
  const [availableSchools, setAvailableSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [loadingSchools, setLoadingSchools] = useState(false);

  // Mock school data
  const mockSchools = [
    {
      id: 'sch001',
      name: 'Government Secondary School, Victoria Island',
      address: '15 Ahmadu Bello Way, Victoria Island, Lagos',
      capacity: 1200,
      currentEnrollment: 980,
      availableSpaces: 220,
      distance: '2.5 km',
      facilities: ['Library', 'Laboratory', 'Sports Complex', 'Computer Lab'],
      rating: 4.2,
      type: 'Public'
    },
    {
      id: 'sch002',
      name: 'Federal Government College, Ikoyi',
      address: '45 Kingsway Road, Ikoyi, Lagos',
      capacity: 1500,
      currentEnrollment: 1350,
      availableSpaces: 150,
      distance: '3.8 km',
      facilities: ['Library', 'Laboratory', 'Hostel', 'Sports Complex', 'Arts Center'],
      rating: 4.5,
      type: 'Federal'
    },
    {
      id: 'sch003',
      name: 'Lagos State Model College, Surulere',
      address: '78 Adeniran Ogunsanya Street, Surulere, Lagos',
      capacity: 1000,
      currentEnrollment: 850,
      availableSpaces: 150,
      distance: '5.2 km',
      facilities: ['Library', 'Laboratory', 'Computer Lab', 'Music Room'],
      rating: 4.0,
      type: 'State'
    },
    {
      id: 'sch004',
      name: 'Community Secondary School, Ikeja',
      address: '23 Allen Avenue, Ikeja, Lagos',
      capacity: 800,
      currentEnrollment: 720,
      availableSpaces: 80,
      distance: '7.1 km',
      facilities: ['Library', 'Laboratory', 'Sports Field'],
      rating: 3.8,
      type: 'Community'
    }
  ];

  useEffect(() => {
    // Simulate loading schools based on student location
    setLoadingSchools(true);
    setTimeout(() => {
      setAvailableSchools(mockSchools);
      setLoadingSchools(false);
    }, 1000);
  }, []);

  const schoolOptions = availableSchools?.map(school => ({
    value: school?.id,
    label: school?.name,
    description: `${school?.availableSpaces} spaces available • ${school?.distance} away`
  }));

  const handleSchoolSelection = (schoolId) => {
    const school = availableSchools?.find(s => s?.id === schoolId);
    setSelectedSchool(school);
    setFormData(prev => ({
      ...prev,
      selectedSchool: school
    }));
  };

  const getCapacityStatus = (school) => {
    const percentage = (school?.currentEnrollment / school?.capacity) * 100;
    if (percentage >= 90) return { status: 'high', color: 'text-error', bg: 'bg-error/10' };
    if (percentage >= 70) return { status: 'medium', color: 'text-warning', bg: 'bg-warning/10' };
    return { status: 'low', color: 'text-success', bg: 'bg-success/10' };
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
          <Icon name="School" size={20} className="text-accent" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">School Assignment</h3>
          <p className="text-sm text-muted-foreground">Select preferred school for enrollment</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - School Selection */}
        <div className="space-y-4">
          <Select
            label="Available Schools"
            options={schoolOptions}
            value={formData?.selectedSchool?.id || ''}
            onChange={handleSchoolSelection}
            placeholder="Select a school"
            error={errors?.selectedSchool}
            loading={loadingSchools}
            searchable
            required
          />

          {selectedSchool && (
            <div className="border border-border rounded-lg p-4 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium text-foreground">{selectedSchool?.name}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{selectedSchool?.address}</p>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={16} className="text-warning fill-current" />
                  <span className="text-sm font-medium">{selectedSchool?.rating}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="text-lg font-semibold text-foreground">{selectedSchool?.availableSpaces}</div>
                  <div className="text-xs text-muted-foreground">Available Spaces</div>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="text-lg font-semibold text-foreground">{selectedSchool?.distance}</div>
                  <div className="text-xs text-muted-foreground">Distance</div>
                </div>
              </div>

              <div>
                <h5 className="font-medium text-foreground mb-2">Facilities</h5>
                <div className="flex flex-wrap gap-2">
                  {selectedSchool?.facilities?.map((facility, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                    >
                      {facility}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">Enrollment Status</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${getCapacityStatus(selectedSchool)?.bg} ${getCapacityStatus(selectedSchool)?.color}`}>
                    {Math.round((selectedSchool?.currentEnrollment / selectedSchool?.capacity) * 100)}% Full
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-smooth ${
                      getCapacityStatus(selectedSchool)?.status === 'high' ? 'bg-error' :
                      getCapacityStatus(selectedSchool)?.status === 'medium' ? 'bg-warning' : 'bg-success'
                    }`}
                    style={{ width: `${(selectedSchool?.currentEnrollment / selectedSchool?.capacity) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>{selectedSchool?.currentEnrollment} enrolled</span>
                  <span>{selectedSchool?.capacity} capacity</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - LIN Preview */}
        <div className="space-y-4">
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Hash" size={20} className="text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Learner Identification Number</h4>
                <p className="text-sm text-muted-foreground">Auto-generated upon registration</p>
              </div>
            </div>

            <div className="bg-surface border border-border rounded-lg p-4 text-center">
              <div className="text-2xl font-mono font-bold text-primary mb-2">
                {formData?.selectedSchool ? 
                  `LIN-${formData?.selectedSchool?.id?.toUpperCase()}-${new Date()?.getFullYear()}-${String(Math.floor(Math.random() * 10000))?.padStart(4, '0')}` 
                  : 'LIN-XXXX-XXXX-XXXX'
                }
              </div>
              <p className="text-xs text-muted-foreground">
                This number will be assigned after successful registration
              </p>
            </div>
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size={16} className="text-primary mt-0.5" />
              <div>
                <h5 className="font-medium text-foreground text-sm">School Assignment Notes</h5>
                <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                  <li>• School assignment is based on availability and proximity</li>
                  <li>• Students may request transfer after one academic term</li>
                  <li>• Special needs accommodations can be requested</li>
                  <li>• Transportation arrangements vary by school</li>
                </ul>
              </div>
            </div>
          </div>

          {loadingSchools && (
            <div className="flex items-center justify-center p-8">
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                <span className="text-sm text-muted-foreground">Loading available schools...</span>
              </div>
            </div>
          )}
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
          disabled={!selectedSchool}
        >
          Continue to Confirmation
        </Button>
      </div>
    </div>
  );
};

export default SchoolAssignmentForm;