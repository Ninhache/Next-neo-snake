"use client";

import { useAuth } from "../contexts/authProvider";

const UsernameViewer: React.FC = () => {
  const { isAuthenticated, username } = useAuth();

  return <>{isAuthenticated() ? username : "Not logged"}</>;
};

export default UsernameViewer;
