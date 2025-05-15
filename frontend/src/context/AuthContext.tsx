import { createContext, useContext, useState } from "react";

interface AuthContextType {
  authUser: string | null;
  setAuthUser: React.Dispatch<React.SetStateAction<string | null>>;
}
export const AuthContext = createContext<AuthContextType>({
  authUser: null,
  setAuthUser: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState<string | null>(
    JSON.parse(localStorage.getItem("user")) || null
  );
  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
