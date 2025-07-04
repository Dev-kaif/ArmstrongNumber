"use client";

import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="max-w-xl text-center space-y-6">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          Check{" "}
          <span className="bg-gradient-to-r from-primary/80 to-secondary/70 bg-clip-text text-transparent">
            Armstrong Numbers
          </span>{" "}
          Effortlessly
        </h1>
        <p className="text-muted-foreground text-lg max-w-md mx-auto">
          A minimal, intuitive platform to verify Armstrong numbers and learn number theory interactively.
        </p>
        <Button
          size="lg"
          className="mt-4"
          onClick={() => navigate("/login")}
        >
          Get Started
        </Button>
      </div>
    </div>
  );
}

export default LandingPage;
