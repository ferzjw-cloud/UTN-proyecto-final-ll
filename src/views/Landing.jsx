import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <section className="landing-container">
      <div className="landing-overlay">
        <div className="landing-card">
          <h1>Bienvenido a UTNchat</h1>
          <p>Conectate GRATIS con tus contactos y chatea de forma simple y segura.</p>
          <div className="landing-buttons">
            <button onClick={() => navigate("/registro")}>Registrate</button>
            <button onClick={() => navigate("/login")}>Inicia Sesión</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Landing };