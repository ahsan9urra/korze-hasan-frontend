import { MessageContext } from "<prefix>/context/MessageProvider";
import { useContext, useEffect } from "react";

const Message = ({children}) => {
    const {message, setMessage} = useContext(MessageContext);

    useEffect(() => {
        setTimeout(() => {
            setMessage(null)
        }, 5000);
    }, [message])
    return (
        <div>
            {
                message ? <div className={`fixed top-[100px] right-0 m-5 px-4 py-[4px] ${message.type ? "bg-green-400" : "bg-red-400"} text-white rounded-md`}>{message.message}</div> : null
            }
            {children}
        </div>
    )
}

export default Message;