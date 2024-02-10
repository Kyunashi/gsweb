import React from 'react';
import './App.css';
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm"

const App: React.FC = () =>{

    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [isLogginIn, setIsLogginIn] = React.useState(false);
    const [isSigningUp, setIsSigningUp] = React.useState(false);

    React.useEffect(() => {
        const isAuthenticated = localStorage.getItem('isLoggedIn');
        if(isAuthenticated) {
            setIsLoggedIn(true);
            setIsLogginIn(false);
            setIsSigningUp(false);
        }
    } )


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
        // TODO EITHER VIA STATE OR REDIRECT TO LOGIN ENDPOINT?

        if(!isLoggedIn) {
        setIsLogginIn(true)};
        setIsSigningUp(false);
    }


    const handleSignup = () => {
        setIsLogginIn(false);
        setIsSigningUp(true);


    }



  return (
      <div className="app">
          <span className="heading">Q's Gameshow</span>
          {isLoggedIn ? (
              <div>
                  <button className="btnlogout" onClick={handleLogout}>Logout</button>
                  <p> You are logged in!</p>
              </div>
          ) : (
             <div>
                 {!isLogginIn ? <button className="btnlogin" onClick={handleLogin} type="submit">Login</button> : null}
                 {!isSigningUp ? <button className="btnsignup" onClick={handleSignup} type="submit">Signup</button> : null}
             </div>
        )}


        {isLogginIn  ? <LoginForm/> : null}
        {isSigningUp ? <SignupForm/>: null}

      </div>
  );
}

export default App;
