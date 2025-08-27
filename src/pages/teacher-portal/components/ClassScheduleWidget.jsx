import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ClassScheduleWidget = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('today'); // today, week

  const todaySchedule = [
    {
      id: 1,
      time: "08:00 - 09:30",
      subject: "Mathematics",
      class: "JSS 2A",
      topic: "Algebraic Expressions",
      room: "Room 12",
      status: "upcoming",
      studentsPresent: 28,
      totalStudents: 32
    },
    {
      id: 2,
      time: "09:45 - 11:15",
      subject: "English Language",
      class: "JSS 2B",
      topic: "Comprehension Skills",
      room: "Room 8",
      status: "current",
      studentsPresent: 30,
      totalStudents: 30
    },
    {
      id: 3,
      time: "11:30 - 13:00",
      subject: "Mathematics",
      class: "JSS 3A",
      topic: "Quadratic Equations",
      room: "Room 12",
      status: "upcoming",
      studentsPresent: 0,
      totalStudents: 35
    },
    {
      id: 4,
      time: "14:00 - 15:30",
      subject: "Mathematics",
      class: "JSS 1C",
      topic: "Basic Arithmetic",
      room: "Room 12",
      status: "upcoming",
      studentsPresent: 0,
      totalStudents: 28
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'current':
        return 'bg-success/10 text-success border-success/20';
      case 'upcoming':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'completed':
        return 'bg-muted text-muted-foreground border-border';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'current':
        return 'Play';
      case 'upcoming':
        return 'Clock';
      case 'completed':
        return 'Check';
      default:
        return 'Clock';
    }
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-surface border border-border rounded-lg shadow-elevation h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Calendar" size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Today's Schedule</h2>
              <p className="text-sm text-muted-foreground">{formatDate(selectedDate)}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'today' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('today')}
            >
              Today
            </Button>
            <Button
              variant={viewMode === 'week' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('week')}
            >
              Week
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{todaySchedule?.length}</div>
            <div className="text-xs text-muted-foreground">Classes Today</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success">
              {todaySchedule?.reduce((acc, cls) => acc + cls?.studentsPresent, 0)}
            </div>
            <div className="text-xs text-muted-foreground">Students Present</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning">
              {todaySchedule?.filter(cls => cls?.status === 'current')?.length}
            </div>
            <div className="text-xs text-muted-foreground">In Progress</div>
          </div>
        </div>
      </div>
      {/* Schedule List */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-4">
          {todaySchedule?.map((classItem) => (
            <div
              key={classItem?.id}
              className={`p-4 rounded-lg border transition-smooth hover:shadow-elevation ${
                classItem?.status === 'current' ?'bg-success/5 border-success/20' :'bg-surface border-border hover:border-primary/20'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`px-2 py-1 rounded-md text-xs font-medium border ${getStatusColor(classItem?.status)}`}>
                    <Icon name={getStatusIcon(classItem?.status)} size={12} className="inline mr-1" />
                    {classItem?.status?.charAt(0)?.toUpperCase() + classItem?.status?.slice(1)}
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">
                    {classItem?.time}
                  </span>
                </div>
                <Button variant="ghost" size="icon">
                  <Icon name="MoreVertical" size={16} />
                </Button>
              </div>

              <div className="mb-3">
                <h3 className="font-semibold text-foreground mb-1">
                  {classItem?.subject} - {classItem?.class}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">{classItem?.topic}</p>
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Icon name="MapPin" size={12} />
                    <span>{classItem?.room}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Users" size={12} />
                    <span>{classItem?.studentsPresent}/{classItem?.totalStudents} students</span>
                  </div>
                </div>
              </div>

              {/* Attendance Progress */}
              <div className="mb-3">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Attendance</span>
                  <span className="font-medium">
                    {Math.round((classItem?.studentsPresent / classItem?.totalStudents) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-success h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${(classItem?.studentsPresent / classItem?.totalStudents) * 100}%`
                    }}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                {classItem?.status === 'current' && (
                  <>
                    <Button variant="default" size="sm">
                      <Icon name="Users" size={14} className="mr-1" />
                      Take Attendance
                    </Button>
                    <Button variant="outline" size="sm">
                      <Icon name="FileText" size={14} className="mr-1" />
                      Lesson Notes
                    </Button>
                  </>
                )}
                {classItem?.status === 'upcoming' && (
                  <>
                    <Button variant="outline" size="sm">
                      <Icon name="Eye" size={14} className="mr-1" />
                      View Details
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Icon name="Edit" size={14} className="mr-1" />
                      Edit
                    </Button>
                  </>
                )}
                {classItem?.status === 'completed' && (
                  <Button variant="ghost" size="sm">
                    <Icon name="BarChart3" size={14} className="mr-1" />
                    View Report
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Footer Actions */}
      <div className="p-6 border-t border-border">
        <div className="flex items-center justify-between">
          <Button variant="outline" size="sm">
            <Icon name="Calendar" size={14} className="mr-2" />
            View Full Calendar
          </Button>
          <Button variant="default" size="sm">
            <Icon name="Plus" size={14} className="mr-2" />
            Add Class
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClassScheduleWidget;