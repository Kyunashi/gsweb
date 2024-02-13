import React from 'react';
import './App.css';
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm"
import Profile from "./components/Profile";

const App: React.FC = () =>{

    const [isLoggedIn, setIsLoggedIn] = React.useState(() => {
        return localStorage.getItem('isLoggedIn') === 'true';
    });
    const [status, setStatus] = React.useState('home');

    const isLoggingIn = status === 'login';
    const isSigningUp = status === 'signup';
    const isHome = status === 'home';
    const isProfile = status === 'profile'

    const checkAuthentication = () => {
        const isAuthenticated = localStorage.getItem('isLoggedIn');
        setIsLoggedIn(!!isAuthenticated);
    };

    React.useEffect(() => {
        checkAuthentication()
    }, [])


    const handleLogout = () => {
        fetch('http://192.168.178.42:8080/api/auth/logout', {
            method: 'Post',
            credentials: "include",
        })
            .then(response => {
                localStorage.removeItem('isLoggedIn')
                if(response.ok) {
                     setIsLoggedIn(false);
                     setStatus('home');
                     localStorage.removeItem('isLoggedIn');
                     console.log('Logout successful')
                } else {
                    console.log('Logout failed');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }


    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
        setStatus('home');
        localStorage.setItem('isLoggedIn', 'true')
        console.log('Login successful')
    }

    const handleSignupSuccess = () => {
        setStatus('home')
    };

    
    return (
      <div className="app">
          <span onClick={() => setStatus('home')} className="heading">Q's Gameshow</span>
          <div>
              {isLoggedIn ? (
                  <div>
                      <button className="btnlogout" onClick={handleLogout}>logout</button>
                      <button className="btnprofile" onClick={() => setStatus('profile')}>profile</button>
                  </div>
              ) : (
                  <div>
                      {!isLoggingIn ? <button className="btnlogin" onClick={() => setStatus('login')} type="submit">log in</button> : null}
                      {!isSigningUp ? <button className="btnsignup" onClick={() => setStatus('signup')} type="submit">sign up</button> : null}
                  </div>
              )}
          </div>
          <div>
            {isLoggingIn ? <LoginForm onLoginSuccess={handleLoginSuccess}/> : null}
            {isSigningUp ? <SignupForm onSignupSuccess={handleSignupSuccess}/>: null}
            {isProfile ? <Profile/> : null}
          </div>


      </div>
  );
}

export default App;
