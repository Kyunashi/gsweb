import React from 'react'
import './LoginForm.css'

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
            redirect: "manual",
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
                    onLoginSuccess();
                    console.log(JSON.stringify({
                        "username": username.toLowerCase(),
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
        <div >
                <form  className={'loginform'} onSubmit={handleSubmit}>
                    <label className={'usernamelbl'}>
                        Username
                    </label>
                    <input className={'usernameinput'} type="text" value={username} onChange={(event) => setUsername(event.target.value)}/>
                    <label className={'passwordlbl'}>Password
                    </label>
                        <input className={'passwordinput'} type="password" value={password} onChange={(event) => setPassword(event.target.value)}/>
                    <button className={'loginbtn'} type="submit">Login</button>
                </form>
        </div>
    );
};

export default LoginForm