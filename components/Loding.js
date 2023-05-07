import { LoadingContext } from "<prefix>/context/LoadingProvider";
import { useContext, useEffect } from "react";
import Loader from "../static/loading.svg"

const Loading = ({ children }) => {
    const { loading, setLoading } = useContext(LoadingContext)
    useEffect(() => {
        setTimeout(() => {
            setLoading(null)
        }, 5000);
    }, [loading])

    return (
        <div>
            {
                loading ?
                    <div className="fixed top-0 left-0 w-full h-[100vh] flex items-center justify-center">
                        <img src={Loader.src} alt="Loading..." />
                    </div>
                    : null
            }
            {
                children
            }
        </div>
    )
}

export default Loading;