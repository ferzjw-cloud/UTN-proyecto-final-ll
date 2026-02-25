import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <section className="landing-container">
      <div className="landing-card">
        <h1>Bienvenido a Chat UTN</h1>
        <p>Una aplicación simple para conectarte y chatear con tus contactos favoritos.</p>
        <div className="landing-buttons">
          <button onClick={() => navigate("/registro")}>Registrate</button>
          <button onClick={() => navigate("/login")}>Inicia Sesión</button>
        </div>
      </div>
    </section>
  );
};

export { Landing };