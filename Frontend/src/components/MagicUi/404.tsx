import { useNavigate } from "react-router-dom";
import TopButton from "./TopButton";

function NotFound404() {
  const navigate = useNavigate();

  return (
    <div className="text-7xl flex justify-center items-center h-screen">
      <TopButton text="Go to Home" handleFunction={() => navigate("/")} />
      404 Not Found
    </div>
  );
}

export default NotFound404;
