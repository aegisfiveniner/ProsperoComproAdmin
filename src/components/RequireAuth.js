import { Navigate } from "react-router-dom";

export default function RequireAuth({ children }) {
  let auth = localStorage.token;

  if (!auth) {
    return <Navigate to="/" replace />;
  }

  return children;
}
