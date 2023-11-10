import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const Profile = () => {
  const { t } = useTranslation();
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
      {t('logout')}
    </Button>
  );
};

export default Profile;
