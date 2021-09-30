import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../../routes';

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = AsyncStorage.getItem('token');

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    }

    setLoading(false);
  }, []);
  
  async function handleLogin() {
    const { data: { token } } = await api.post('/login');

    AsyncStorage.setItem('token', JSON.stringify(token));
    api.defaults.headers.Authorization = `Bearer ${token}`;
    setAuthenticated(true);
  }

  function handleLogout() {
    setAuthenticated(false);
    AsyncStorageremoveItem('token');
    api.defaults.headers.Authorization = undefined;
  }
  
  return { authenticated, loading, handleLogin, handleLogout };
}