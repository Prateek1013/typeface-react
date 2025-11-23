import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { Input } from '../components/Input';


export const Auth = ({ onLogin }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLogin = location.pathname === '/login';
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const body = isLogin 
        ? { email, password }
        : { username: email.split('@')[0], email, password };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error('Authentication failed');
      }

      let data;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        data = await response.json();
      } else {
        data = { message: await response.text() };
      }
      
      if (isLogin) {
        onLogin(data.token, email);
      } else {
        alert('Registration successful! Please sign in.');
        navigate('/login');
      }
    } catch (error) {
      console.error('Auth error:', error);
      alert('Authentication failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-red-600 text-white flex items-center justify-center text-2xl font-bold rounded-sm">
            I
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {isLogin ? 'Sign in to Typeface' : 'Create your account'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{' '}
            <Link
              to={isLogin ? '/signup' : '/login'}
              className="font-medium text-red-600 hover:text-red-500"
            >
              {isLogin ? 'start your 14-day free trial' : 'sign in to your existing account'}
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <Input
                label="Email address"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>
            <div className="mb-4">
              <Input
                label="Password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
          </div>

          <Button fullWidth type="submit" isLoading={isLoading}>
            {isLogin ? 'Sign in' : 'Sign up'}
          </Button>
        </form>
      </div>
    </div>
  );
};