import { createContext, useContext, useState, type ReactNode } from "react";

export interface AuthUser {
  fullName: string;
  username: string;
  profilePicture: string;
  role: string;
}
interface AuthContextType {
  authUser: AuthUser | null;
  setAuthUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
}
export const AuthContext = createContext<AuthContextType>({
  authUser: null,
  setAuthUser: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState<AuthUser | null>(
    JSON.parse(localStorage.getItem("user") || null)
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
