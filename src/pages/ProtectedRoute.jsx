import { useEffect } from "react";
import { useAuth } from "../contexts/FakeAuthContext";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function ProtectedRoute({ children }) {
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isAuth) navigate("/");
    },
    [isAuth, navigate]
  );
  return isAuth ? children : null;
}
