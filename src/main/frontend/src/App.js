import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LoadingProvider } from './context/LoadingContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage'; // Import the component
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile'; // Add this import
import './App.css'; // Or your relevant CSS file

function App() {
  return (
    <LoadingProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
            <Route path="/" element={<LoginPage />} /> {/* Default route */}
          </Routes>
        </Router>
      </AuthProvider>
    </LoadingProvider>
  );
}

export default App;
