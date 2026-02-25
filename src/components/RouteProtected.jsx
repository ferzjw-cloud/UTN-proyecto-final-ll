import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { Navigate } from "react-router-dom";

const RouteProtected = ({ children }) => {
  const { loggedUser, authReady } = useContext(ChatContext);

  if (!authReady) {
    return null; // Espera a que se restaure sesión
  }

  if (!loggedUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export { RouteProtected };