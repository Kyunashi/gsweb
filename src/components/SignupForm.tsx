import React from 'react'


interface SignupFormProps {
    onSignupSuccess: () => void;
}


const SignupForm: React.FC<SignupFormProps> = ({onSignupSuccess}) => {

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [repeatpwd, setRepeatpwd] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [usernameTaken, setUsernameTaken] = React.useState(false);
    const [pwdsMatching, setPwdsMatching] = React.useState(true);
    const [pwdTooShort, setPwdTooShort] = React.useState(false);
    // TODO EMAIL VALIDATION (has @, ends on known ending) patter?
    // TODO USE HOOKS/STATE INSTEAD OF ACCEPTED() METHODS?

    const passwordsAccepted = () => {
        setPwdsMatching(password === repeatpwd);
        if (password.length < 5) {
            setPwdTooShort(true);
            console.log("Password too short")
            return false;
        }
        if(!pwdsMatching) {
            console.log("PASSWORDS NOT MATCHING!")
            return false;
        }
        return true;
    }

    const emailAccepted = () => {
        if (email.length < 5) {
            console.log("email cant be empty (too short)")
            return false;
        }
        return true;
    }

    const usernameAccepted = () => {
        if (username.length < 3) {
            console.log("username has to be 3 characters or longer")
            return false;
        }

        if (!username.match(/^[0-9A-Za-z]+$/)) {
            console.log("Not ALphanumeric")
            return false;
        };
        return true;
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if(!passwordsAccepted() || !emailAccepted() || !usernameAccepted()) {
            return;
        }
        fetch('http://192.168.178.42:8080/api/auth/signup', {
            method: 'POST',
            // credentials: "include",
            referrerPolicy:"origin",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                username: username,
                password: password
            }),
        })
            .then(response => {
                if (response.ok) {
                    onSignupSuccess();
                    setUsernameTaken(false);
                    setPwdsMatching(true);
                    setEmail('');
                    setUsername('');
                    setPassword('');
                    setRepeatpwd('');
                    console.log("Signup Successful")
                } else if (response.status === 409){
                    setUsernameTaken(true);
                    console.error("USERNAME TAKEN")
                } else {
                    console.error('Signup failed');
                }

            })
            .catch(error => {
                console.error('Error:', error);
            });

    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input type="text" maxLength={12} value={username} onChange={(event) => setUsername(event.target.value)}/>
                {usernameTaken ? (<label className={"lblnametaken"}>USERNAME TAKEN</label>):null}
            </label>
            <label>
                Email:
                <input type="text" value={email} onChange={(event) => setEmail(event.target.value)}/>
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={(event) => setPassword(event.target.value)}/>
            </label>
            <label>
                Confirm:
                <input type="password" value={repeatpwd} onChange={(event) => setRepeatpwd(event.target.value)}/>
            </label>
            <button type="submit" className={"btnsignup"}>Register</button>
            {!pwdsMatching ? (<label className={"lblpwdmissmatch"}>passwords dont match! </label>) : null}
            {pwdTooShort ? (<label className={"lblpwdtooshort"}>password is too short </label>) : null}
        </form>);
}


export default SignupForm;