
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import MeteorBackground from "./components/MeteorBackground";
import NewYearMusic from "./components/NewYearMusic";
import Index from "./pages/Index";
import Forum from "./pages/Forum";
import Shop from "./pages/Shop";
import Jobs from "./pages/Jobs";
import Admin from "./pages/Admin";
import AdminProfile from "./pages/AdminProfile";
import Rules from "./pages/Rules";
import GeneralRules from "./pages/rules/GeneralRules";
import RpRules from "./pages/rules/RpRules";
import CommunicationRules from "./pages/rules/CommunicationRules";
import GameplayRules from "./pages/rules/GameplayRules";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";
import Achievements from "./pages/Achievements";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
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
          <Route path="/forum" element={<Forum />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/:username" element={<AdminProfile />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/rules/general" element={<GeneralRules />} />
          <Route path="/rules/rp" element={<RpRules />} />
          <Route path="/rules/communication" element={<CommunicationRules />} />
          <Route path="/rules/gameplay" element={<GameplayRules />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/settings" element={<Settings />} />

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