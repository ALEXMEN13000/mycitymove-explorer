import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/contexts/AuthContext";

import Index from "@/pages/Index";
import Activities from "@/pages/Activities";
import { ActivityDetails } from "@/pages/ActivityDetails";
import MemberDashboard from "@/pages/MemberDashboard";
import ClubDashboard from "@/pages/ClubDashboard";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ClubLogin from "@/pages/ClubLogin";
import ClubRegister from "@/pages/ClubRegister";
import Clubs from "@/pages/Clubs";
import ResetPassword from "@/pages/ResetPassword";
import Favorites from "@/pages/Favorites";
import Calendar from "@/pages/Calendar";
import Explore from "@/pages/Explore";
import ClubMembers from "@/pages/club/ClubMembers";
import ClubActivities from "@/pages/club/ClubActivities";
import ClubStats from "@/pages/club/ClubStats";
import { PrivateRoute } from "@/components/auth/PrivateRoute";

const queryClient = new QueryClient();

// Définir le basename en fonction de l'environnement
const basename = import.meta.env.DEV ? '/' : '/mycitymove-explorer3';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Router basename={basename} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Routes>
              {/* Routes publiques */}
              <Route path="/" element={<Index />} />
              <Route path="/activities" element={<Activities />} />
              <Route path="/activity/:activityId" element={<ActivityDetails />} />
              <Route path="/clubs" element={<Clubs />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/club/login" element={<ClubLogin />} />
              <Route path="/club/register" element={<ClubRegister />} />

              {/* Routes protégées */}
              <Route path="/dashboard" element={
                <PrivateRoute>
                  <MemberDashboard />
                </PrivateRoute>
              } />
              <Route path="/club/dashboard" element={
                <PrivateRoute userType="club">
                  <ClubDashboard />
                </PrivateRoute>
              } />

              {/* Routes protégées pour les membres */}
              <Route path="/favorites" element={
                <PrivateRoute>
                  <Favorites />
                </PrivateRoute>
              } />
              <Route path="/calendar" element={
                <PrivateRoute>
                  <Calendar />
                </PrivateRoute>
              } />
              <Route path="/explore" element={
                <PrivateRoute>
                  <Explore />
                </PrivateRoute>
              } />

              {/* Routes protégées pour les clubs */}
              <Route path="/club">
                <Route path="members" element={
                  <PrivateRoute userType="club">
                    <ClubMembers />
                  </PrivateRoute>
                } />
                <Route path="activities" element={
                  <PrivateRoute userType="club">
                    <ClubActivities />
                  </PrivateRoute>
                } />
                <Route path="stats" element={
                  <PrivateRoute userType="club">
                    <ClubStats />
                  </PrivateRoute>
                } />
              </Route>

              {/* Redirections */}
              <Route path="/club-login" element={<Navigate to="/club/login" replace />} />
              <Route path="/club-register" element={<Navigate to="/club/register" replace />} />
            </Routes>
          </Router>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;