import { UserContext } from "<prefix>/context/UserProvider"
import { useRouter } from "next/router";
import { useContext, useEffect } from "react"

const Private = ({ children }) => {
    const Router = useRouter();
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (!user && !sessionStorage.getItem('user')) {
            Router.push("/signin");
        }
    }, [user])

    return (
        <div>
            {user ? children : null}
        </div>
    )
}

export default Private