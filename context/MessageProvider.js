const { createContext, useState } = require("react");

export const MessageContext = createContext();

const MessageProvider = ({ children }) => {
    const [message, setMessage] = useState(null);
    return (
        <MessageContext.Provider value={{ message, setMessage }}>
            {children}
        </MessageContext.Provider>
    )
}

export default MessageProvider