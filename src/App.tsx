import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import DashboardPage from './pages/app/DashboardPage';
import ExamsPage from './pages/app/ExamsPage';
import ExamRunnerPage from './pages/app/ExamRunnerPage';
import PathwayPage from './pages/app/PathwayPage';
import LessonPage from './pages/app/LessonPage';
import SimulatorPage from './pages/app/SimulatorPage';
import SimulatorRunnerPage from './pages/app/SimulatorRunnerPage';
import SubscriptionPage from './pages/app/SubscriptionPage';
import SettingsPage from './pages/app/SettingsPage';
import AppLayout from './components/layout/AppLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/app/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="exams" element={<ExamsPage />} />
        <Route path="exams/:examId" element={<ExamRunnerPage />} />
        <Route path="pathway" element={<PathwayPage />} />
        <Route path="pathway/:lessonId" element={<LessonPage />} />
        <Route path="simulator" element={<SimulatorPage />} />
        <Route path="simulator/run" element={<SimulatorRunnerPage />} />
        <Route path="subscription" element={<SubscriptionPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
