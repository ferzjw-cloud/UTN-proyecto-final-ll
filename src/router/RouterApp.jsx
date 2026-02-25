import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../views/Home";
import { Login } from "../views/Login";
import { NotFound } from "../views/NotFound";
import { Registro } from "../pages/Registro";
import { Landing } from "../views/Landing"; 
import { RouteProtected } from "../components/RouteProtected";

export const RouterApp = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Landing inicial */}
        <Route path="/" element={<Landing />} />

        {/* Ruta pública */}
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />

        {/* Ruta protegida */}
        <Route
          path="/home"
          element={
            <RouteProtected>
              <Home />
            </RouteProtected>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};