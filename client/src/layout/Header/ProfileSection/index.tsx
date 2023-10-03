import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  let navigate = useNavigate();
  const handleLogout = async () => {
    localStorage.setItem("localStorage", "");
    navigate("/login");
  };

  return (
    <Button
      style={{ color: "white", borderColor: "white" }}
      variant="outlined"
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
};

export default Profile;
