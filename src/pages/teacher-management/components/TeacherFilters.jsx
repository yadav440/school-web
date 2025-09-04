import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const TeacherFilters = ({ departments, onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'on-leave', label: 'On Leave' }
  ];

  const departmentOptions = [
    { value: 'all', label: 'All Departments' },
    ...departments?.map(dept => ({ value: dept, label: dept }))
  ];

  const handleSearchChange = (e) => {
    const value = e?.target?.value;
    setSearchTerm(value);
    applyFilters(value, selectedDepartment, selectedStatus);
  };

  const handleDepartmentChange = (value) => {
    setSelectedDepartment(value);
    applyFilters(searchTerm, value, selectedStatus);
  };

  const handleStatusChange = (value) => {
    setSelectedStatus(value);
    applyFilters(searchTerm, selectedDepartment, value);
  };

  const applyFilters = (search, department, status) => {
    onFilterChange?.({
      search: search?.trim(),
      department: department,
      status: status
    });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedDepartment('all');
    setSelectedStatus('all');
    onFilterChange?.({
      search: '',
      department: 'all',
      status: 'all'
    });
  };

  const hasActiveFilters = searchTerm || selectedDepartment !== 'all' || selectedStatus !== 'all';

  return (
    <div className="bg-card rounded-lg border border-border shadow-elevation-1 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-card-foreground">Filters</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            iconName="X"
            iconPosition="left"
            className="text-sm"
          >
            Clear Filters
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div className="lg:col-span-2">
          <Input
            type="text"
            placeholder="Search teachers by name, ID, email..."
            value={searchTerm}
            onChange={handleSearchChange}
            leftIcon="Search"
            className="w-full"
          />
        </div>

        {/* Department Filter */}
        <div>
          <Select
            options={departmentOptions}
            value={selectedDepartment}
            onChange={handleDepartmentChange}
            placeholder="Select Department"
            leftIcon="Building"
          />
        </div>

        {/* Status Filter */}
        <div>
          <Select
            options={statusOptions}
            value={selectedStatus}
            onChange={handleStatusChange}
            placeholder="Select Status"
            leftIcon="CheckCircle"
          />
        </div>
      </div>

      {/* Filter Summary */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center flex-wrap gap-2">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            
            {searchTerm && (
              <span className="inline-flex items-center px-2 py-1 rounded-md bg-primary/10 text-primary text-xs">
                <Icon name="Search" size={12} className="mr-1" />
                "{searchTerm}"
              </span>
            )}
            
            {selectedDepartment !== 'all' && (
              <span className="inline-flex items-center px-2 py-1 rounded-md bg-secondary/10 text-secondary text-xs">
                <Icon name="Building" size={12} className="mr-1" />
                {selectedDepartment}
              </span>
            )}
            
            {selectedStatus !== 'all' && (
              <span className="inline-flex items-center px-2 py-1 rounded-md bg-accent/10 text-accent text-xs">
                <Icon name="CheckCircle" size={12} className="mr-1" />
                {selectedStatus?.replace('-', ' ')?.toUpperCase()}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherFilters;