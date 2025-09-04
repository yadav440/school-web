import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import NotificationAlert from '../../components/ui/NotificationAlert';
import QuickActionsPanel from '../../components/ui/QuickActionsPanel';
import StudentTable from './components/StudentTable';
import StudentFilters from './components/StudentFilters';
import BulkActions from './components/BulkActions';
import EnrollmentModal from './components/EnrollmentModal';
import StudentProfileModal from './components/StudentProfileModal';

const StudentManagement = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [isEnrollmentModalOpen, setIsEnrollmentModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock student data
  const mockStudents = [
    {
      id: 1,
      name: "Emma Johnson",
      studentId: "STU001234",
      email: "emma.johnson@student.schoolhub.edu",
      grade: "10th Grade",
      class: "Class A",
      status: "Active",
      parentName: "Sarah Johnson",
      parentPhone: "(555) 123-4567",
      parentEmail: "sarah.johnson@email.com",
      lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000)?.toISOString(),
      enrollmentDate: "2024-08-15"
    },
    {
      id: 2,
      name: "Michael Chen",
      studentId: "STU001235",
      email: "michael.chen@student.schoolhub.edu",
      grade: "11th Grade",
      class: "Class B",
      status: "Active",
      parentName: "Lisa Chen",
      parentPhone: "(555) 234-5678",
      parentEmail: "lisa.chen@email.com",
      lastActivity: new Date(Date.now() - 24 * 60 * 60 * 1000)?.toISOString(),
      enrollmentDate: "2024-08-15"
    },
    {
      id: 3,
      name: "Sophia Rodriguez",
      studentId: "STU001236",
      email: "sophia.rodriguez@student.schoolhub.edu",
      grade: "9th Grade",
      class: "Class A",
      status: "Active",
      parentName: "Maria Rodriguez",
      parentPhone: "(555) 345-6789",
      parentEmail: "maria.rodriguez@email.com",
      lastActivity: new Date(Date.now() - 30 * 60 * 1000)?.toISOString(),
      enrollmentDate: "2024-08-15"
    },
    {
      id: 4,
      name: "James Wilson",
      studentId: "STU001237",
      email: "james.wilson@student.schoolhub.edu",
      grade: "12th Grade",
      class: "Advanced",
      status: "Active",
      parentName: "Robert Wilson",
      parentPhone: "(555) 456-7890",
      parentEmail: "robert.wilson@email.com",
      lastActivity: new Date(Date.now() - 4 * 60 * 60 * 1000)?.toISOString(),
      enrollmentDate: "2024-08-15"
    },
    {
      id: 5,
      name: "Olivia Brown",
      studentId: "STU001238",
      email: "olivia.brown@student.schoolhub.edu",
      grade: "8th Grade",
      class: "Class C",
      status: "Inactive",
      parentName: "Jennifer Brown",
      parentPhone: "(555) 567-8901",
      parentEmail: "jennifer.brown@email.com",
      lastActivity: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)?.toISOString(),
      enrollmentDate: "2024-08-15"
    },
    {
      id: 6,
      name: "Alexander Davis",
      studentId: "STU001239",
      email: "alexander.davis@student.schoolhub.edu",
      grade: "7th Grade",
      class: "Class B",
      status: "Suspended",
      parentName: "Michelle Davis",
      parentPhone: "(555) 678-9012",
      parentEmail: "michelle.davis@email.com",
      lastActivity: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)?.toISOString(),
      enrollmentDate: "2024-08-15"
    },
    {
      id: 7,
      name: "Isabella Martinez",
      studentId: "STU001240",
      email: "isabella.martinez@student.schoolhub.edu",
      grade: "6th Grade",
      class: "Class A",
      status: "Active",
      parentName: "Carlos Martinez",
      parentPhone: "(555) 789-0123",
      parentEmail: "carlos.martinez@email.com",
      lastActivity: new Date(Date.now() - 45 * 60 * 1000)?.toISOString(),
      enrollmentDate: "2024-08-15"
    },
    {
      id: 8,
      name: "Ethan Thompson",
      studentId: "STU001241",
      email: "ethan.thompson@student.schoolhub.edu",
      grade: "5th Grade",
      class: "Class D",
      status: "Active",
      parentName: "Amanda Thompson",
      parentPhone: "(555) 890-1234",
      parentEmail: "amanda.thompson@email.com",
      lastActivity: new Date(Date.now() - 6 * 60 * 60 * 1000)?.toISOString(),
      enrollmentDate: "2024-08-15"
    }
  ];

  useEffect(() => {
    // Simulate loading
    const loadStudents = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStudents(mockStudents);
      setFilteredStudents(mockStudents);
      setIsLoading(false);
    };

    loadStudents();
  }, []);

  useEffect(() => {
    let filtered = [...students];

    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm?.toLowerCase();
      filtered = filtered?.filter(student =>
        student?.name?.toLowerCase()?.includes(searchLower) ||
        student?.studentId?.toLowerCase()?.includes(searchLower) ||
        student?.email?.toLowerCase()?.includes(searchLower) ||
        student?.parentName?.toLowerCase()?.includes(searchLower) ||
        student?.parentPhone?.includes(searchTerm)
      );
    }

    // Apply grade filter
    if (selectedGrade) {
      filtered = filtered?.filter(student => student?.grade === selectedGrade);
    }

    // Apply status filter
    if (selectedStatus) {
      filtered = filtered?.filter(student => student?.status === selectedStatus);
    }

    // Apply class filter
    if (selectedClass) {
      filtered = filtered?.filter(student => student?.class === selectedClass);
    }

    setFilteredStudents(filtered);
  }, [students, searchTerm, selectedGrade, selectedStatus, selectedClass]);

  const studentCounts = {
    total: students?.length,
    active: students?.filter(s => s?.status === 'Active')?.length,
    inactive: students?.filter(s => s?.status === 'Inactive')?.length,
    suspended: students?.filter(s => s?.status === 'Suspended')?.length
  };

  const handleSelectStudent = (studentId, isSelected) => {
    if (isSelected) {
      setSelectedStudents(prev => [...prev, studentId]);
    } else {
      setSelectedStudents(prev => prev?.filter(id => id !== studentId));
    }
  };

  const handleSelectAll = (isSelected) => {
    if (isSelected) {
      setSelectedStudents(filteredStudents?.map(student => student?.id));
    } else {
      setSelectedStudents([]);
    }
  };

  const handleClearSelection = () => {
    setSelectedStudents([]);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedGrade('');
    setSelectedStatus('');
    setSelectedClass('');
  };

  const handleBulkAction = async (action, studentIds) => {
    console.log(`Performing bulk action: ${action} on students:`, studentIds);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update students based on action
    if (action === 'update-status') {
      // In real app, this would open a modal to select new status
      console.log('Status update completed');
    } else if (action === 'export-data') {
      console.log('Data export initiated');
    }
    
    setSelectedStudents([]);
  };

  const handleViewProfile = (student) => {
    setSelectedStudent(student);
    setIsProfileModalOpen(true);
  };

  const handleEditStudent = (student) => {
    console.log('Edit student:', student);
    // In real app, this would open edit modal
  };

  const handleMessageParent = (student) => {
    console.log('Message parent of:', student?.name);
    // In real app, this would open messaging interface
  };

  const handleEnrollStudent = async (enrollmentData) => {
    console.log('Enrolling new student:', enrollmentData);
    
    // Create new student object
    const newStudent = {
      id: students?.length + 1,
      name: `${enrollmentData?.firstName} ${enrollmentData?.lastName}`,
      studentId: enrollmentData?.studentId,
      email: enrollmentData?.email,
      grade: enrollmentData?.grade,
      class: enrollmentData?.class,
      status: 'Active',
      parentName: `${enrollmentData?.parentFirstName} ${enrollmentData?.parentLastName}`,
      parentPhone: enrollmentData?.parentPhone,
      parentEmail: enrollmentData?.parentEmail,
      lastActivity: new Date()?.toISOString(),
      enrollmentDate: new Date()?.toISOString()?.split('T')?.[0]
    };

    setStudents(prev => [...prev, newStudent]);
    setIsEnrollmentModalOpen(false);
  };

  const handleQuickAction = (actionId) => {
    switch (actionId) {
      case 'add-student':
        setIsEnrollmentModalOpen(true);
        break;
      case 'view-reports': navigate('/grade-book');
        break;
      case 'manage-classes': console.log('Manage classes');
        break;
      default:
        console.log('Quick action:', actionId);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header userRole="administrator" userName="John Doe" />
        <div className="pt-16">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <Icon name="Loader2" size={48} className="text-primary animate-spin mx-auto mb-4" />
              <p className="text-lg font-medium text-foreground">Loading student data...</p>
              <p className="text-sm text-muted-foreground">Please wait while we fetch the information</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header userRole="administrator" userName="John Doe" />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Student Management</h1>
              <p className="text-muted-foreground">
                Manage student enrollment, profiles, and academic records
              </p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
              <NotificationAlert userRole="administrator" />
              <Button
                variant="default"
                onClick={() => setIsEnrollmentModalOpen(true)}
                iconName="UserPlus"
                iconPosition="left"
                className="whitespace-nowrap"
              >
                Enroll New Student
              </Button>
            </div>
          </div>

          {/* Quick Actions Panel */}
          <QuickActionsPanel 
            userRole="administrator" 
            onActionClick={handleQuickAction}
          />

          {/* Student Filters */}
          <StudentFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedGrade={selectedGrade}
            onGradeChange={setSelectedGrade}
            selectedStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
            selectedClass={selectedClass}
            onClassChange={setSelectedClass}
            onClearFilters={handleClearFilters}
            studentCounts={studentCounts}
          />

          {/* Bulk Actions */}
          <BulkActions
            selectedStudents={selectedStudents}
            onBulkAction={handleBulkAction}
            onClearSelection={handleClearSelection}
          />

          {/* Students Table */}
          <StudentTable
            students={filteredStudents}
            selectedStudents={selectedStudents}
            onSelectStudent={handleSelectStudent}
            onSelectAll={handleSelectAll}
            onViewProfile={handleViewProfile}
            onEditStudent={handleEditStudent}
            onMessageParent={handleMessageParent}
          />

          {/* Summary Stats */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-card rounded-lg border border-border p-6 text-center">
              <div className="text-2xl font-bold text-primary mb-2">{studentCounts?.total}</div>
              <div className="text-sm text-muted-foreground">Total Students</div>
            </div>
            <div className="bg-card rounded-lg border border-border p-6 text-center">
              <div className="text-2xl font-bold text-success mb-2">{studentCounts?.active}</div>
              <div className="text-sm text-muted-foreground">Active Students</div>
            </div>
            <div className="bg-card rounded-lg border border-border p-6 text-center">
              <div className="text-2xl font-bold text-warning mb-2">{studentCounts?.inactive}</div>
              <div className="text-sm text-muted-foreground">Inactive Students</div>
            </div>
            <div className="bg-card rounded-lg border border-border p-6 text-center">
              <div className="text-2xl font-bold text-error mb-2">{studentCounts?.suspended}</div>
              <div className="text-sm text-muted-foreground">Suspended Students</div>
            </div>
          </div>
        </div>
      </div>
      {/* Modals */}
      <EnrollmentModal
        isOpen={isEnrollmentModalOpen}
        onClose={() => setIsEnrollmentModalOpen(false)}
        onEnroll={handleEnrollStudent}
      />
      <StudentProfileModal
        isOpen={isProfileModalOpen}
        student={selectedStudent}
        onClose={() => {
          setIsProfileModalOpen(false);
          setSelectedStudent(null);
        }}
        onEdit={handleEditStudent}
        onMessage={handleMessageParent}
      />
    </div>
  );
};

export default StudentManagement;