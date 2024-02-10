import React from 'react'

interface LoginFormProps {
    onLoginSuccess: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({onLoginSuccess}) => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        console.log('username: ', username);
        console.log('password: ', password);


        fetch('http://192.168.178.42:8080/api/auth/login', {
            method: 'POST',
            credentials: "include",
            referrerPolicy:"origin",
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
                    // setIsLoggedIn(true);

                    onLoginSuccess();

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


    return (
        <div>
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
        </div>
    );
};

export default LoginForm