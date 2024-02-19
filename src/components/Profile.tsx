import React from "react";

interface ProfileProps  {
    userData: {
        email: string,
        username: string,
        playername: string
    }
}
const Profile: React.FC<ProfileProps> =  ({userData}) => {

    const {email, username, playername} = userData;

    React.useEffect(() => {
        document.title = 'Profile';
    }, [])


    return (
        <div>
            <p>
            {email}
            </p>
            <p>
            {username}
            </p>
            <p>
            {playername}
            </p>
        </div>
    );
}

export default Profile