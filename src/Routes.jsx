import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import AdministratorDashboard from './pages/administrator-dashboard';
import Login from './pages/login';
import StudentManagement from './pages/student-management';
import GradeBook from './pages/grade-book';
import TeacherDashboard from './pages/teacher-dashboard';
import TeacherManagement from './pages/teacher-management';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AdministratorDashboard />} />
        <Route path="/administrator-dashboard" element={<AdministratorDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/student-management" element={<StudentManagement />} />
        <Route path="/grade-book" element={<GradeBook />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher-management" element={<TeacherManagement />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;