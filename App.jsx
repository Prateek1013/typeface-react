import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Auth } from './pages/Auth';
import { Home } from './pages/Home';
import { FileViewer } from './pages/FileViewer';
import { Navbar } from './components/Navbar';

const ProtectedRoute = ({ children, user }) => {
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

const AppContent = () => {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      // For now, we'll just set a dummy user if token exists.
      // Ideally, we should decode the token or fetch user details.
      // Let's decode the token payload if possible, or just use the email from login.
      // Since we don't have a "me" endpoint yet, we'll rely on what we have.
      // Actually, let's just set the user as authenticated.
      // We can store user info in localStorage or another cookie for display.
      const userEmail = localStorage.getItem('userEmail');
      if (userEmail) {
        setUser({ email: userEmail, name: userEmail.split('@')[0] });
      }
    }
  }, []);

  const handleLogin = (token, email) => {
    Cookies.set('token', token, { expires: 7 }); // Expires in 7 days
    localStorage.setItem('userEmail', email);
    const newUser = { id: 'user', email, name: email.split('@')[0] };
    setUser(newUser);
    // Determine where to go
    const from = location.state?.from?.pathname || '/home';
    navigate(from, { replace: true });
  };

  const handleLogout = () => {
    Cookies.remove('token');
    localStorage.removeItem('userEmail');
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {user && <Navbar user={user} onLogout={handleLogout} />}
      <main>
        <Routes>
          <Route path="/login" element={user ? <Navigate to="/home" /> : <Auth onLogin={handleLogin} />} />
          <Route path="/signup" element={user ? <Navigate to="/home" /> : <Auth onLogin={handleLogin} />} />
          <Route 
            path="/home" 
            element={
              <ProtectedRoute user={user}>
                <Home user={user} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/view/:id" 
            element={
              <ProtectedRoute user={user}>
                <FileViewer />
              </ProtectedRoute>
            } 
          />
          <Route path="/" element={<Navigate to={user ? "/home" : "/login"} replace />} />
        </Routes>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;