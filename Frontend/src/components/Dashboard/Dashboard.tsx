import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ArmStrongCheker from "./ArmStrongCheker";
import History from "./History";
import TopButton from "../MagicUi/TopButton";

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
    <div className="min-h-screen w-full flex flex-col gap-10 justify-center items-center px-4 py-20">
      <TopButton text="Logout" handleFunction={handleLogout}/>
      <ArmStrongCheker onSuccess={handleSuccess} />
      <History refresh={refreshHistory} />
    </div>
  );
}

export default Dashboard;
