
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import MeteorBackground from "./components/MeteorBackground";
import NewYearMusic from "./components/NewYearMusic";
import Index from "./pages/Index";
import Forum from "./pages/Forum";
import Shop from "./pages/Shop";
import Jobs from "./pages/Jobs";
import Admin from "./pages/Admin";
import AdminProfile from "./pages/AdminProfile";
import Rules from "./pages/Rules";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";
import Achievements from "./pages/Achievements";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Screens from "./pages/webapp/Screens";
import AdminScreens from "./pages/webapp/AdminScreens";
import Game from "./pages/Game";
import MiniGames from "./pages/MiniGames";
import RestaurantGame from "./pages/RestaurantGame";
import PetGame from "./pages/PetGame";
import BubbleTeaGame from "./pages/BubbleTeaGame";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <MeteorBackground />
        <NewYearMusic />
        <Toaster />
        <Sonner />
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/forum" element={<ProtectedRoute><Forum /></ProtectedRoute>} />
          <Route path="/shop" element={<ProtectedRoute><Shop /></ProtectedRoute>} />
          <Route path="/jobs" element={<ProtectedRoute><Jobs /></ProtectedRoute>} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/:username" element={<AdminProfile />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/achievements" element={<ProtectedRoute><Achievements /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="/screens" element={<Screens />} />
          <Route path="/admin/screens" element={<AdminScreens />} />
          <Route path="/game" element={<Game />} />
          <Route path="/minigames" element={<MiniGames />} />
          <Route path="/minigame/restaurant" element={<RestaurantGame />} />
          <Route path="/minigame/pet" element={<PetGame />} />
          <Route path="/minigame/bubbletea" element={<BubbleTeaGame />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;