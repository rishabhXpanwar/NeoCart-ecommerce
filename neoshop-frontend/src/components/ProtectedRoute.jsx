import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  //  jab tak auth check ho raha hai
  if (loading) {
    return <h2 style={{ padding: "40px" }}>Loading...</h2>;
  }

  //  auth check complete ho gaya, user nahi mila
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ✅ user mila
  return children;
}

export default ProtectedRoute;
