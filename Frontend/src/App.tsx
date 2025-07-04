import { Routes, Route } from "react-router-dom";
import { Login } from "./components/Auth/Login";
import { Signup } from "./components/Auth/Signup";
import { DotPattern } from "./components/MagicUi/Backgroud";
import { Toaster } from "./components/ui/sonner";
import { cn } from "./lib/utils";
import Dashboard from "./components/Dashboard/Dashboard";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import LandingPage from "./components/Dashboard/Landing";
import NotFound404 from "./components/MagicUi/404";

export function App() {
  return (
    <div className="w-full overflow-hidden min-h-screen">
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]"
        )}
      />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound404 />} />
      </Routes>

      <Toaster />
    </div>
  );
}
