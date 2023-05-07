const { createContext, useState, useEffect } = require("react");

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const itemInSessionStore = sessionStorage.getItem("user");
        if (itemInSessionStore && !user) {
            setUser(itemInSessionStore)
        }
    }, [])
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider