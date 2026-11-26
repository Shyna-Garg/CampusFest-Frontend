import { createContext, useCallback, useEffect, useState } from "react";
import {
  loginUser,
  logoutUser,
  registerUser,
  getCurrentUser,
} from "../api/authApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(() => getCurrentUser()
    .then((response) => {
      setUser(response.data);
      return response.data;
    })
    .catch(() => {
      setUser(null);
      return null;
    })
    .finally(() => setLoading(false)), []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const login = async (data) => {
  await loginUser(data);

  const loggedInUser = await fetchUser();

  return loggedInUser;
};

  const register = async (data) => {
    const response = await registerUser(data);

    await fetchUser();

    return response;
  };

  const logout = async () => {
    await logoutUser();

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        fetchUser,
        setUser,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;