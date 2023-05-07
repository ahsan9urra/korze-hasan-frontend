import { LoadingContext } from "<prefix>/context/LoadingProvider";
import { MessageContext } from "<prefix>/context/MessageProvider";
import { UserContext } from "<prefix>/context/UserProvider";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

const SignIn = () => {
    const { setLoading } = useContext(LoadingContext);
    const { setMessage } = useContext(MessageContext);
    const { setUser } = useContext(UserContext);
    const Router = useRouter();

    const [formData, setFormData] = useState({
        username: "",
        pass: ""
    })
    const [errorMessage, setErrorMessage] = useState(formData);

    const validation = (data) => {
        let obj = {};
        if (!data.username.trim()) {
            obj.username = "Username is required!"
        }
        if (!data.pass.trim()) {
            obj.pass = "Password is required!"
        }

        return obj
    }

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        setErrorMessage(validation(formData))
    }

    const SignAPI = async () => {
        setLoading(true);
        try {
            const API = "http://localhost:4000/api/login"
            // console.log(formData)
            const response = await axios.post(API, formData);
            // console.log(response)
            if (response.status === 200) {
                setUser(response.data.result)
                sessionStorage.setItem("user", JSON.stringify(response.data.result))
                setMessage({
                    type: true,
                    message: "Sign in successful!"
                })
                Router.push("/dashboard")
            }
        } catch (err) {
            setMessage({
                type: false,
                message: "Something went wrong!"
            })
        }
        setLoading(false);
    }

    useEffect(() => {
        if (Object.keys(errorMessage).length === 0) {
            SignAPI()
        }
    }, [errorMessage])

    return (
        <div className="min-h-[90vh] p-2 md:p-4 lg:p-10 xl:p-20">
            <form>
                <h1>Sign in</h1>
                <div>
                    <label>Username</label>
                    <input name="username" type="text" onChange={handleOnChange} />
                    {
                        errorMessage.username ? <span>{errorMessage.username}</span> : null
                    }
                </div>
                <div>
                    <label>Password</label>
                    <input name="pass" type="text" onChange={handleOnChange} />
                    {
                        errorMessage.pass ? <span>{errorMessage.pass}</span> : null
                    }
                </div>
                <button onClick={handleOnSubmit}>Sign in</button>
                <Link href="/signup" className="text-center hover:text-blue-600">Create new account</Link>
            </form>
        </div>
    )
}

export default SignIn;