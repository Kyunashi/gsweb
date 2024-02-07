import React from 'react'

const LoginForm: React.FC = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('username: ', username);
        console.log('password: ', password);
        // if login success -> redirect to home oder so
        fetch('localhost:8080/api/auth/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            })
        }).then(function (response) {
            console.log(response)
        })
    };
    return (
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
    );
};

export default LoginForm