import React from "react";

const Profile: React.FC =  () => {

    const [userData, setUserData] = React.useState( {
        email: '',
        username: '',
        created: ''
    })


    React.useEffect(() => {
        fetchUserdata();
    }, [])

    const fetchUserdata = async () => {
        const response = await fetch('http://192.168.178.42:8080/api/users/current', {
            method: "GET",
            credentials: "include"
        })
        if (response.ok) {
            const user = await  response.json()
            console.log('Profile found: ', user);
            setUserData(user);
        } else {
            console.log("Error: ", response.json())
        }
    }

    return (
        <div>
            <p>
            {userData.email}
            </p>
            <p>
            {userData.username}
            </p>
            <p>
            {userData.created}
            </p>
        </div>
    );
}

export default Profile