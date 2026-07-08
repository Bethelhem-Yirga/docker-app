import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('Click a button');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [backendStatus, setBackendStatus] = useState('Checking...');

  // Use environment variable or default
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    checkHealth();
  }, []);

  const checkHealth = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/health`);
      if (response.ok) {
        setBackendStatus('✅ Online');
      } else {
        setBackendStatus('⚠️ Unhealthy');
      }
    } catch (error) {
      setBackendStatus('❌ Offline');
    }
  };

  const callHello = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/hello`);
      const data = await response.json();
      setMessage(`✅ Hello: ${data.message}`);
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const callUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/users`);
      const data = await response.json();
      setUsers(data.users);
      setMessage(`✅ Loaded ${data.users.length} users`);
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🚀 React + Flask on Docker</h1>
        
        <div className="status">
          Backend: <span className={backendStatus.includes('Online') ? 'online' : 'offline'}>
            {backendStatus}
          </span>
        </div>

        <div className="buttons">
          <button onClick={callHello} disabled={loading}>
            Call /api/hello
          </button>
          <button onClick={callUsers} disabled={loading}>
            Load Users
          </button>
          <button onClick={checkHealth} disabled={loading}>
            Check Health
          </button>
        </div>

        <div className="message-box">
          <p>{message}</p>
        </div>

        {users.length > 0 && (
          <div className="users-list">
            <h3>Users:</h3>
            <ul>
              {users.map(user => (
                <li key={user.id}>
                  {user.name} - {user.email}
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;