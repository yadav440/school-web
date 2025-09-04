import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StudentProfileModal = ({ isOpen, student, onClose, onEdit, onMessage }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen || !student) return null;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'User' },
    { id: 'academic', label: 'Academic', icon: 'BookOpen' },
    { id: 'attendance', label: 'Attendance', icon: 'Calendar' },
    { id: 'disciplinary', label: 'Disciplinary', icon: 'Shield' },
    { id: 'communication', label: 'Communication', icon: 'MessageSquare' }
  ];

  const mockAcademicData = {
    currentGPA: 3.7,
    subjects: [
      { name: 'Mathematics', grade: 'A-', teacher: 'Mr. Johnson', lastUpdated: '2025-09-02' },
      { name: 'English Literature', grade: 'B+', teacher: 'Ms. Davis', lastUpdated: '2025-09-01' },
      { name: 'Science', grade: 'A', teacher: 'Dr. Wilson', lastUpdated: '2025-08-30' },
      { name: 'History', grade: 'B', teacher: 'Mr. Brown', lastUpdated: '2025-08-28' },
      { name: 'Physical Education', grade: 'A', teacher: 'Coach Smith', lastUpdated: '2025-08-25' }
    ],
    assignments: [
      { title: 'Math Quiz Chapter 5', subject: 'Mathematics', dueDate: '2025-09-06', status: 'Pending', grade: null },
      { title: 'History Essay - WWII', subject: 'History', dueDate: '2025-09-04', status: 'Submitted', grade: 'B+' },
      { title: 'Science Lab Report', subject: 'Science', dueDate: '2025-09-03', status: 'Graded', grade: 'A-' }
    ]
  };

  const mockAttendanceData = {
    totalDays: 45,
    presentDays: 42,
    absentDays: 3,
    tardyDays: 2,
    attendanceRate: 93.3,
    recentAttendance: [
      { date: '2025-09-04', status: 'Present', notes: '' },
      { date: '2025-09-03', status: 'Present', notes: '' },
      { date: '2025-09-02', status: 'Absent', notes: 'Sick leave' },
      { date: '2025-09-01', status: 'Present', notes: '' },
      { date: '2025-08-31', status: 'Tardy', notes: 'Late arrival - 15 min' }
    ]
  };

  const mockCommunicationData = [
    {
      id: 1,
      date: '2025-09-03',
      type: 'Email',
      from: 'Ms. Davis',
      to: 'Parent',
      subject: 'Excellent progress in English Literature',
      preview: 'I wanted to reach out to commend your child on their recent improvement...'
    },
    {
      id: 2,
      date: '2025-09-01',
      type: 'Phone Call',
      from: 'Mr. Johnson',
      to: 'Parent',
      subject: 'Math tutoring recommendation',
      preview: 'Discussed additional support options for mathematics...'
    },
    {
      id: 3,
      date: '2025-08-28',
      type: 'Meeting',
      from: 'School Counselor',
      to: 'Parent',
      subject: 'Academic planning session',
      preview: 'Met to discuss course selection for next semester...'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'text-success bg-success/10 border-success/20';
      case 'Inactive': return 'text-error bg-error/10 border-error/20';
      case 'Suspended': return 'text-warning bg-warning/10 border-warning/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getGradeColor = (grade) => {
    if (grade?.startsWith('A')) return 'text-success';
    if (grade?.startsWith('B')) return 'text-primary';
    if (grade?.startsWith('C')) return 'text-warning';
    return 'text-error';
  };

  const getAttendanceColor = (status) => {
    switch (status) {
      case 'Present': return 'text-success bg-success/10';
      case 'Absent': return 'text-error bg-error/10';
      case 'Tardy': return 'text-warning bg-warning/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-card-foreground">Student Information</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Full Name:</span>
                    <span className="font-medium">{student?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Student ID:</span>
                    <span className="font-mono">{student?.studentId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Grade Level:</span>
                    <span>{student?.grade}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Class:</span>
                    <span>{student?.class || 'Not assigned'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(student?.status)}`}>
                      {student?.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Enrollment Date:</span>
                    <span>August 15, 2024</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-card-foreground">Contact Information</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email:</span>
                    <span>{student?.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Phone:</span>
                    <span>(555) 123-4567</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Address:</span>
                    <span className="text-right">123 Main St<br />Springfield, IL 62701</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Parent Information */}
            <div className="border-t border-border pt-6">
              <h4 className="font-semibold text-card-foreground mb-4">Parent/Guardian Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Name:</span>
                    <span className="font-medium">{student?.parentName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Relationship:</span>
                    <span>Mother</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Phone:</span>
                    <span>{student?.parentPhone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email:</span>
                    <span>{student?.parentEmail || 'parent@email.com'}</span>
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Emergency Contact:</span>
                    <span>John Smith (Father)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Emergency Phone:</span>
                    <span>(555) 987-6543</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Quick Stats */}
            <div className="border-t border-border pt-6">
              <h4 className="font-semibold text-card-foreground mb-4">Quick Statistics</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-success/10 rounded-lg">
                  <div className="text-2xl font-bold text-success">3.7</div>
                  <div className="text-xs text-muted-foreground">Current GPA</div>
                </div>
                <div className="text-center p-3 bg-primary/10 rounded-lg">
                  <div className="text-2xl font-bold text-primary">93%</div>
                  <div className="text-xs text-muted-foreground">Attendance</div>
                </div>
                <div className="text-center p-3 bg-warning/10 rounded-lg">
                  <div className="text-2xl font-bold text-warning">2</div>
                  <div className="text-xs text-muted-foreground">Pending Tasks</div>
                </div>
                <div className="text-center p-3 bg-accent/10 rounded-lg">
                  <div className="text-2xl font-bold text-accent">0</div>
                  <div className="text-xs text-muted-foreground">Disciplinary</div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'academic':
        return (
          <div className="space-y-6">
            {/* GPA and Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-success/10 rounded-lg">
                <div className="text-3xl font-bold text-success mb-1">{mockAcademicData?.currentGPA}</div>
                <div className="text-sm text-muted-foreground">Current GPA</div>
              </div>
              <div className="text-center p-4 bg-primary/10 rounded-lg">
                <div className="text-3xl font-bold text-primary mb-1">{mockAcademicData?.subjects?.length}</div>
                <div className="text-sm text-muted-foreground">Enrolled Subjects</div>
              </div>
              <div className="text-center p-4 bg-warning/10 rounded-lg">
                <div className="text-3xl font-bold text-warning mb-1">
                  {mockAcademicData?.assignments?.filter(a => a?.status === 'Pending')?.length}
                </div>
                <div className="text-sm text-muted-foreground">Pending Assignments</div>
              </div>
            </div>
            {/* Current Subjects */}
            <div>
              <h4 className="font-semibold text-card-foreground mb-4">Current Subjects</h4>
              <div className="space-y-3">
                {mockAcademicData?.subjects?.map((subject, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-surface rounded-lg border border-border">
                    <div>
                      <p className="font-medium text-card-foreground">{subject?.name}</p>
                      <p className="text-sm text-muted-foreground">Teacher: {subject?.teacher}</p>
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-bold ${getGradeColor(subject?.grade)}`}>
                        {subject?.grade}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Updated {new Date(subject.lastUpdated)?.toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Recent Assignments */}
            <div>
              <h4 className="font-semibold text-card-foreground mb-4">Recent Assignments</h4>
              <div className="space-y-3">
                {mockAcademicData?.assignments?.map((assignment, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-surface rounded-lg border border-border">
                    <div>
                      <p className="font-medium text-card-foreground">{assignment?.title}</p>
                      <p className="text-sm text-muted-foreground">{assignment?.subject}</p>
                      <p className="text-xs text-muted-foreground">
                        Due: {new Date(assignment.dueDate)?.toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mb-1 ${
                        assignment?.status === 'Graded' ? 'bg-success/10 text-success' :
                        assignment?.status === 'Submitted'? 'bg-primary/10 text-primary' : 'bg-warning/10 text-warning'
                      }`}>
                        {assignment?.status}
                      </div>
                      {assignment?.grade && (
                        <div className={`text-sm font-bold ${getGradeColor(assignment?.grade)}`}>
                          {assignment?.grade}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'attendance':
        return (
          <div className="space-y-6">
            {/* Attendance Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-success/10 rounded-lg">
                <div className="text-2xl font-bold text-success mb-1">{mockAttendanceData?.presentDays}</div>
                <div className="text-sm text-muted-foreground">Present Days</div>
              </div>
              <div className="text-center p-4 bg-error/10 rounded-lg">
                <div className="text-2xl font-bold text-error mb-1">{mockAttendanceData?.absentDays}</div>
                <div className="text-sm text-muted-foreground">Absent Days</div>
              </div>
              <div className="text-center p-4 bg-warning/10 rounded-lg">
                <div className="text-2xl font-bold text-warning mb-1">{mockAttendanceData?.tardyDays}</div>
                <div className="text-sm text-muted-foreground">Tardy Days</div>
              </div>
              <div className="text-center p-4 bg-primary/10 rounded-lg">
                <div className="text-2xl font-bold text-primary mb-1">{mockAttendanceData?.attendanceRate}%</div>
                <div className="text-sm text-muted-foreground">Attendance Rate</div>
              </div>
            </div>
            {/* Recent Attendance */}
            <div>
              <h4 className="font-semibold text-card-foreground mb-4">Recent Attendance Record</h4>
              <div className="space-y-2">
                {mockAttendanceData?.recentAttendance?.map((record, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-surface rounded-lg border border-border">
                    <div className="flex items-center space-x-3">
                      <div className="text-sm font-medium text-card-foreground">
                        {new Date(record.date)?.toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </div>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getAttendanceColor(record?.status)}`}>
                        {record?.status}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {record?.notes || 'No notes'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'disciplinary':
        return (
          <div className="space-y-6">
            <div className="text-center py-12">
              <Icon name="Shield" size={48} className="text-success mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-card-foreground mb-2">
                No Disciplinary Records
              </h3>
              <p className="text-sm text-muted-foreground">
                This student has maintained excellent behavior with no disciplinary actions on record.
              </p>
            </div>
          </div>
        );

      case 'communication':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-card-foreground">Communication History</h4>
              <Button
                variant="default"
                size="sm"
                onClick={() => onMessage(student)}
                iconName="MessageSquare"
                iconPosition="left"
              >
                New Message
              </Button>
            </div>
            <div className="space-y-4">
              {mockCommunicationData?.map((comm) => (
                <div key={comm?.id} className="p-4 bg-surface rounded-lg border border-border">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Icon 
                        name={comm?.type === 'Email' ? 'Mail' : comm?.type === 'Phone Call' ? 'Phone' : 'Users'} 
                        size={16} 
                        className="text-primary" 
                      />
                      <span className="text-sm font-medium text-card-foreground">{comm?.type}</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(comm.date)?.toLocaleDateString()}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">{comm?.from} → {comm?.to}</span>
                  </div>
                  <h5 className="font-medium text-card-foreground mb-1">{comm?.subject}</h5>
                  <p className="text-sm text-muted-foreground">{comm?.preview}</p>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-elevation-4 w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-lg font-medium text-primary">
                {student?.name?.split(' ')?.map(n => n?.[0])?.join('')}
              </span>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-card-foreground">{student?.name}</h2>
              <p className="text-sm text-muted-foreground">
                {student?.grade} • ID: {student?.studentId}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(student)}
              iconName="Edit"
              iconPosition="left"
            >
              Edit
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
            >
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <div className="flex overflow-x-auto">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab?.id
                    ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-card-foreground'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-96">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default StudentProfileModal;