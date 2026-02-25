import { createContext, useContext, useEffect, useState } from "react";
import { users as mockUsers } from "../services/mockApi";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {

  // =========================
  // 🔹 ESTADO DEL CHAT (PERSISTENTE)
  // =========================

  const storedUsers = localStorage.getItem("chatUsers");
  const storedSelectedUserId = localStorage.getItem("selectedUserId");

  const [users, setUsers] = useState(
    storedUsers ? JSON.parse(storedUsers) : mockUsers
  );

  const [selectedUserId, setSelectedUserId] = useState(
    storedSelectedUserId ? Number(storedSelectedUserId) : null
  );

  useEffect(() => {
    localStorage.setItem("chatUsers", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (selectedUserId !== null) {
      localStorage.setItem("selectedUserId", selectedUserId);
    }
  }, [selectedUserId]);

  const handleSelectedUserId = (id) => {
    setSelectedUserId(id);
  };

  const selectedUser = users.find(user => user.id === selectedUserId);

  const handleMessages = (newMessage) => {
    const updatedUsers = users.map(user => {
      if (user.id === selectedUserId) {
        return {
          ...user,
          messages: [
            ...user.messages,
            {
              ...newMessage,
              id: user.messages.length + 1
            }
          ]
        };
      }
      return user;
    });

    setUsers(updatedUsers);
  };

  // =========================
  // 🔹 AUTENTICACIÓN (PERSISTENTE)
  // =========================

  const [loggedUser, setLoggedUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const activeUser = localStorage.getItem("activeUser");
    if (activeUser) {
      setLoggedUser(JSON.parse(activeUser));
    }
    setAuthReady(true);
  }, []);

  // Registro: agrega usuario a users
  const registerUser = (userData) => {
    const newUser = {
      id: users.length + 1,
      firstName: userData.nombre,
      lastName: "",
      email: userData.email,
      password: userData.password,
      address: { country: "" },
      image: `https://i.pravatar.cc/150?u=${userData.email}`,
      messages: []
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem("chatUsers", JSON.stringify(updatedUsers));
    localStorage.setItem("activeUser", JSON.stringify(newUser));
    setLoggedUser(newUser);
  };

  // Login: busca en users por email y password
  const login = ({ email, password }) => {
    const userFound = users.find(
      (u) => u.email === email && u.password === password
    );
    if (userFound) {
      setLoggedUser(userFound);
      localStorage.setItem("activeUser", JSON.stringify(userFound));
      return true;
    }
    return false;
  };

  const handleUser = (userData) => {
    // userData ya debe ser el objeto completo, lo usamos para login automático
    setLoggedUser(userData);
    localStorage.setItem("activeUser", JSON.stringify(userData));
  };

  const logout = () => {
    setLoggedUser(null);
    localStorage.removeItem("activeUser");
  };

  return (
    <ChatContext.Provider
      value={{
        // CHAT
        users,
        selectedUser,
        handleSelectedUserId,
        handleMessages,

        // AUTH
        loggedUser,
        authReady,
        registerUser,
        login,
        handleUser,
        logout,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);