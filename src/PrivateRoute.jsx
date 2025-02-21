/* eslint-disable react/prop-types */

import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";  // Assuming you have an AuthContext for user state
import { Navigate } from "react-router";

const PrivateRoute = ({ element }) => {
  const { user } = useContext(AuthContext);

  // If the user is authenticated, render the element (protected component)
  if (user) {
    return element;
  }

  // Otherwise, redirect to the login page
  return <Navigate to="/" />;
};

export default PrivateRoute;
