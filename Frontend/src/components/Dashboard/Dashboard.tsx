import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ArmStrongCheker from "./ArmStrongCheker";
import History from "./History";

function Dashboard() {
  const [refreshHistory, setRefreshHistory] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => {
    setRefreshHistory((prev) => !prev); 
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen w-full flex flex-col gap-10 justify-center items-center px-4">
      <div className="w-full max-w-7xl flex justify-end">
        <Button
          variant="outline"
          onClick={handleLogout}
          className="w-fit"
        >
          Logout
        </Button>
      </div>

      <ArmStrongCheker onSuccess={handleSuccess} />
      <History refresh={refreshHistory} />
    </div>
  );
}

export default Dashboard;
