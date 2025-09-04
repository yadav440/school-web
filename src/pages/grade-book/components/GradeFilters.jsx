import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const GradeFilters = ({ 
  onFilterChange, 
  onExport, 
  classes, 
  selectedClass, 
  onClassChange,
  totalStudents,
  totalAssignments 
}) => {
  const [filters, setFilters] = useState({
    assignmentType: '',
    dateRange: '',
    studentGroup: '',
    gradeRange: '',
    searchTerm: ''
  });

  const assignmentTypeOptions = [
    { value: '', label: 'All Types' },
    { value: 'homework', label: 'Homework' },
    { value: 'quiz', label: 'Quiz' },
    { value: 'test', label: 'Test' },
    { value: 'project', label: 'Project' },
    { value: 'participation', label: 'Participation' },
    { value: 'extra_credit', label: 'Extra Credit' }
  ];

  const dateRangeOptions = [
    { value: '', label: 'All Time' },
    { value: 'this_week', label: 'This Week' },
    { value: 'this_month', label: 'This Month' },
    { value: 'last_month', label: 'Last Month' },
    { value: 'this_quarter', label: 'This Quarter' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const studentGroupOptions = [
    { value: '', label: 'All Students' },
    { value: 'high_performers', label: 'High Performers (A-B)' },
    { value: 'average_performers', label: 'Average Performers (C)' },
    { value: 'struggling', label: 'Struggling Students (D-F)' },
    { value: 'missing_assignments', label: 'Missing Assignments' }
  ];

  const gradeRangeOptions = [
    { value: '', label: 'All Grades' },
    { value: '90-100', label: 'A (90-100%)' },
    { value: '80-89', label: 'B (80-89%)' },
    { value: '70-79', label: 'C (70-79%)' },
    { value: '60-69', label: 'D (60-69%)' },
    { value: '0-59', label: 'F (0-59%)' }
  ];

  const classOptions = [
    { value: '', label: 'All Classes' },
    ...classes?.map(cls => ({
      value: cls?.id,
      label: `${cls?.name} - ${cls?.subject}`
    }))
  ];

  const exportOptions = [
    { value: 'csv', label: 'Export as CSV', icon: 'FileText' },
    { value: 'excel', label: 'Export as Excel', icon: 'FileSpreadsheet' },
    { value: 'pdf', label: 'Export as PDF', icon: 'FileDown' },
    { value: 'report_cards', label: 'Generate Report Cards', icon: 'FileCheck' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSearchChange = (e) => {
    const value = e?.target?.value;
    handleFilterChange('searchTerm', value);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      assignmentType: '',
      dateRange: '',
      studentGroup: '',
      gradeRange: '',
      searchTerm: ''
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
    onClassChange('');
  };

  const hasActiveFilters = Object.values(filters)?.some(value => value !== '') || selectedClass !== '';

  return (
    <div className="bg-card rounded-lg border border-border shadow-elevation-1 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-card-foreground">Grade Book Filters</h2>
          <p className="text-sm text-muted-foreground">
            Filter and export grade data • {totalStudents} students • {totalAssignments} assignments
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <Button
              variant="outline"
              onClick={clearAllFilters}
              iconName="X"
              iconPosition="left"
              className="text-sm"
            >
              Clear Filters
            </Button>
          )}
          <div className="relative">
            <Button
              variant="default"
              iconName="Download"
              iconPosition="left"
              className="text-sm"
            >
              Export
            </Button>
          </div>
        </div>
      </div>
      {/* Primary Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <Select
          label="Class"
          options={classOptions}
          value={selectedClass}
          onChange={onClassChange}
          placeholder="Select class"
        />

        <Select
          label="Assignment Type"
          options={assignmentTypeOptions}
          value={filters?.assignmentType}
          onChange={(value) => handleFilterChange('assignmentType', value)}
          placeholder="Filter by type"
        />

        <Select
          label="Date Range"
          options={dateRangeOptions}
          value={filters?.dateRange}
          onChange={(value) => handleFilterChange('dateRange', value)}
          placeholder="Select date range"
        />
      </div>
      {/* Secondary Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <Select
          label="Student Group"
          options={studentGroupOptions}
          value={filters?.studentGroup}
          onChange={(value) => handleFilterChange('studentGroup', value)}
          placeholder="Filter by performance"
        />

        <Select
          label="Grade Range"
          options={gradeRangeOptions}
          value={filters?.gradeRange}
          onChange={(value) => handleFilterChange('gradeRange', value)}
          placeholder="Filter by grade"
        />

        <Input
          label="Search Students"
          type="search"
          value={filters?.searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by name or ID"
        />
      </div>
      {/* Quick Actions */}
      <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Filter" size={16} />
          <span>Quick Filters:</span>
        </div>
        
        <Button
          variant="ghost"
          onClick={() => handleFilterChange('studentGroup', 'struggling')}
          className="text-sm px-3 py-1 h-auto"
        >
          <Icon name="AlertTriangle" size={14} className="mr-1 text-warning" />
          Struggling Students
        </Button>
        
        <Button
          variant="ghost"
          onClick={() => handleFilterChange('studentGroup', 'missing_assignments')}
          className="text-sm px-3 py-1 h-auto"
        >
          <Icon name="AlertCircle" size={14} className="mr-1 text-error" />
          Missing Work
        </Button>
        
        <Button
          variant="ghost"
          onClick={() => handleFilterChange('studentGroup', 'high_performers')}
          className="text-sm px-3 py-1 h-auto"
        >
          <Icon name="Star" size={14} className="mr-1 text-success" />
          Top Performers
        </Button>
        
        <Button
          variant="ghost"
          onClick={() => handleFilterChange('assignmentType', 'test')}
          className="text-sm px-3 py-1 h-auto"
        >
          <Icon name="ClipboardCheck" size={14} className="mr-1 text-primary" />
          Tests Only
        </Button>
      </div>
      {/* Export Options */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Download" size={16} />
            <span>Export Options:</span>
          </div>
          
          <div className="flex items-center space-x-2">
            {exportOptions?.map((option) => (
              <Button
                key={option?.value}
                variant="ghost"
                onClick={() => onExport(option?.value)}
                iconName={option?.icon}
                iconPosition="left"
                className="text-xs px-3 py-1 h-auto"
              >
                {option?.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="flex items-center space-x-2 text-sm">
            <Icon name="Filter" size={16} className="text-primary" />
            <span className="font-medium text-primary">Active Filters:</span>
            <div className="flex flex-wrap items-center gap-2">
              {selectedClass && (
                <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                  Class: {classes?.find(c => c?.id === selectedClass)?.name || selectedClass}
                </span>
              )}
              {Object.entries(filters)?.map(([key, value]) => {
                if (!value) return null;
                const label = key?.replace(/([A-Z])/g, ' $1')?.replace(/^./, str => str?.toUpperCase());
                return (
                  <span key={key} className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                    {label}: {value}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GradeFilters;