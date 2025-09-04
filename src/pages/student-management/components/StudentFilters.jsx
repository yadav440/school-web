import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const StudentFilters = ({ 
  searchTerm, 
  onSearchChange, 
  selectedGrade, 
  onGradeChange, 
  selectedStatus, 
  onStatusChange, 
  selectedClass, 
  onClassChange,
  onClearFilters,
  studentCounts 
}) => {
  const gradeOptions = [
    { value: '', label: 'All Grades' },
    { value: 'Pre-K', label: 'Pre-K' },
    { value: 'Kindergarten', label: 'Kindergarten' },
    { value: '1st Grade', label: '1st Grade' },
    { value: '2nd Grade', label: '2nd Grade' },
    { value: '3rd Grade', label: '3rd Grade' },
    { value: '4th Grade', label: '4th Grade' },
    { value: '5th Grade', label: '5th Grade' },
    { value: '6th Grade', label: '6th Grade' },
    { value: '7th Grade', label: '7th Grade' },
    { value: '8th Grade', label: '8th Grade' },
    { value: '9th Grade', label: '9th Grade' },
    { value: '10th Grade', label: '10th Grade' },
    { value: '11th Grade', label: '11th Grade' },
    { value: '12th Grade', label: '12th Grade' }
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
    { value: 'Suspended', label: 'Suspended' },
    { value: 'Graduated', label: 'Graduated' },
    { value: 'Transferred', label: 'Transferred' }
  ];

  const classOptions = [
    { value: '', label: 'All Classes' },
    { value: 'Class A', label: 'Class A' },
    { value: 'Class B', label: 'Class B' },
    { value: 'Class C', label: 'Class C' },
    { value: 'Class D', label: 'Class D' },
    { value: 'Advanced', label: 'Advanced' },
    { value: 'Remedial', label: 'Remedial' }
  ];

  const hasActiveFilters = selectedGrade || selectedStatus || selectedClass || searchTerm;

  return (
    <div className="bg-card rounded-lg border border-border shadow-elevation-1 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-card-foreground">Filter Students</h3>
          {hasActiveFilters && (
            <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
              Active
            </span>
          )}
        </div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            iconName="X"
            iconPosition="left"
          >
            Clear Filters
          </Button>
        )}
      </div>
      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* Search Input */}
        <div className="lg:col-span-2">
          <Input
            type="search"
            placeholder="Search by name, ID, email, or parent..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e?.target?.value)}
            className="w-full"
          />
        </div>

        {/* Grade Filter */}
        <Select
          placeholder="Filter by grade"
          options={gradeOptions}
          value={selectedGrade}
          onChange={onGradeChange}
        />

        {/* Status Filter */}
        <Select
          placeholder="Filter by status"
          options={statusOptions}
          value={selectedStatus}
          onChange={onStatusChange}
        />
      </div>
      {/* Additional Filters Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Class Filter */}
        <Select
          placeholder="Filter by class"
          options={classOptions}
          value={selectedClass}
          onChange={onClassChange}
        />

        {/* Quick Filter Buttons */}
        <div className="md:col-span-2 flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground mr-2">Quick filters:</span>
          <Button
            variant={selectedStatus === 'Active' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onStatusChange(selectedStatus === 'Active' ? '' : 'Active')}
            className="text-xs"
          >
            Active Only
          </Button>
          <Button
            variant={selectedGrade === '12th Grade' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onGradeChange(selectedGrade === '12th Grade' ? '' : '12th Grade')}
            className="text-xs"
          >
            Seniors
          </Button>
          <Button
            variant={selectedStatus === 'Inactive' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onStatusChange(selectedStatus === 'Inactive' ? '' : 'Inactive')}
            className="text-xs"
          >
            Inactive
          </Button>
        </div>
      </div>
      {/* Filter Results Summary */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <span className="text-muted-foreground">Active:</span>
              <span className="font-medium text-card-foreground">{studentCounts?.active}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-warning rounded-full"></div>
              <span className="text-muted-foreground">Inactive:</span>
              <span className="font-medium text-card-foreground">{studentCounts?.inactive}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-error rounded-full"></div>
              <span className="text-muted-foreground">Suspended:</span>
              <span className="font-medium text-card-foreground">{studentCounts?.suspended}</span>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            Total: <span className="font-medium text-card-foreground">{studentCounts?.total}</span> students
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentFilters;