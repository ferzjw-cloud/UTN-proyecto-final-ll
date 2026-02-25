import { useContext, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { useNavigate } from "react-router-dom";

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