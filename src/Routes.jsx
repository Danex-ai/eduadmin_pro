import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import AdministratorDashboard from './pages/administrator-dashboard';
import LoginPage from './pages/login';
import ParentMonitoringDashboard from './pages/parent-monitoring-dashboard';
import StudentLearningInterface from './pages/student-learning-interface';
import TeacherPortal from './pages/teacher-portal';
import StudentRegistration from './pages/student-registration';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AdministratorDashboard />} />
        <Route path="/administrator-dashboard" element={<AdministratorDashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/parent-monitoring-dashboard" element={<ParentMonitoringDashboard />} />
        <Route path="/student-learning-interface" element={<StudentLearningInterface />} />
        <Route path="/teacher-portal" element={<TeacherPortal />} />
        <Route path="/student-registration" element={<StudentRegistration />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
