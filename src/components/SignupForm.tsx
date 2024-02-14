import React, {useState} from 'react'
import './SignupForm.css'

interface SignupFormProps {
    onSignupSuccess: () => void;
}


const SignupForm: React.FC<SignupFormProps> = ({onSignupSuccess}) => {


    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        repeatPassword: '',
    });
    const [usernameTaken, setUsernameTaken] = useState(false);
    const [validationErrors, setValidationErrors] = useState({
        passwordMissmatch: false,
        passwordTooShort: false,
        emailInvalid: false,
        usernameInvalid: false
    });
    // TODO EMAIL VALIDATION (has @, ends on known ending) patter?

    React.useEffect(() => {
        document.title = 'Sign Up';
    }, [])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const passwordTooShort = formData.password.length <= 5;
        const passwordMissmatch = !(formData.password === formData.repeatPassword);
        const usernameInvalid = !(formData.username.length >= 3 && /^[0-9A-Za-z]+$/.test(formData.username));
        const emailInvalid = formData.email.length <=5;

        setValidationErrors({
            passwordTooShort,
            passwordMissmatch,
            emailInvalid,
            usernameInvalid
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
                email: formData.email,
                username: formData.username,
                password: formData.password
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
                <input type="text" maxLength={12} value={formData.username}
                       onChange={event => {
                           setFormData({
                               ...formData,
                               username: event.target.value
                           })
                       }}
                />
            </label>
            <label>
                Email:
                <input type="text" value={formData.email}
                       onChange={(event) =>{
                            setFormData({
                                ...formData,
                                email: event.target.value
                            })
                        }}
                />
            </label>
            <label>
                Password:
                <input type="password" value={formData.password}
                       onChange={(event) => {
                           setFormData({
                               ...formData,
                               password: event.target.value
                           })
                       }}
                />
            </label>
            <label>
                Confirm:
                <input type="password" value={formData.repeatPassword}
                       onChange={(event) => {
                           setFormData({
                               ...formData,
                               repeatPassword: event.target.value
                           })
                       }}
                />
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