import React from 'react';
import './App.css';
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm"
import Profile from "./components/Profile";
import Home from "./components/Home";


const App: React.FC = () =>{

    const [isLoggedIn, setIsLoggedIn] = React.useState(() => {
        return localStorage.getItem('isLoggedIn') === 'true';
    });
    const [status, setStatus] = React.useState('home');
    const [userData, setUserData] = React.useState( {
        email: '',
        username: '',
        playername: ''
    })

    React.useEffect(() => {
        document.title = 'Home';
    }, [])

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

    const fetchUserdata = async () => {
        try {
            const response = await fetch('http://192.168.178.42:8080/api/users/current', {
                method: "GET",
                credentials: "include"
            })
            if (!response.ok) {
                throw new Error('Failed to fetch user data')
            }
                const jsonData = await  response.json()
                console.log('Profile found: ', jsonData);
                setUserData(jsonData);

        } catch(error) {
            console.log('Error fetching userdata: ', error);
        }
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


    const handleProfile = () => {
        fetchUserdata();
        setStatus('profile');
    }

    return (
      <div className="app">
          <span onClick={() => setStatus('home')} className="heading">Q's Gameshow</span>
          <div>
              {isLoggedIn ? (
                  <div>
                      <button className="btnlogout" onClick={handleLogout}>logout</button>
                      <button className="btnprofile" onClick={handleProfile}>profile</button>
                  </div>
              ) : (
                  <div>
                      <button className="btnlogin" onClick={() => setStatus('login')} type="submit">log in</button>
                      <button className="btnsignup" onClick={() => setStatus('signup')} type="submit">sign up</button>
                  </div>
              )}
          </div>
          <div>
            {isLoggingIn ? <LoginForm onLoginSuccess={handleLoginSuccess}/> : null}
            {isSigningUp ? <SignupForm onSignupSuccess={handleSignupSuccess}/>: null}
            {isProfile ? <Profile userData={userData}/> : null}{isHome ? <Home/> : null}
          </div>


      </div>
  );
}

export default App;
