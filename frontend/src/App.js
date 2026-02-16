import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { TransactionProvider } from "./context/TransactionContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Explorer from "./pages/Explorer";
import "./App.css";
import Layout from "./components/Layout";


function App() {
  return (
    <AuthProvider>
      <TransactionProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/explorer"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Explorer />
                  </Layout>
                </ProtectedRoute>
              }
            />

          </Routes>
        </Router>
      </TransactionProvider>
    </AuthProvider>
  );
}

export default App;
