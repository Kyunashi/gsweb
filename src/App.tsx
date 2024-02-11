import React from 'react';
import './App.css';
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm"

const App: React.FC = () =>{

    const [isLoggedIn, setIsLoggedIn] = React.useState(() => {
        return localStorage.getItem('isLoggedIn') === 'true';
    });
    const [isLoggingIn, setIsLoggingIn] = React.useState(false);
    const [isSigningUp, setIsSigningUp] = React.useState(false);

    const checkAuthentication = () => {
        const isAuthenticated = localStorage.getItem('isLoggedIn');
        setIsLoggedIn(!!isAuthenticated);
        setIsLoggingIn(false);
        setIsSigningUp(false);
        // if(isAuthenticated) {}
    };

    React.useEffect(() => {
        checkAuthentication()
    }, [])


    const handleLogout = () => {
        fetch('http://192.168.178.42:8080/api/auth/logout', {
            method: 'Post',
            credentials: "include",
            referrerPolicy:"",
        })
            .then(response => {
                localStorage.removeItem('isLoggedIn')
                if(response.ok) {
                     setIsLoggedIn(false);
                     setIsSigningUp(false);
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

    const handleLogin = () => {
        setIsLoggingIn(true);
        setIsSigningUp(false);
    }


    const handleSignup = () => {
        setIsLoggingIn(false);
        setIsSigningUp(true);
    }

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
        setIsLoggingIn(false);
        setIsSigningUp(false);
        localStorage.setItem('isLoggedIn', 'true')
        console.log('Login successful')
    }

    const handleHome = () => {
        setIsLoggingIn(false);
        setIsSigningUp(false);
    }

    const handleSignupSuccess = () => {
        setIsSigningUp(false);
        setIsLoggingIn(true);
    };


    return (
      <div className="app">
          <span onClick={handleHome} className="heading">Q's Gameshow</span>
          {isLoggedIn ? (
              <div>
                  <button className="btnlogout" onClick={handleLogout}>logout</button>
              </div>
          ) : (
             <div>
                 {!isLoggingIn ? <button className="btnlogin" onClick={handleLogin} type="submit">log in</button> : null}
                 {!isSigningUp ? <button className="btnsignup" onClick={handleSignup} type="submit">sign up</button> : null}
             </div>
        )}

        {isLoggingIn  ? <LoginForm onLoginSuccess={handleLoginSuccess}/> : null}
        {isSigningUp ? <SignupForm onSignupSuccess={handleSignupSuccess}/>: null}
      </div>
  );
}

export default App;
