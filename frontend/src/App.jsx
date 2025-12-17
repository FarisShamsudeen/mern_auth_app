import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import AdminUsers from "./pages/admin/AdminUsers";


import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

export default function App() {
  return (
    <Routes>

      {/* Public */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Authenticated User Routes */}
      <Route element={<ProtectedRoute />}>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />

        <Route
          path="/profile"
          element={
            <Layout>
              <Profile />
            </Layout>
          }
        />
      </Route>

      {/* Admin Routes */}
      <Route element={<ProtectedRoute adminOnly />}>
        <Route path="/admin" element={<Layout><AdminUsers /></Layout>} />
      </Route>
    </Routes>
  );
}

