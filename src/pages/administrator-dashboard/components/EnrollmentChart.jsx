import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EnrollmentChart = () => {
  const [chartType, setChartType] = useState('bar');
  const [timeRange, setTimeRange] = useState('6months');

  const enrollmentData = [
    { month: 'Mar', students: 1180, teachers: 82, revenue: 118000 },
    { month: 'Apr', students: 1205, teachers: 84, revenue: 120500 },
    { month: 'May', students: 1198, teachers: 85, revenue: 119800 },
    { month: 'Jun', students: 1220, teachers: 86, revenue: 122000 },
    { month: 'Jul', students: 1235, teachers: 87, revenue: 123500 },
    { month: 'Aug', students: 1247, teachers: 89, revenue: 124700 }
  ];

  const gradeDistribution = [
    { grade: 'K-2', students: 245, color: '#1e40af' },
    { grade: '3-5', students: 298, color: '#0f766e' },
    { grade: '6-8', students: 356, color: '#ea580c' },
    { grade: '9-12', students: 348, color: '#059669' }
  ];

  const attendanceData = [
    { day: 'Mon', rate: 96.2 },
    { day: 'Tue', rate: 94.8 },
    { day: 'Wed', rate: 95.1 },
    { day: 'Thu', rate: 93.7 },
    { day: 'Fri', rate: 92.4 },
    { day: 'Sat', rate: 89.3 },
    { day: 'Sun', rate: 0 }
  ];

  const chartTypes = [
    { value: 'bar', label: 'Bar Chart', icon: 'BarChart3' },
    { value: 'line', label: 'Line Chart', icon: 'TrendingUp' },
    { value: 'pie', label: 'Distribution', icon: 'PieChart' }
  ];

  const timeRanges = [
    { value: '3months', label: '3 Months' },
    { value: '6months', label: '6 Months' },
    { value: '1year', label: '1 Year' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg shadow-elevation-2 p-3">
          <p className="text-sm font-medium text-popover-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry?.color }}
              ></div>
              <span className="text-muted-foreground">{entry?.dataKey}:</span>
              <span className="font-medium text-popover-foreground">
                {entry?.dataKey === 'revenue' ? `$${entry?.value?.toLocaleString()}` : entry?.value}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    switch (chartType) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={enrollmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="month" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="students" 
                stroke="var(--color-primary)" 
                strokeWidth={2}
                dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="teachers" 
                stroke="var(--color-secondary)" 
                strokeWidth={2}
                dot={{ fill: 'var(--color-secondary)', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={gradeDistribution}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="students"
                label={({ grade, students, percent }) => `${grade}: ${students} (${(percent * 100)?.toFixed(1)}%)`}
              >
                {gradeDistribution?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry?.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        );

      default:
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={enrollmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="month" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="students" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="teachers" fill="var(--color-secondary)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-elevation-1 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-card-foreground">Enrollment Analytics</h2>
          <p className="text-sm text-muted-foreground">
            Student and staff growth trends
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={() => console.log('Export data')}
            iconName="Download"
            iconPosition="left"
            className="text-sm"
          >
            Export
          </Button>
        </div>
      </div>
      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        {/* Chart Type Selector */}
        <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
          {chartTypes?.map((type) => (
            <button
              key={type?.value}
              onClick={() => setChartType(type?.value)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                chartType === type?.value
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={type?.icon} size={16} />
              <span className="hidden sm:inline">{type?.label}</span>
            </button>
          ))}
        </div>

        {/* Time Range Selector */}
        <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
          {timeRanges?.map((range) => (
            <button
              key={range?.value}
              onClick={() => setTimeRange(range?.value)}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                timeRange === range?.value
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {range?.label}
            </button>
          ))}
        </div>
      </div>
      {/* Chart */}
      <div className="mb-6" aria-label="Enrollment Analytics Chart">
        {renderChart()}
      </div>
      {/* Legend and Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Legend */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-card-foreground">Legend</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span className="text-sm text-muted-foreground">Students</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-secondary rounded-full"></div>
              <span className="text-sm text-muted-foreground">Teachers</span>
            </div>
            {chartType === 'bar' && (
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-accent rounded-full"></div>
                <span className="text-sm text-muted-foreground">Revenue</span>
              </div>
            )}
          </div>
        </div>

        {/* Key Insights */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-card-foreground">Key Insights</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Icon name="TrendingUp" size={14} className="text-success" />
              <span>5.7% growth in enrollment this semester</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={14} className="text-primary" />
              <span>Student-teacher ratio: 14:1</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Target" size={14} className="text-warning" />
              <span>Capacity utilization: 83%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentChart;