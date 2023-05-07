import { LoadingContext } from "<prefix>/context/LoadingProvider";
import { MessageContext } from "<prefix>/context/MessageProvider";
import { UserContext } from "<prefix>/context/UserProvider";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

const SignUp = () => {
    const { setLoading } = useContext(LoadingContext);
    const { setMessage } = useContext(MessageContext);
    const { setUser } = useContext(UserContext);
    const Router = useRouter();

    const [formData, setFormData] = useState({
        user_name: "",
        pass: "",
        full_name: "",
        address: "",
        city: "",
        email: "",
        joining_date: new Date()
    })
    const [errorMessage, setErrorMessage] = useState(formData);

    const validation = (data) => {
        let obj = {};
        if (!data.user_name.trim()) {
            obj.user_name = "Username is required!"
        }
        if (!data.pass.trim()) {
            obj.pass = "Password is required!"
        }
        if (!data.full_name.trim()) {
            obj.full_name = "Full namef is required!"
        }
        if (!data.address.trim()) {
            obj.address = "Address is required!"
        }
        if (!data.city.trim()) {
            obj.city = "City is required!"
        }
        if (!data.email.trim()) {
            obj.email = "Email is required!"
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
            const API = "https://different-fawn-underwear.cyclic.app/api/signup"
            
            const response = await axios.post(API, formData);
            console.log(response)
            if (response.status === 200) {
                
                setMessage({
                    type: true,
                    message: "Sign up successful!"
                })
                Router.push("/signin")
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
                <h1>Sign Up</h1>
                <div>
                    <label>Username</label>
                    <input name="user_name" type="text" onChange={handleOnChange} />
                    {
                        errorMessage.user_name ? <span>{errorMessage.user_name}</span> : null
                    }
                </div>
                <div>
                    <label>Full name</label>
                    <input name="full_name" type="text" onChange={handleOnChange} />
                    {
                        errorMessage.full_name ? <span>{errorMessage.full_name}</span> : null
                    }
                </div>
                <div>
                    <label>Address</label>
                    <input name="address" type="text" onChange={handleOnChange} />
                    {
                        errorMessage.address ? <span>{errorMessage.address}</span> : null
                    }
                </div>
                <div>
                    <label>City</label>
                    <input name="city" type="text" onChange={handleOnChange} />
                    {
                        errorMessage.city ? <span>{errorMessage.city}</span> : null
                    }
                </div>
                <div>
                    <label>Email</label>
                    <input name="email" type="text" onChange={handleOnChange} />
                    {
                        errorMessage.email ? <span>{errorMessage.email}</span> : null
                    }
                </div>
                <div>
                    <label>Password</label>
                    <input name="pass" type="text" onChange={handleOnChange} />
                    {
                        errorMessage.pass ? <span>{errorMessage.pass}</span> : null
                    }
                </div>
                <button onClick={handleOnSubmit}>Sign up</button>
                <Link href="/signin" className="text-center hover:text-blue-600">Already have account? Sign in</Link>
            </form>
        </div>
    )
}

export default SignUp;