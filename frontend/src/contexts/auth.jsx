import React, { createContext, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { api, createSession } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const recoveredUser = localStorage.getItem('user');

    if (recoveredUser) {
      setUser(JSON.parse(recoveredUser));
    }

    setLoading(false);
  }, []);

  const login = async (email, password) => {
    console.log('login', { email, password });

    const response = await createSession(email, password);

    console.log('response', response.data);

    const loggedUser = reponse.data.user;
    const token = response.data.token;

    localStorage.setItem('user', JSON.stringify(loggedUser));
    localStorage.setItem('token', token);

    api.defaults.headers.Authorization = `Bearer ${token}`;

    if (password === 'secret') {
      setUser({ id: '123', email });
      navigate('/');
    }
  };

  const logout = () => {
    console.log('logout');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    api.defaults.headers.Authorization = null;
    setUser(null);
    navigate('/Login');
  };

  return (
    <AuthContext.Provider value={{ authenticated: !!user, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
