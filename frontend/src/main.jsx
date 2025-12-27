import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import App from './App.jsx';
import './index.css';

// Import all our page components
import AdminRoute from './components/AdminRoute.jsx';
import AdminLayout from './components/layout/AdminLayout.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import AboutPage from './pages/AboutPage.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import BlogManagement from './pages/admin/BlogManagement.jsx';
import GalleryManagement from './pages/admin/GalleryManagement.jsx';
import InquiryManagement from './pages/admin/InquiryManagement.jsx';
import ProjectManagement from './pages/admin/ProjectManagement.jsx';
import BlogPage from './pages/BlogPage.jsx';
import GalleryPage from './pages/GalleryPage.jsx';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx';
import ResetPasswordPage from './pages/ResetPasswordPage.jsx';
import SingleBlogPage from './pages/SingleBlogPage.jsx';
import SingleProjectPage from './pages/SingleProjectPage.jsx';
import EditBlogPage from './pages/admin/EditBlogPage.jsx';
import EditProjectPage from './pages/admin/EditProjectPage.jsx';
import TestimonialManagement from './pages/admin/TestimonialManagement.jsx';
import SiteSettingsManagement from './pages/admin/SiteSettingsManagement.jsx';
import ServiceManagement from './pages/admin/ServiceManagement.jsx';
import AboutManagement from './pages/admin/AboutManagement.jsx';
import ContactSettingsManagement from './pages/admin/ContactSettingsManagement.jsx';
import TransformationManager from './components/admin/TransformationManager.jsx'; // Import the component
import ServicesPage from './pages/ServicesPage.jsx';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage.jsx';
import TermsPage from './pages/TermsPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';

import PrivateRoute from './components/PrivateRoute.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Public Routes with App Layout (Header/Footer) */}
      <Route path="/" element={<App />}>
        <Route index={true} path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/blog/:id" element={<SingleBlogPage />} />
        <Route path="/projects/:id" element={<SingleProjectPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-of-service" element={<TermsPage />} />
        <Route path="/profile" element={<AdminLayout><ProfilePage /></AdminLayout>} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:resetToken" element={<ResetPasswordPage />} />
      </Route>



      {/* Protected Routes (Authenticated Users) */}
      <Route element={<PrivateRoute />}>
        {/* Shared Profile Page (Admins & Users) -- MOVED ABOVE due to styling issues or kept here if needed separately, but let's keep it consistent */}
      </Route>

      {/* Admin Routes with AdminLayout (Sidebar) */}
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="blog" element={<BlogManagement />} />
          <Route path="projects" element={<ProjectManagement />} />
          <Route path="inquiries" element={<InquiryManagement />} />
          <Route path="gallery" element={<GalleryManagement />} />
          <Route path="blog/:id/edit" element={<EditBlogPage />} />
          <Route path="projects/:id/edit" element={<EditProjectPage />} />
          <Route path="testimonials" element={<TestimonialManagement />} />
          <Route path="site-settings" element={<SiteSettingsManagement />} />
          <Route path="services" element={<ServiceManagement />} />
          <Route path="about" element={<AboutManagement />} />
          <Route path="contact-settings" element={<ContactSettingsManagement />} />
          <Route path="transformations" element={<TransformationManager />} />
        </Route>
      </Route>
    </>
  )
);

// Tell React to render our app with the defined routes
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);