import axios from "../config";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear()
  };

  useEffect(() => {
    handleLogout();
    navigate("/login");
  }, []);
  return null;
}
