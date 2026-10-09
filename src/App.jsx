import { BrowserRouter, Routes, Route } from "react-router-dom";

import PublicLayout from "./components/PublicLayout";

import About from "./pages/About";
import Team from "./pages/Team";
import ResearchAreas from "./pages/ResearchAreas";
import Publications from "./pages/Publications";
import Projects from "./pages/Projects";
import AdminLogin from "./pages/AdminLogin";
import Home from "./pages/Home";

import ProtectedRoute from "./components/ProtectedRoute";

import AdminDashboard from "./admin/AdminDashboard";
import SiteInfoManager from "./admin/SiteInfoManager";
import TeamManager from "./admin/TeamManager";
import PublicationManager from "./admin/PublicationManager";
import ResearchAreaManager from "./admin/ResearchAreaManager";
import ProjectManager from "./admin/ProjectManager";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* =========================
            PUBLIC WEBSITE
        ========================= */}

        <Route
          path="/"
          element={
            <PublicLayout>
              <Home />
            </PublicLayout>
          }
        />

        <Route
          path="/about"
          element={
            <PublicLayout>
              <About />
            </PublicLayout>
          }
        />

        <Route
          path="/team"
          element={
            <PublicLayout>
              <Team />
            </PublicLayout>
          }
        />

        <Route
          path="/research-areas"
          element={
            <PublicLayout>
              <ResearchAreas />
            </PublicLayout>
          }
        />

        <Route
          path="/publications"
          element={
            <PublicLayout>
              <Publications />
            </PublicLayout>
          }
        />

        <Route
          path="/projects"
          element={
            <PublicLayout>
              <Projects />
            </PublicLayout>
          }
        />

        {/* =========================
            ADMIN LOGIN
        ========================= */}

        <Route path="/admin/login" element={<AdminLogin />} />

        {/* =========================
            ADMIN DASHBOARD
        ========================= */}

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* =========================
            ADMIN SITE INFO
        ========================= */}

        <Route
          path="/admin/site-info"
          element={
            <ProtectedRoute>
              <SiteInfoManager />
            </ProtectedRoute>
          }
        />

        {/* =========================
            ADMIN TEAM
        ========================= */}

        <Route
          path="/admin/team"
          element={
            <ProtectedRoute>
              <TeamManager />
            </ProtectedRoute>
          }
        />

        {/* =========================
            ADMIN PUBLICATIONS
        ========================= */}

        <Route
          path="/admin/publications"
          element={
            <ProtectedRoute>
              <PublicationManager />
            </ProtectedRoute>
          }
        />

        {/* =========================
            ADMIN RESEARCH AREAS
        ========================= */}

        <Route
          path="/admin/research-areas"
          element={
            <ProtectedRoute>
              <ResearchAreaManager />
            </ProtectedRoute>
          }
        />

        {/* =========================
            ADMIN PROJECTS
        ========================= */}

        <Route
          path="/admin/projects"
          element={
            <ProtectedRoute>
              <ProjectManager />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
