import { Routes, Route } from "react-router-dom";
import { Login } from "./components/Auth/Login";
import { Signup } from "./components/Auth/Signup";
import { DotPattern } from "./components/MagicUi/Backgroud";
import { Toaster } from "./components/ui/sonner";
import { cn } from "./lib/utils";

export function App() {
  return (
    <div className="w-full overflow-hidden min-h-screen">
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
        )}
      />

      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      <Toaster />
    </div>
  );
}
