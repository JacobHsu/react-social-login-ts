import React, { useCallback, useState } from 'react';
import './App.css';
import { LoginSocialGoogle, IResolveParams } from 'reactjs-social-login';
import { GoogleLoginButton } from 'react-social-login-buttons';
import { User } from './User'

function App() {
  const [provider, setProvider] = useState('');
  const [profile, setProfile] = useState<any>();

  const onLoginStart = useCallback(() => {
    alert('login start');
  }, []);

  const onLogoutSuccess = useCallback(() => {
    setProfile(null)
    setProvider('')
    alert('logout success')
  }, [])

  const onLogout = useCallback(() => {
    onLogoutSuccess()
  }, [onLogoutSuccess])

  return (
    <div className="App">
      {provider && profile && (
        <User provider={provider} profile={profile} onLogout={onLogout} />
      )}
      <header className="App-header">
        <LoginSocialGoogle
          client_id={process.env.REACT_APP_GG_APP_ID || ''}
          onLoginStart={onLoginStart}
          onResolve={({ provider, data }: IResolveParams) => {
            setProvider(provider);
            setProfile(data);
          }}
          onReject={(err) => {
            console.log(err);
          }}
        >
          <GoogleLoginButton />
        </LoginSocialGoogle>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
