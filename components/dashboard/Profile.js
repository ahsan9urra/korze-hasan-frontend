import { UserContext } from "<prefix>/context/UserProvider"
import { useContext } from "react"

const Profile = () => {
    const { user } = useContext(UserContext);
    // console.log(user)
    return (
        <div className="w-full">
            <h1 className="text-xl lg:text-2xl font-bold">Profile</h1>
            <div>
                <h3 className="font-bold">{user.full_name}<span className="font-normal">({user.email})</span></h3>
                <p>{user.address},{user.city}</p>
            </div>
        </div>
    )
}

export default Profile;