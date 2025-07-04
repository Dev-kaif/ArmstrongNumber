/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MagicCard } from "@/components/MagicUi/MagicCard";
import { toast } from "sonner";
import api from "@/lib/axiosInstance";

interface ArmStrongCheckerProps {
  onSuccess?: () => void;
}

function ArmStrongChecker({ onSuccess }: ArmStrongCheckerProps) {
  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!number.trim()) {
      toast.error("Please enter a number.");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/armStrong/verify", {
        number: Number(number),
      });

      const data = response.data;

      if (data.isArmstrong) {
        toast.success(`${number} is an Armstrong number and has been saved!`);
        onSuccess?.();
      } else {
        toast.info(`${number} is not an Armstrong number.`);
      }

      setNumber("");
    } catch (error: any) {
      console.error(error);
      toast.error(
        error?.response?.data?.error ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-0 max-w-md w-full shadow-none border-none">
      <MagicCard gradientColor="#D9D9D955" className="px-3 py-5">
        <CardHeader>
          <CardTitle>Armstrong Checker</CardTitle>
          <CardDescription>
            Enter a number to check if it is an Armstrong number.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="grid gap-2 mt-10">
              <Label htmlFor="number">Your Number</Label>
              <Input
                id="number"
                type="number"
                placeholder="Enter a number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                disabled={loading}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full mt-4" disabled={loading}>
              {loading ? "Checking..." : "Check"}
            </Button>
          </CardFooter>
        </form>
      </MagicCard>
    </Card>
  );
}

export default ArmStrongChecker;
