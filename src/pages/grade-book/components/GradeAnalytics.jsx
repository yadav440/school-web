import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';

const GradeAnalytics = ({ students, assignments, grades, selectedClass }) => {
  // Calculate grade distribution
  const calculateGradeDistribution = () => {
    const distribution = { 'A': 0, 'B': 0, 'C': 0, 'D': 0, 'F': 0 };
    
    students?.forEach(student => {
      const studentGrades = assignments?.map(assignment => grades?.[`${student?.id}-${assignment?.id}`])?.filter(grade => grade !== undefined && grade !== null);
      
      if (studentGrades?.length > 0) {
        const average = studentGrades?.reduce((sum, grade) => sum + grade, 0) / studentGrades?.length;
        
        if (average >= 90) distribution.A++;
        else if (average >= 80) distribution.B++;
        else if (average >= 70) distribution.C++;
        else if (average >= 60) distribution.D++;
        else distribution.F++;
      }
    });
    
    return Object.entries(distribution)?.map(([grade, count]) => ({
      grade,
      count,
      percentage: students?.length > 0 ? ((count / students?.length) * 100)?.toFixed(1) : 0
    }));
  };

  // Calculate assignment averages
  const calculateAssignmentAverages = () => {
    return assignments?.map(assignment => {
      const assignmentGrades = students?.map(student => grades?.[`${student?.id}-${assignment?.id}`])?.filter(grade => grade !== undefined && grade !== null);
      
      const average = assignmentGrades?.length > 0 
        ? assignmentGrades?.reduce((sum, grade) => sum + grade, 0) / assignmentGrades?.length
        : 0;
      
      return {
        name: assignment?.title?.length > 15 ? assignment?.title?.substring(0, 15) + '...' : assignment?.title,
        average: parseFloat(average?.toFixed(1)),
        maxPoints: assignment?.maxPoints,
        submissions: assignmentGrades?.length,
        totalStudents: students?.length
      };
    });
  };

  // Calculate class statistics
  const calculateClassStats = () => {
    const allGrades = [];
    students?.forEach(student => {
      const studentGrades = assignments?.map(assignment => grades?.[`${student?.id}-${assignment?.id}`])?.filter(grade => grade !== undefined && grade !== null);
      
      if (studentGrades?.length > 0) {
        const average = studentGrades?.reduce((sum, grade) => sum + grade, 0) / studentGrades?.length;
        allGrades?.push(average);
      }
    });

    if (allGrades?.length === 0) {
      return { average: 0, highest: 0, lowest: 0, median: 0 };
    }

    const sortedGrades = [...allGrades]?.sort((a, b) => a - b);
    const average = allGrades?.reduce((sum, grade) => sum + grade, 0) / allGrades?.length;
    const median = sortedGrades?.length % 2 === 0
      ? (sortedGrades?.[sortedGrades?.length / 2 - 1] + sortedGrades?.[sortedGrades?.length / 2]) / 2
      : sortedGrades?.[Math.floor(sortedGrades?.length / 2)];

    return {
      average: parseFloat(average?.toFixed(1)),
      highest: Math.max(...allGrades),
      lowest: Math.min(...allGrades),
      median: parseFloat(median?.toFixed(1))
    };
  };

  const gradeDistribution = calculateGradeDistribution();
  const assignmentAverages = calculateAssignmentAverages();
  const classStats = calculateClassStats();

  const COLORS = {
    A: '#059669', // success
    B: '#1e40af', // primary
    C: '#d97706', // warning
    D: '#ea580c', // accent
    F: '#dc2626'  // error
  };

  const StatCard = ({ title, value, subtitle, icon, color = 'text-primary' }) => (
    <div className="bg-surface rounded-lg border border-border p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className={`text-2xl font-bold ${color}`}>{value}</p>
          {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
        </div>
        <div className={`w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center`}>
          <Icon name={icon} size={20} className="text-primary" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Class Statistics */}
      <div className="bg-card rounded-lg border border-border shadow-elevation-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-card-foreground">Class Analytics</h2>
            <p className="text-sm text-muted-foreground">
              Performance overview for {selectedClass || 'All Classes'}
            </p>
          </div>
          <Icon name="TrendingUp" size={20} className="text-accent" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            title="Class Average"
            value={`${classStats?.average}%`}
            subtitle="Overall performance"
            icon="Target"
            color="text-primary"
          />
          <StatCard
            title="Highest Grade"
            value={`${classStats?.highest}%`}
            subtitle="Top performer"
            icon="TrendingUp"
            color="text-success"
          />
          <StatCard
            title="Lowest Grade"
            value={`${classStats?.lowest}%`}
            subtitle="Needs attention"
            icon="TrendingDown"
            color="text-error"
          />
          <StatCard
            title="Median Grade"
            value={`${classStats?.median}%`}
            subtitle="Middle performance"
            icon="BarChart3"
            color="text-secondary"
          />
        </div>

        {/* Grade Distribution Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-md font-medium text-card-foreground mb-4">Grade Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={gradeDistribution}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="grade" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#ffffff', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                    formatter={(value, name) => [
                      `${value} students (${gradeDistribution?.find(d => d?.count === value)?.percentage}%)`,
                      'Count'
                    ]}
                  />
                  <Bar dataKey="count" fill="#1e40af" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div>
            <h3 className="text-md font-medium text-card-foreground mb-4">Grade Distribution Pie</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={gradeDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="count"
                    label={({ grade, percentage }) => `${grade}: ${percentage}%`}
                  >
                    {gradeDistribution?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS?.[entry?.grade]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value, name, props) => [
                      `${value} students (${props?.payload?.percentage}%)`,
                      'Count'
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
      {/* Assignment Performance */}
      <div className="bg-card rounded-lg border border-border shadow-elevation-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-card-foreground">Assignment Performance</h2>
            <p className="text-sm text-muted-foreground">
              Average scores across all assignments
            </p>
          </div>
          <Icon name="BarChart3" size={20} className="text-accent" />
        </div>

        <div className="h-80 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={assignmentAverages}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="name" 
                stroke="#6b7280"
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis stroke="#6b7280" domain={[0, 100]} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
                formatter={(value, name, props) => [
                  `${value}% (${props?.payload?.submissions}/${props?.payload?.totalStudents} submitted)`,
                  'Average Score'
                ]}
              />
              <Bar dataKey="average" fill="#1e40af" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Assignment Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            title="Total Assignments"
            value={assignments?.length}
            subtitle="Created this term"
            icon="FileText"
          />
          <StatCard
            title="Avg Submission Rate"
            value={`${assignmentAverages?.length > 0 
              ? Math.round(assignmentAverages?.reduce((sum, a) => sum + (a?.submissions / a?.totalStudents * 100), 0) / assignmentAverages?.length)
              : 0}%`}
            subtitle="Students completing work"
            icon="CheckCircle"
            color="text-success"
          />
          <StatCard
            title="Avg Assignment Score"
            value={`${assignmentAverages?.length > 0 
              ? Math.round(assignmentAverages?.reduce((sum, a) => sum + a?.average, 0) / assignmentAverages?.length)
              : 0}%`}
            subtitle="Across all assignments"
            icon="Target"
            color="text-primary"
          />
        </div>
      </div>
    </div>
  );
};

export default GradeAnalytics;