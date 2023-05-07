import LoadingProvider from "./LoadingProvider"
import MessageProvider from "./MessageProvider"
import UserProvider from "./UserProvider"

const ContextWrapper = ({ children }) => {
    return (
        <UserProvider>
            <LoadingProvider>
                <MessageProvider>
                    {children}
                </MessageProvider>
            </LoadingProvider>
        </UserProvider>
    )
}

export default ContextWrapper