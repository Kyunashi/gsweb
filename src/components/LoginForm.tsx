import React from 'react'

const LoginForm: React.FC = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    // useEffect(() => {
    //     const isAuthenticated
    // })


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        console.log('username: ', username);
        console.log('password: ', password);



        fetch('http://localhost:8080/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username": username,
                "password": password,
            }),
        })
            .then(response => {
                if (response.ok) {
                    setIsLoggedIn(true);
                    console.log('Login successful')
                    console.log(JSON.stringify({
                        "username": username,
                        "password": password,
                    }))
                } else {
                    // Authentication failed
                    console.error('Login failed');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });


    };

    const handleLogout = () => {
        fetch('http://localhost:8080/api/auth/logout', {
            method: 'Post'
        })
            .then(response => {
                if(response.ok) {
                    setIsLoggedIn(false);
                    console.log('Logout successful')
                } else {
                    console.log('Logout failed');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }


    return (
        <div>
            {isLoggedIn?  (
                <div>
                    <p> You are logged in!</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>


            ) : (
                <form onSubmit={handleSubmit}>
                    <label>
                        Username:
                        <input type="text" value={username} onChange={(event) => setUsername(event.target.value)}/>
                    </label>
                    <label>
                        Password:
                        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)}/>
                    </label>
                    <button type="submit">Login</button>
                </form>
            )}
        </div>


    );
};

export default LoginForm