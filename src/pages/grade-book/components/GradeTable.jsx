import React, { useState, useEffect, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const GradeTable = ({ 
  students, 
  assignments, 
  grades, 
  onGradeUpdate, 
  selectedClass,
  gradingScale 
}) => {
  const [editingCell, setEditingCell] = useState(null);
  const [tempGrade, setTempGrade] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const handleCellClick = (studentId, assignmentId, currentGrade) => {
    setEditingCell(`${studentId}-${assignmentId}`);
    setTempGrade(currentGrade || '');
  };

  const handleGradeSubmit = (studentId, assignmentId) => {
    const numericGrade = parseFloat(tempGrade);
    if (!isNaN(numericGrade) && numericGrade >= 0 && numericGrade <= 100) {
      onGradeUpdate(studentId, assignmentId, numericGrade);
    }
    setEditingCell(null);
    setTempGrade('');
  };

  const handleKeyPress = (e, studentId, assignmentId) => {
    if (e?.key === 'Enter') {
      handleGradeSubmit(studentId, assignmentId);
    } else if (e?.key === 'Escape') {
      setEditingCell(null);
      setTempGrade('');
    }
  };

  const getGradeColor = (grade, maxPoints = 100) => {
    const percentage = (grade / maxPoints) * 100;
    if (percentage >= 90) return 'text-success bg-success/10';
    if (percentage >= 80) return 'text-primary bg-primary/10';
    if (percentage >= 70) return 'text-warning bg-warning/10';
    return 'text-error bg-error/10';
  };

  const calculateStudentAverage = (studentId) => {
    const studentGrades = assignments?.map(assignment => grades?.[`${studentId}-${assignment?.id}`])?.filter(grade => grade !== undefined && grade !== null);
    
    if (studentGrades?.length === 0) return 0;
    return studentGrades?.reduce((sum, grade) => sum + grade, 0) / studentGrades?.length;
  };

  const getLetterGrade = (percentage) => {
    if (percentage >= 97) return 'A+';
    if (percentage >= 93) return 'A';
    if (percentage >= 90) return 'A-';
    if (percentage >= 87) return 'B+';
    if (percentage >= 83) return 'B';
    if (percentage >= 80) return 'B-';
    if (percentage >= 77) return 'C+';
    if (percentage >= 73) return 'C';
    if (percentage >= 70) return 'C-';
    if (percentage >= 67) return 'D+';
    if (percentage >= 65) return 'D';
    return 'F';
  };

  const sortedStudents = React.useMemo(() => {
    if (!sortConfig?.key) return students;

    return [...students]?.sort((a, b) => {
      let aValue, bValue;

      if (sortConfig?.key === 'name') {
        aValue = `${a?.firstName} ${a?.lastName}`;
        bValue = `${b?.firstName} ${b?.lastName}`;
      } else if (sortConfig?.key === 'average') {
        aValue = calculateStudentAverage(a?.id);
        bValue = calculateStudentAverage(b?.id);
      } else {
        aValue = a?.[sortConfig?.key];
        bValue = b?.[sortConfig?.key];
      }

      if (aValue < bValue) return sortConfig?.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig?.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [students, sortConfig, grades]);

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig?.key === key && prevConfig?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-elevation-1 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="sticky left-0 bg-muted/50 px-4 py-3 text-left">
                <Button
                  variant="ghost"
                  onClick={() => handleSort('name')}
                  className="p-0 h-auto font-semibold text-sm"
                >
                  Student Name
                  {sortConfig?.key === 'name' && (
                    <Icon 
                      name={sortConfig?.direction === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
                      size={16} 
                      className="ml-1" 
                    />
                  )}
                </Button>
              </th>
              {assignments?.map((assignment) => (
                <th key={assignment?.id} className="px-3 py-3 text-center min-w-[100px]">
                  <div className="space-y-1">
                    <div className="font-semibold text-sm text-card-foreground">
                      {assignment?.title}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {assignment?.dueDate}
                    </div>
                    <div className="text-xs text-primary font-medium">
                      {assignment?.maxPoints} pts
                    </div>
                  </div>
                </th>
              ))}
              <th className="px-4 py-3 text-center bg-primary/5">
                <Button
                  variant="ghost"
                  onClick={() => handleSort('average')}
                  className="p-0 h-auto font-semibold text-sm"
                >
                  Average
                  {sortConfig?.key === 'average' && (
                    <Icon 
                      name={sortConfig?.direction === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
                      size={16} 
                      className="ml-1" 
                    />
                  )}
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedStudents?.map((student, index) => {
              const average = calculateStudentAverage(student?.id);
              const letterGrade = getLetterGrade(average);
              
              return (
                <tr 
                  key={student?.id} 
                  className={`border-b border-border hover:bg-muted/30 transition-colors ${
                    index % 2 === 0 ? 'bg-background' : 'bg-muted/10'
                  }`}
                >
                  <td className="sticky left-0 bg-inherit px-4 py-3 border-r border-border">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium">
                        {student?.firstName?.[0]}{student?.lastName?.[0]}
                      </div>
                      <div>
                        <div className="font-medium text-card-foreground">
                          {student?.firstName} {student?.lastName}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          ID: {student?.studentId}
                        </div>
                      </div>
                    </div>
                  </td>
                  {assignments?.map((assignment) => {
                    const gradeKey = `${student?.id}-${assignment?.id}`;
                    const grade = grades?.[gradeKey];
                    const isEditing = editingCell === gradeKey;
                    const isLate = assignment?.isLate;
                    const isMissing = grade === undefined || grade === null;

                    return (
                      <td key={assignment?.id} className="px-3 py-3 text-center">
                        {isEditing ? (
                          <Input
                            type="number"
                            value={tempGrade}
                            onChange={(e) => setTempGrade(e?.target?.value)}
                            onKeyDown={(e) => handleKeyPress(e, student?.id, assignment?.id)}
                            onBlur={() => handleGradeSubmit(student?.id, assignment?.id)}
                            className="w-16 text-center"
                            min="0"
                            max={assignment?.maxPoints}
                            autoFocus
                          />
                        ) : (
                          <button
                            onClick={() => handleCellClick(student?.id, assignment?.id, grade)}
                            className={`w-16 h-8 rounded-md text-sm font-medium transition-colors hover:opacity-80 ${
                              isMissing 
                                ? 'bg-muted text-muted-foreground border-2 border-dashed border-muted-foreground/30' 
                                : getGradeColor(grade, assignment?.maxPoints)
                            } ${isLate ? 'border-l-4 border-l-warning' : ''}`}
                          >
                            {isMissing ? '--' : grade}
                          </button>
                        )}
                        {isLate && (
                          <div className="text-xs text-warning mt-1">Late</div>
                        )}
                      </td>
                    );
                  })}
                  <td className="px-4 py-3 text-center bg-primary/5">
                    <div className="space-y-1">
                      <div className={`text-lg font-bold ${getGradeColor(average)?.split(' ')?.[0]}`}>
                        {average?.toFixed(1)}%
                      </div>
                      <div className="text-sm font-medium text-card-foreground">
                        {letterGrade}
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Legend */}
      <div className="px-4 py-3 bg-muted/20 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-success/20 rounded"></div>
              <span>A (90-100%)</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-primary/20 rounded"></div>
              <span>B (80-89%)</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-warning/20 rounded"></div>
              <span>C (70-79%)</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-error/20 rounded"></div>
              <span>D/F (&lt;70%)</span>
            </div>
          </div>
          <div className="text-xs">
            Click any cell to edit grade • Press Enter to save • Press Escape to cancel
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradeTable;