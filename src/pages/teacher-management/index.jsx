import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import NotificationAlert from '../../components/ui/NotificationAlert';
import TeacherCard from './components/TeacherCard';
import TeacherFilters from './components/TeacherFilters';
import AddTeacherModal from './components/AddTeacherModal';
import TeacherProfileModal from './components/TeacherProfileModal';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const TeacherManagement = () => {
  const [teachers, setTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [loading, setLoading] = useState(true);

  // Mock data for teachers
  const mockTeachers = [
    {
      id: 1,
      employeeId: 'TCH001',
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@school.edu',
      phone: '+1 (555) 123-4567',
      department: 'Mathematics',
      subject: 'Algebra, Geometry',
      qualification: 'PhD in Mathematics',
      experience: '12 years',
      joinDate: '2012-08-15',
      status: 'active',
      photoUrl: null,
      videoUrl: null,
      bio: 'Experienced mathematics teacher with expertise in algebra and geometry.',
      classesAssigned: ['Algebra II - Grade 10A', 'Geometry - Grade 9B'],
      achievements: ['Teacher of the Year 2023', 'Mathematics Excellence Award']
    },
    {
      id: 2,
      employeeId: 'TCH002',
      name: 'Prof. Michael Chen',
      email: 'michael.chen@school.edu',
      phone: '+1 (555) 234-5678',
      department: 'Science',
      subject: 'Physics, Chemistry',
      qualification: 'MSc in Physics',
      experience: '8 years',
      joinDate: '2016-01-20',
      status: 'active',
      photoUrl: null,
      videoUrl: null,
      bio: 'Physics and chemistry teacher passionate about laboratory experiments.',
      classesAssigned: ['Physics - Grade 11A', 'Chemistry - Grade 10B'],
      achievements: ['Science Fair Coordinator', 'Lab Safety Excellence']
    },
    {
      id: 3,
      employeeId: 'TCH003',
      name: 'Ms. Emma Wilson',
      email: 'emma.wilson@school.edu',
      phone: '+1 (555) 345-6789',
      department: 'English',
      subject: 'Literature, Creative Writing',
      qualification: 'MA in English Literature',
      experience: '6 years',
      joinDate: '2018-09-10',
      status: 'active',
      photoUrl: null,
      videoUrl: null,
      bio: 'English literature teacher with a focus on creative writing and critical thinking.',
      classesAssigned: ['English Literature - Grade 12A', 'Creative Writing - Grade 11B'],
      achievements: ['Young Writer Program Director', 'Literary Magazine Editor']
    },
    {
      id: 4,
      employeeId: 'TCH004',
      name: 'Mr. David Rodriguez',
      email: 'david.rodriguez@school.edu',
      phone: '+1 (555) 456-7890',
      department: 'History',
      subject: 'World History, Social Studies',
      qualification: 'BA in History',
      experience: '10 years',
      joinDate: '2014-03-15',
      status: 'active',
      photoUrl: null,
      videoUrl: null,
      bio: 'History teacher specializing in world history and social studies curriculum.',
      classesAssigned: ['World History - Grade 9A', 'Social Studies - Grade 8B'],
      achievements: ['History Olympiad Coach', 'Cultural Exchange Program Leader']
    }
  ];

  const departments = [
    'Mathematics', 'Science', 'English', 'History', 'Arts', 'Physical Education', 'Computer Science'
  ];

  useEffect(() => {
    // Simulate loading teachers data
    setTimeout(() => {
      setTeachers(mockTeachers);
      setFilteredTeachers(mockTeachers);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // Filter teachers based on search term and department
    let filtered = teachers;

    if (searchTerm) {
      filtered = filtered?.filter(teacher =>
        teacher?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        teacher?.employeeId?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        teacher?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        teacher?.department?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        teacher?.subject?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      );
    }

    if (filterDepartment && filterDepartment !== 'all') {
      filtered = filtered?.filter(teacher => teacher?.department === filterDepartment);
    }

    setFilteredTeachers(filtered);
  }, [teachers, searchTerm, filterDepartment]);

  const handleAddTeacher = (teacherData) => {
    const newTeacher = {
      ...teacherData,
      id: teachers?.length + 1,
      employeeId: `TCH${String(teachers?.length + 1)?.padStart(3, '0')}`,
      joinDate: new Date()?.toISOString()?.split('T')?.[0],
      status: 'active',
      classesAssigned: [],
      achievements: []
    };

    setTeachers([...teachers, newTeacher]);
    setIsAddModalOpen(false);
  };

  const handleUpdateTeacher = (updatedTeacher) => {
    setTeachers(teachers?.map(teacher =>
      teacher?.id === updatedTeacher?.id ? updatedTeacher : teacher
    ));
    setIsProfileModalOpen(false);
    setSelectedTeacher(null);
  };

  const handleDeleteTeacher = (teacherId) => {
    if (window?.confirm('Are you sure you want to delete this teacher?')) {
      setTeachers(teachers?.filter(teacher => teacher?.id !== teacherId));
    }
  };

  const handleViewProfile = (teacher) => {
    setSelectedTeacher(teacher);
    setIsProfileModalOpen(true);
  };

  const handleFilterChange = (filters) => {
    setSearchTerm(filters?.search || '');
    setFilterDepartment(filters?.department || 'all');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header userRole="administrator" userName="Dr. Sarah Johnson" />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  Teacher Management
                </h1>
                <p className="text-muted-foreground">
                  Manage teacher profiles, photos, and video introductions
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <NotificationAlert userRole="administrator" />
                <Button
                  onClick={() => setIsAddModalOpen(true)}
                  iconName="Plus"
                  iconPosition="left"
                >
                  Add Teacher
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-card rounded-lg border border-border shadow-elevation-1 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Teachers</p>
                  <p className="text-2xl font-bold text-card-foreground">{teachers?.length}</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Users" size={24} className="text-primary" />
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border shadow-elevation-1 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Active Teachers</p>
                  <p className="text-2xl font-bold text-card-foreground">
                    {teachers?.filter(t => t?.status === 'active')?.length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                  <Icon name="CheckCircle" size={24} className="text-success" />
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border shadow-elevation-1 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">With Photos</p>
                  <p className="text-2xl font-bold text-card-foreground">
                    {teachers?.filter(t => t?.photoUrl)?.length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Camera" size={24} className="text-secondary" />
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border shadow-elevation-1 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">With Videos</p>
                  <p className="text-2xl font-bold text-card-foreground">
                    {teachers?.filter(t => t?.videoUrl)?.length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Icon name="Video" size={24} className="text-accent" />
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="mb-8">
            <TeacherFilters
              departments={departments}
              onFilterChange={handleFilterChange}
            />
          </div>

          {/* Teachers Grid */}
          <div className="bg-card rounded-lg border border-border shadow-elevation-1 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-card-foreground">
                Teachers ({filteredTeachers?.length})
              </h2>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Grid3X3"
                  iconPosition="left"
                  className="text-sm"
                >
                  Grid View
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="List"
                  iconPosition="left"
                  className="text-sm"
                >
                  List View
                </Button>
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : filteredTeachers?.length === 0 ? (
              <div className="text-center py-12">
                <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground text-lg mb-2">No teachers found</p>
                <p className="text-muted-foreground mb-6">
                  {searchTerm || filterDepartment !== 'all' ?'Try adjusting your search or filter criteria.' :'Get started by adding your first teacher.'}
                </p>
                <Button onClick={() => setIsAddModalOpen(true)} iconName="Plus">
                  Add First Teacher
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredTeachers?.map((teacher) => (
                  <TeacherCard
                    key={teacher?.id}
                    teacher={teacher}
                    onViewProfile={handleViewProfile}
                    onDelete={handleDeleteTeacher}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Add Teacher Modal */}
      <AddTeacherModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddTeacher}
        departments={departments}
      />

      {/* Teacher Profile Modal */}
      <TeacherProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => {
          setIsProfileModalOpen(false);
          setSelectedTeacher(null);
        }}
        teacher={selectedTeacher}
        onUpdate={handleUpdateTeacher}
        departments={departments}
      />
    </div>
  );
};

export default TeacherManagement;