import { useContext, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { login } = useContext(ChatContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    const success = login({ email, password });

    if (!success) {
      setError("Usuario o contraseña incorrecta");
      return;
    }

    navigate("/home");
  };

  return (
    <section>

      {/* BOTÓN HOME */}
      <Link to="/" className="home-top-button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M8 .5l6 6V15a1 1 0 0 1-1 1h-4v-4H7v4H3a1 1 0 0 1-1-1V6.5l6-6z"/>
        </svg>
        Inicio
      </Link>

      <h2 className="title-login">Bienvenido, inicia sesión</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Ingresar</button>
        {error && <p className="error-form">{error}</p>}
      </form>
    </section>
  );
};

export { Login };