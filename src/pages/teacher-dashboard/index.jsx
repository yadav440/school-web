import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import NotificationAlert from '../../components/ui/NotificationAlert';
import ClassOverviewCard from './components/ClassOverviewCard';
import QuickActionCard from './components/QuickActionCard';
import ScheduleTaskView from './components/ScheduleTaskView';
import ActivityPanel from './components/ActivityPanel';
import AssignmentModal from './components/AssignmentModal';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isAssignmentModalOpen, setIsAssignmentModalOpen] = useState(false);

  // Mock data for teacher dashboard
  const teacherInfo = {
    name: "Sarah Johnson",
    role: "teacher",
    employeeId: "TCH001",
    department: "Mathematics",
    email: "sarah.johnson@schoolhub.edu"
  };

  const classesData = [
    {
      id: 1,
      subject: "Algebra II",
      grade: "10",
      section: "A",
      enrolledStudents: 28,
      pendingAssignments: 3,
      nextClass: "Today 10:30 AM",
      status: "active",
      recentActivity: true
    },
    {
      id: 2,
      subject: "Geometry",
      grade: "9",
      section: "B",
      enrolledStudents: 25,
      pendingAssignments: 1,
      nextClass: "Today 2:15 PM",
      status: "upcoming",
      recentActivity: false
    },
    {
      id: 3,
      subject: "Pre-Calculus",
      grade: "11",
      section: "A",
      enrolledStudents: 22,
      pendingAssignments: 2,
      nextClass: "Tomorrow 9:00 AM",
      status: "upcoming",
      recentActivity: true
    },
    {
      id: 4,
      subject: "Statistics",
      grade: "12",
      section: "C",
      enrolledStudents: 20,
      pendingAssignments: 0,
      nextClass: "Tomorrow 1:30 PM",
      status: "completed",
      recentActivity: false
    }
  ];

  const quickActions = [
    {
      id: 'grade-book',
      title: 'Grade Book',
      description: 'View and update student grades',
      icon: 'BookOpen',
      type: 'grade',
      badge: '12 pending'
    },
    {
      id: 'create-assignment',
      title: 'Create Assignment',
      description: 'Design new homework or projects',
      icon: 'PlusCircle',
      type: 'assignment'
    },
    {
      id: 'attendance',
      title: 'Take Attendance',
      description: 'Mark student attendance for today',
      icon: 'CheckSquare',
      type: 'attendance',
      badge: '3 classes'
    },
    {
      id: 'parent-communication',
      title: 'Message Parents',
      description: 'Send updates to parents',
      icon: 'MessageSquare',
      type: 'communication',
      badge: '5 unread'
    }
  ];

  const scheduleData = [
    {
      subject: "Algebra II",
      grade: "10",
      room: "Math-101",
      startTime: "08:30",
      endTime: "09:20",
      status: "completed"
    },
    {
      subject: "Geometry",
      grade: "9",
      room: "Math-102",
      startTime: "10:30",
      endTime: "11:20",
      status: "current"
    },
    {
      subject: "Pre-Calculus",
      grade: "11",
      room: "Math-101",
      startTime: "13:15",
      endTime: "14:05",
      status: "upcoming"
    },
    {
      subject: "Statistics",
      grade: "12",
      room: "Math-103",
      startTime: "15:00",
      endTime: "15:50",
      status: "upcoming"
    }
  ];

  const taskData = [
    {
      title: "Grade Algebra II Quiz",
      description: "Review and grade Chapter 5 quiz submissions",
      priority: "high",
      dueDate: "Today 5:00 PM",
      class: "Algebra II - Grade 10A",
      completed: false
    },
    {
      title: "Prepare Geometry Lesson Plan",
      description: "Create lesson plan for triangle properties",
      priority: "medium",
      dueDate: "Tomorrow 8:00 AM",
      class: "Geometry - Grade 9B",
      completed: false
    },
    {
      title: "Update Parent Progress Reports",
      description: "Send monthly progress updates to parents",
      priority: "medium",
      dueDate: "Friday 3:00 PM",
      class: "All Classes",
      completed: false
    },
    {
      title: "Submit Attendance Records",
      description: "Weekly attendance submission to administration",
      priority: "low",
      dueDate: "Friday 4:00 PM",
      class: "All Classes",
      completed: true
    }
  ];

  const submissionsData = [
    {
      assignment: "Chapter 5 Quiz",
      studentName: "Emma Wilson",
      class: "Algebra II - Grade 10A",
      type: "quiz",
      submittedAt: new Date(Date.now() - 30 * 60 * 1000),
      isLate: false
    },
    {
      assignment: "Triangle Properties Worksheet",
      studentName: "Michael Chen",
      class: "Geometry - Grade 9B",
      type: "assignment",
      submittedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isLate: true
    },
    {
      assignment: "Statistics Project",
      studentName: "Sarah Davis",
      class: "Statistics - Grade 12C",
      type: "project",
      submittedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
      isLate: false
    }
  ];

  const alertsData = [
    {
      title: "Low Grade Alert",
      message: "Alex Thompson scored below 60% on recent quiz",
      type: "grade",
      severity: "high",
      student: "Alex Thompson",
      timestamp: new Date(Date.now() - 45 * 60 * 1000)
    },
    {
      title: "Attendance Concern",
      message: "Jessica Martinez has missed 3 consecutive classes",
      type: "attendance",
      severity: "medium",
      student: "Jessica Martinez",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      title: "Assignment Overdue",
      message: "5 students haven\'t submitted Chapter 4 homework",
      type: "assignment",
      severity: "medium",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000)
    }
  ];

  const notificationsData = [
    {
      from: "Principal Johnson",
      subject: "Faculty Meeting Tomorrow",
      preview: "Please attend the faculty meeting tomorrow at 3:30 PM in the conference room...",
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      read: false
    },
    {
      from: "Parent - Mrs. Wilson",
      subject: "Emma\'s Progress Inquiry",
      preview: "I wanted to discuss Emma\'s recent performance in Algebra II...",
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      read: false
    },
    {
      from: "IT Department",
      subject: "System Maintenance Notice",
      preview: "The gradebook system will be offline for maintenance this weekend...",
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      read: true
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const handleQuickAction = (action) => {
    switch (action?.id) {
      case 'grade-book': navigate('/grade-book');
        break;
      case 'create-assignment':
        setIsAssignmentModalOpen(true);
        break;
      case 'attendance': console.log('Taking attendance');
        break;
      case 'parent-communication': console.log('Opening parent communication');
        break;
      default:
        console.log('Action:', action?.id);
    }
  };

  const handleViewClass = (classData) => {
    console.log('Viewing class:', classData);
    // Navigate to class details or open class management modal
  };

  const formatCurrentTime = () => {
    return currentTime?.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header userRole="teacher" userName={teacherInfo?.name} />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="mb-4 lg:mb-0">
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Welcome back, {teacherInfo?.name}
                </h1>
                <p className="text-muted-foreground">
                  {formatCurrentTime()}
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <NotificationAlert userRole="teacher" />
                <Button
                  variant="default"
                  onClick={() => setIsAssignmentModalOpen(true)}
                  iconName="Plus"
                  iconPosition="left"
                  className="hidden sm:flex"
                >
                  Create Assignment
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-card rounded-lg border border-border shadow-elevation-1 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Classes</p>
                  <p className="text-2xl font-bold text-card-foreground">{classesData?.length}</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="BookOpen" size={24} className="text-primary" />
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border shadow-elevation-1 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Students</p>
                  <p className="text-2xl font-bold text-card-foreground">
                    {classesData?.reduce((sum, cls) => sum + cls?.enrolledStudents, 0)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Users" size={24} className="text-secondary" />
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border shadow-elevation-1 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Pending Grades</p>
                  <p className="text-2xl font-bold text-card-foreground">
                    {submissionsData?.length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                  <Icon name="TrendingUp" size={24} className="text-warning" />
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border shadow-elevation-1 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Active Alerts</p>
                  <p className="text-2xl font-bold text-card-foreground">
                    {alertsData?.length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-error/10 rounded-lg flex items-center justify-center">
                  <Icon name="AlertTriangle" size={24} className="text-error" />
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Left Column - Classes and Quick Actions */}
            <div className="xl:col-span-2 space-y-8">
              {/* Class Overview */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-foreground">My Classes</h2>
                  <Button
                    variant="outline"
                    onClick={() => console.log('View all classes')}
                    iconName="ArrowRight"
                    iconPosition="right"
                    className="text-sm"
                  >
                    View All
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {classesData?.map((classData) => (
                    <ClassOverviewCard
                      key={classData?.id}
                      classData={classData}
                      onViewClass={handleViewClass}
                    />
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-6">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {quickActions?.map((action) => (
                    <QuickActionCard
                      key={action?.id}
                      action={action}
                      onActionClick={handleQuickAction}
                    />
                  ))}
                </div>
              </div>

              {/* Schedule and Tasks */}
              <ScheduleTaskView
                scheduleData={scheduleData}
                taskData={taskData}
              />
            </div>

            {/* Right Column - Activity Panel */}
            <div className="xl:col-span-1">
              <ActivityPanel
                submissions={submissionsData}
                alerts={alertsData}
                notifications={notificationsData}
              />
            </div>
          </div>
        </div>
      </main>
      {/* Assignment Creation Modal */}
      <AssignmentModal
        isOpen={isAssignmentModalOpen}
        onClose={() => setIsAssignmentModalOpen(false)}
        classes={classesData}
      />
    </div>
  );
};

export default TeacherDashboard;