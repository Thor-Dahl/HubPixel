import React, { useState } from 'react';
import './index.css';

export default function Login({ onSubmit }) {
  const [mode, setMode] = useState('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [userhandle, setUserhandle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { mode, email, password, username, userhandle };
    if (onSubmit) onSubmit(payload);
    setEmail('');
    setPassword('');
    setUsername('');
    setUserhandle('');
  };

  return (
    <div className="login-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <h1 id="login-title">{mode === 'signup' ? 'Create account' : 'Log in'}</h1>
        <div>
          <button
            className={`button2 ${mode === 'signup' ? 'active' : ''}`}
            style={{ marginRight: 8 }}
            onClick={() => setMode('signup')}
            type="button"
          >Sign up</button>
          <button
            className={`button2 ${mode === 'login' ? 'active' : ''}`}
            onClick={() => setMode('login')}
            type="button"
          >Log in</button>
        </div>
      </div>

      <p id="login-subtitle">An account is needed to create a profile and interact with other users</p>

      <form className="credential-inputs" onSubmit={handleSubmit}>
        {mode === 'signup' && (
          <>
            <input
              className="login-form"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <input
              className="login-form"
              type="text"
              placeholder="User handle (e.g. @name)"
              value={userhandle}
              onChange={(e) => setUserhandle(e.target.value)}
            />
          </>
        )}

        <input
          className="login-form"
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="login-form"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="important-button" id="login-continue-button" type="submit">
          {mode === 'signup' ? 'Create account' : 'Continue'}
        </button>
      </form>
    </div>
  );
}
