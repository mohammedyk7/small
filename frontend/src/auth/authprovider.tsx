import { createContext, useContext, useEffect, useState } from "react";
import keycloak from "../keycloak";

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  token?: string;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [token, setToken] = useState<string>();

  useEffect(() => {
    if (initialized) return; // prevent double init

    setInitialized(true);

    keycloak
      .init({
        onLoad: "check-sso",
        pkceMethod: "S256",
        silentCheckSsoRedirectUri:
          window.location.origin + "/silent-check-sso.html",
      })
      .then((auth) => {
        setIsAuthenticated(auth);
        setToken(keycloak.token);

        // auto refresh token
        setInterval(() => {
          keycloak.updateToken(30).then((refreshed) => {
            if (refreshed) setToken(keycloak.token);
          });
        }, 10000);
      });
  }, [initialized]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        token,
        login: () => keycloak.login(),
        logout: () => keycloak.logout({ redirectUri: window.location.origin }),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
