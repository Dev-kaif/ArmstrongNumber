/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MagicCard } from "@/components/MagicUi/MagicCard";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      const data = response.data;

      toast.success("Login successful! Redirecting...");
      console.log("Token:", data.token);

      localStorage.setItem("token", data.token);

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (err: any) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center px-4">
      <Card className="p-0 max-w-sm w-full shadow-none border-none">
        <MagicCard gradientColor="#D9D9D955" className="p-0">
          <CardHeader className="border-b border-border p-4">
            <CardTitle>Welcome Back 👋</CardTitle>
            <CardDescription>
              Enter your credentials to access your Armstrong Dashboard
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="p-4 space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>
              <div className="grid gap-2 relative">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type={passwordVisible ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="absolute right-3 top-9 text-muted-foreground"
                  tabIndex={-1}
                >
                  {passwordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </CardContent>
            <CardFooter className="p-4 border-t border-border flex flex-col gap-2">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing In..." : "Sign In"}
              </Button>
              <div className="flex justify-center gap-1 text-sm">
                <span>Don't have an account?</span>
                <button
                  type="button"
                  className="text-blue-600 hover:underline cursor-pointer"
                  onClick={() => navigate("/signup")}
                  disabled={loading}
                >
                  Sign Up
                </button>
              </div>
            </CardFooter>
          </form>
        </MagicCard>
      </Card>
    </div>
  );
}
