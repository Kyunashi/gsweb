import React from 'react'

const LoginForm: React.FC = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    async function postData(url = "", data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            headers: {
                "Content-Type": "application/json",
                // "Accept-Encoding": "gzip, deflate, br",
                // "Access-Control-Allow-Origin": "*",
                // "Connection": "keep-alive"
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('username: ', username);
        console.log('password: ', password);
        console.log(JSON.stringify({
            "username": username,
            "password": password,
        }))
         postData('http://localhost:8080/api/auth/login', {
            "username": username,
            "password": password,
        }).then((data) => {
            console.log(data);
         })

        // if login success -> redirect to home oder so

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