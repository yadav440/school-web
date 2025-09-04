import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const StudentTable = ({ 
  students, 
  selectedStudents, 
  onSelectStudent, 
  onSelectAll, 
  onViewProfile, 
  onEditStudent, 
  onMessageParent 
}) => {
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedStudents = [...students]?.sort((a, b) => {
    let aValue = a?.[sortField];
    let bValue = b?.[sortField];
    
    if (typeof aValue === 'string') {
      aValue = aValue?.toLowerCase();
      bValue = bValue?.toLowerCase();
    }
    
    if (sortDirection === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'text-success bg-success/10 border-success/20';
      case 'Inactive': return 'text-error bg-error/10 border-error/20';
      case 'Suspended': return 'text-warning bg-warning/10 border-warning/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getActivityColor = (activity) => {
    const now = new Date();
    const activityDate = new Date(activity);
    const diffHours = (now - activityDate) / (1000 * 60 * 60);
    
    if (diffHours < 24) return 'text-success';
    if (diffHours < 72) return 'text-warning';
    return 'text-muted-foreground';
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field) {
      return <Icon name="ArrowUpDown" size={14} className="text-muted-foreground" />;
    }
    return (
      <Icon 
        name={sortDirection === 'asc' ? 'ArrowUp' : 'ArrowDown'} 
        size={14} 
        className="text-primary" 
      />
    );
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-elevation-1 overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="w-12 px-4 py-3">
                <Checkbox
                  checked={selectedStudents?.length === students?.length && students?.length > 0}
                  indeterminate={selectedStudents?.length > 0 && selectedStudents?.length < students?.length}
                  onChange={(e) => onSelectAll(e?.target?.checked)}
                />
              </th>
              <th className="text-left px-4 py-3">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-2 text-sm font-medium text-card-foreground hover:text-primary transition-colors"
                >
                  <span>Student Name</span>
                  <SortIcon field="name" />
                </button>
              </th>
              <th className="text-left px-4 py-3">
                <button
                  onClick={() => handleSort('studentId')}
                  className="flex items-center space-x-2 text-sm font-medium text-card-foreground hover:text-primary transition-colors"
                >
                  <span>Student ID</span>
                  <SortIcon field="studentId" />
                </button>
              </th>
              <th className="text-left px-4 py-3">
                <button
                  onClick={() => handleSort('grade')}
                  className="flex items-center space-x-2 text-sm font-medium text-card-foreground hover:text-primary transition-colors"
                >
                  <span>Grade</span>
                  <SortIcon field="grade" />
                </button>
              </th>
              <th className="text-left px-4 py-3">
                <button
                  onClick={() => handleSort('status')}
                  className="flex items-center space-x-2 text-sm font-medium text-card-foreground hover:text-primary transition-colors"
                >
                  <span>Status</span>
                  <SortIcon field="status" />
                </button>
              </th>
              <th className="text-left px-4 py-3">
                <span className="text-sm font-medium text-card-foreground">Parent Contact</span>
              </th>
              <th className="text-left px-4 py-3">
                <button
                  onClick={() => handleSort('lastActivity')}
                  className="flex items-center space-x-2 text-sm font-medium text-card-foreground hover:text-primary transition-colors"
                >
                  <span>Last Activity</span>
                  <SortIcon field="lastActivity" />
                </button>
              </th>
              <th className="text-center px-4 py-3">
                <span className="text-sm font-medium text-card-foreground">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedStudents?.map((student) => (
              <tr key={student?.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-4">
                  <Checkbox
                    checked={selectedStudents?.includes(student?.id)}
                    onChange={(e) => onSelectStudent(student?.id, e?.target?.checked)}
                  />
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">
                        {student?.name?.split(' ')?.map(n => n?.[0])?.join('')}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-card-foreground">{student?.name}</p>
                      <p className="text-xs text-muted-foreground">{student?.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="text-sm text-card-foreground font-mono">{student?.studentId}</span>
                </td>
                <td className="px-4 py-4">
                  <span className="text-sm text-card-foreground">{student?.grade}</span>
                </td>
                <td className="px-4 py-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(student?.status)}`}>
                    {student?.status}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div>
                    <p className="text-sm text-card-foreground">{student?.parentName}</p>
                    <p className="text-xs text-muted-foreground">{student?.parentPhone}</p>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className={`text-xs ${getActivityColor(student?.lastActivity)}`}>
                    {formatDate(student?.lastActivity)}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center justify-center space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onViewProfile(student)}
                      className="h-8 w-8"
                    >
                      <Icon name="Eye" size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEditStudent(student)}
                      className="h-8 w-8"
                    >
                      <Icon name="Edit" size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onMessageParent(student)}
                      className="h-8 w-8"
                    >
                      <Icon name="MessageSquare" size={14} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className="lg:hidden divide-y divide-border">
        {sortedStudents?.map((student) => (
          <div key={student?.id} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <Checkbox
                  checked={selectedStudents?.includes(student?.id)}
                  onChange={(e) => onSelectStudent(student?.id, e?.target?.checked)}
                />
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-primary">
                    {student?.name?.split(' ')?.map(n => n?.[0])?.join('')}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-card-foreground">{student?.name}</p>
                  <p className="text-xs text-muted-foreground">{student?.studentId}</p>
                </div>
              </div>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(student?.status)}`}>
                {student?.status}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-3 text-xs">
              <div>
                <span className="text-muted-foreground">Grade:</span>
                <span className="ml-1 text-card-foreground">{student?.grade}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Last Activity:</span>
                <span className={`ml-1 ${getActivityColor(student?.lastActivity)}`}>
                  {formatDate(student?.lastActivity)}
                </span>
              </div>
            </div>
            
            <div className="mb-3">
              <p className="text-xs text-muted-foreground">Parent Contact:</p>
              <p className="text-sm text-card-foreground">{student?.parentName}</p>
              <p className="text-xs text-muted-foreground">{student?.parentPhone}</p>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onViewProfile(student)}
                iconName="Eye"
                iconPosition="left"
                className="flex-1"
              >
                View
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEditStudent(student)}
                iconName="Edit"
                iconPosition="left"
                className="flex-1"
              >
                Edit
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onMessageParent(student)}
                className="h-8 w-8"
              >
                <Icon name="MessageSquare" size={14} />
              </Button>
            </div>
          </div>
        ))}
      </div>
      {/* Empty State */}
      {students?.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Icon name="Users" size={48} className="text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-card-foreground mb-2">No students found</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Get started by enrolling your first student
          </p>
          <Button variant="default" iconName="UserPlus" iconPosition="left">
            Enroll Student
          </Button>
        </div>
      )}
    </div>
  );
};

export default StudentTable;