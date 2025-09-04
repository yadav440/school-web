import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import NotificationAlert from '../../components/ui/NotificationAlert';
import QuickActionsPanel from '../../components/ui/QuickActionsPanel';
import GradeTable from './components/GradeTable';
import AssignmentManager from './components/AssignmentManager';
import GradeAnalytics from './components/GradeAnalytics';
import GradeFilters from './components/GradeFilters';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const GradeBook = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('gradebook');
  const [selectedClass, setSelectedClass] = useState('');
  const [filters, setFilters] = useState({});
  const [grades, setGrades] = useState({});
  const [assignments, setAssignments] = useState([]);
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);

  // Mock data initialization
  useEffect(() => {
    // Mock classes
    const mockClasses = [
      { id: 'math-101', name: 'Mathematics 101', subject: 'Mathematics', grade: '9th' },
      { id: 'eng-101', name: 'English Literature', subject: 'English', grade: '9th' },
      { id: 'sci-101', name: 'Biology Basics', subject: 'Science', grade: '9th' },
      { id: 'hist-101', name: 'World History', subject: 'History', grade: '9th' }
    ];

    // Mock students
    const mockStudents = [
      { id: 1, firstName: 'Emma', lastName: 'Johnson', studentId: 'STU001', email: 'emma.johnson@school.edu', grade: '9th' },
      { id: 2, firstName: 'Liam', lastName: 'Williams', studentId: 'STU002', email: 'liam.williams@school.edu', grade: '9th' },
      { id: 3, firstName: 'Olivia', lastName: 'Brown', studentId: 'STU003', email: 'olivia.brown@school.edu', grade: '9th' },
      { id: 4, firstName: 'Noah', lastName: 'Davis', studentId: 'STU004', email: 'noah.davis@school.edu', grade: '9th' },
      { id: 5, firstName: 'Ava', lastName: 'Miller', studentId: 'STU005', email: 'ava.miller@school.edu', grade: '9th' },
      { id: 6, firstName: 'Ethan', lastName: 'Wilson', studentId: 'STU006', email: 'ethan.wilson@school.edu', grade: '9th' },
      { id: 7, firstName: 'Sophia', lastName: 'Moore', studentId: 'STU007', email: 'sophia.moore@school.edu', grade: '9th' },
      { id: 8, firstName: 'Mason', lastName: 'Taylor', studentId: 'STU008', email: 'mason.taylor@school.edu', grade: '9th' },
      { id: 9, firstName: 'Isabella', lastName: 'Anderson', studentId: 'STU009', email: 'isabella.anderson@school.edu', grade: '9th' },
      { id: 10, firstName: 'William', lastName: 'Thomas', studentId: 'STU010', email: 'william.thomas@school.edu', grade: '9th' }
    ];

    // Mock assignments
    const mockAssignments = [
      { id: 1, title: 'Algebra Quiz 1', type: 'quiz', maxPoints: 50, dueDate: '2025-09-10', description: 'Basic algebraic equations' },
      { id: 2, title: 'Geometry Homework', type: 'homework', maxPoints: 25, dueDate: '2025-09-12', description: 'Chapter 3 exercises' },
      { id: 3, title: 'Midterm Exam', type: 'test', maxPoints: 100, dueDate: '2025-09-15', description: 'Comprehensive midterm examination' },
      { id: 4, title: 'Math Project', type: 'project', maxPoints: 75, dueDate: '2025-09-20', description: 'Real-world math applications' },
      { id: 5, title: 'Class Participation', type: 'participation', maxPoints: 20, dueDate: '2025-09-25', description: 'Weekly participation grade' }
    ];

    // Mock grades
    const mockGrades = {};
    mockStudents?.forEach(student => {
      mockAssignments?.forEach(assignment => {
        // Generate realistic grades with some missing submissions
        const shouldHaveGrade = Math.random() > 0.1; // 90% submission rate
        if (shouldHaveGrade) {
          let grade;
          // Generate grades based on assignment type
          if (assignment?.type === 'test') {
            grade = Math.floor(Math.random() * 30) + 70; // 70-100 for tests
          } else if (assignment?.type === 'quiz') {
            grade = Math.floor(Math.random() * 25) + 75; // 75-100 for quizzes
          } else if (assignment?.type === 'homework') {
            grade = Math.floor(Math.random() * 20) + 80; // 80-100 for homework
          } else if (assignment?.type === 'project') {
            grade = Math.floor(Math.random() * 35) + 65; // 65-100 for projects
          } else {
            grade = Math.floor(Math.random() * 20) + 80; // 80-100 for participation
          }
          
          // Convert to percentage based on max points
          const percentage = (grade / 100) * assignment?.maxPoints;
          mockGrades[`${student.id}-${assignment.id}`] = Math.round(percentage);
        }
      });
    });

    setClasses(mockClasses);
    setStudents(mockStudents);
    setAssignments(mockAssignments);
    setGrades(mockGrades);
    setSelectedClass(mockClasses?.[0]?.id);
  }, []);

  const handleGradeUpdate = (studentId, assignmentId, newGrade) => {
    setGrades(prev => ({
      ...prev,
      [`${studentId}-${assignmentId}`]: newGrade
    }));
  };

  const handleAddAssignment = (assignmentData) => {
    setAssignments(prev => [...prev, assignmentData]);
  };

  const handleUpdateAssignment = (updatedAssignment) => {
    setAssignments(prev => 
      prev?.map(assignment => 
        assignment?.id === updatedAssignment?.id ? updatedAssignment : assignment
      )
    );
  };

  const handleDeleteAssignment = (assignmentId) => {
    setAssignments(prev => prev?.filter(assignment => assignment?.id !== assignmentId));
    
    // Remove all grades for this assignment
    const updatedGrades = { ...grades };
    Object.keys(updatedGrades)?.forEach(key => {
      if (key?.endsWith(`-${assignmentId}`)) {
        delete updatedGrades?.[key];
      }
    });
    setGrades(updatedGrades);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleExport = (format) => {
    console.log(`Exporting grades as ${format}`);
    // In a real application, this would trigger the export functionality
  };

  const handleQuickAction = (actionId) => {
    switch (actionId) {
      case 'grade-assignment': setActiveTab('gradebook');
        break;
      case 'create-assignment': setActiveTab('assignments');
        break;
      case 'attendance': navigate('/teacher-dashboard');
        break;
      case 'message-parents': console.log('Message parents');
        break;
      case 'lesson-plan': console.log('Lesson plans');
        break;
      case 'class-roster': console.log('Class roster');
        break;
      default:
        console.log(`Action: ${actionId}`);
    }
  };

  const tabs = [
    { id: 'gradebook', label: 'Grade Book', icon: 'BookOpen' },
    { id: 'assignments', label: 'Assignments', icon: 'FileText' },
    { id: 'analytics', label: 'Analytics', icon: 'BarChart3' }
  ];

  const filteredStudents = students; // In real app, apply filters here
  const filteredAssignments = assignments; // In real app, apply filters here

  return (
    <div className="min-h-screen bg-background">
      <Header userRole="teacher" userName="Sarah Johnson" />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Grade Book</h1>
              <p className="text-muted-foreground mt-2">
                Manage student grades and track academic performance
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <NotificationAlert userRole="teacher" />
              <Button
                variant="outline"
                onClick={() => navigate('/teacher-dashboard')}
                iconName="ArrowLeft"
                iconPosition="left"
              >
                Back to Dashboard
              </Button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center space-x-1 mb-8 bg-muted/20 p-1 rounded-lg w-fit">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab?.id
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="space-y-6">
            {activeTab === 'gradebook' && (
              <>
                <GradeFilters
                  onFilterChange={handleFilterChange}
                  onExport={handleExport}
                  classes={classes}
                  selectedClass={selectedClass}
                  onClassChange={setSelectedClass}
                  totalStudents={filteredStudents?.length}
                  totalAssignments={filteredAssignments?.length}
                />
                
                <GradeTable
                  students={filteredStudents}
                  assignments={filteredAssignments}
                  grades={grades}
                  onGradeUpdate={handleGradeUpdate}
                  selectedClass={selectedClass}
                />
              </>
            )}

            {activeTab === 'assignments' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <AssignmentManager
                    assignments={assignments}
                    onAddAssignment={handleAddAssignment}
                    onUpdateAssignment={handleUpdateAssignment}
                    onDeleteAssignment={handleDeleteAssignment}
                  />
                </div>
                <div>
                  <QuickActionsPanel
                    userRole="teacher"
                    onActionClick={handleQuickAction}
                  />
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <GradeAnalytics
                students={filteredStudents}
                assignments={filteredAssignments}
                grades={grades}
                selectedClass={selectedClass}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradeBook;