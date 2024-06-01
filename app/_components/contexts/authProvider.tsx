"use client";

import { Nullable } from "@/app/_@types/NullableType";
import {
  LocalStorageToken,
  signInRequest,
  signUpRequest,
  updateStoredTokensFromRefresh,
} from "@/app/_lib/services/auth";
import { jwtDecode } from "jwt-decode";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthState {
  accessToken: Nullable<string>;
  username: Nullable<string>;
  role: Nullable<string>;
}

interface AuthContextProps extends AuthState {
  login: (username: string, password: string) => Promise<void>;
  signup: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: () => boolean;
  isAdmin: () => boolean;
}

const AuthContext = createContext<AuthContextProps>({
  accessToken: null,
  username: null,
  role: null,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
  isAuthenticated: () => false,
  isAdmin: () => false,
});

interface ProviderProps {
  children: ReactNode;
}

const AuthContextProvider: React.FC<ProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    accessToken: null,
    username: null,
    role: null,
  });

  const [accessToken, setAccessToken] = useState<Nullable<string>>(null);
  const [refreshToken, setRefreshToken] = useState<Nullable<string>>(null);

  useEffect(() => {
    setAccessToken(
      localStorage.getItem(LocalStorageToken.accessToken) as string
    );
    setRefreshToken(
      localStorage.getItem(LocalStorageToken.refreshToken) as string
    );
  }, []);

  useEffect(() => {
    let user = null;
    try {
      user = jwtDecode(accessToken as string) as {
        username: string;
        role: string;
        accessToken: string;
        refreshToken: string;
      };
    } catch (_) {}

    if (accessToken && user) {
      setAuthState({
        accessToken: accessToken,
        username: user.username,
        role: user.role,
      });
    }
  }, []);

  const login = async (username: string, password: string) => {
    const signInInfo = await signInRequest(username, password);

    if (!signInInfo.success) {
      throw new Error(signInInfo.message);
    }

    const { accessToken } = signInInfo;

    const { role } = jwtDecode(accessToken) as { role: string };

    setAuthState({ accessToken, username, role });
  };

  const signup = async (username: string, password: string) => {
    const signupInfo = await signUpRequest(username, password);

    if (!signupInfo.success) {
      throw new Error(signupInfo.message);
    }

    const loginInfo = await signInRequest(username, password);

    if (!loginInfo.success) {
      throw new Error(loginInfo.message);
    }

    const { accessToken } = loginInfo;

    const { role } = jwtDecode(accessToken) as { role: string };

    setAuthState({ accessToken, username, role });
  };

  const isAdmin = (): boolean => {
    return authState.role?.toLocaleLowerCase() === "admin";
  };

  const isAuthenticated = (): boolean => {
    if (!accessToken || !refreshToken) {
      return false;
    }

    try {
      const decodedToken = jwtDecode(accessToken as string) as {
        username: string;
        accessToken: string;
        refreshToken: string;
      };

      return !!decodedToken.username;
    } catch (_) {
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem(LocalStorageToken.accessToken);
    localStorage.removeItem(LocalStorageToken.refreshToken);

    setAuthState({ accessToken: null, username: null, role: null });
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        signup,
        logout,
        isAuthenticated,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
};

export { AuthContextProvider, useAuth };
