import React from 'react'

const SignupForm: React.FC = () => {

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [repeatpwd, setRepeatpwd] = React.useState('');
    const [email, setEmail] = React.useState('');
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('username: ', username);
        console.log('password: ', password);
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
            <label>
                Repeat Password:
                <input type="password" value={repeatpwd} onChange={(event) => setRepeatpwd(event.target.value)}/>
            </label>
            <label>
                Email:
                <input type="text" value={email} onChange={(event) => setEmail(event.target.value)}/>
            </label>
            <button type="submit">Register</button>
        </form>);
}


export default SignupForm;