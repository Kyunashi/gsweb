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
    const [validationErrors, setValidationErrors] = React.useState({
        passwordMissmatch: false,
        passwordTooShort: false,
        emailInvalid: false,
        usernameInvalid: false
    });
    // TODO EMAIL VALIDATION (has @, ends on known ending) patter?
    // TODO USE HOOKS/STATE INSTEAD OF ACCEPTED() METHODS?


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const passwordTooShort = password.length <= 5;
        const passwordMissmatch = !(password === repeatpwd);
        const usernameInvalid = !(username.length >= 3 && /^[0-9A-Za-z]+$/.test(username));
        const emailInvalid = email.length <=5;

        setValidationErrors({
            passwordTooShort,
            passwordMissmatch,
            usernameInvalid,
            emailInvalid
        });

        if(passwordTooShort || passwordMissmatch || usernameInvalid || emailInvalid) {
            return;
        }
        fetch('http://192.168.178.42:8080/api/auth/signup', {
            method: 'POST',
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
                <input type="text" maxLength={12} value={username}
                       onChange={(event) => setUsername(event.target.value)}/>
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
            <button type="submit" className={"btnregister"}>Register</button>
            {validationErrors.passwordTooShort ? (<label className={"lblpwdtooshort"}>password is too short </label>) : null}
            {validationErrors.passwordMissmatch ? (<label className={"lblpwdmissmatch"}>passwords dont match! </label>) : null}
            {validationErrors.usernameInvalid ? (<label className={"lblusernameinvalid"}>username has to be 3 or more ALPHANUMERIC characters </label>) : null}
            {validationErrors.emailInvalid ? (<label className={"lblemailinvalid"}>email has to be more than 5 characters</label>) : null}
            {usernameTaken ? (<label className={"lblusernametaken"}>username is taken </label>) : null}


        </form>);
}


export default SignupForm;