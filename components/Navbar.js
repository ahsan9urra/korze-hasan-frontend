import { MessageContext } from "<prefix>/context/MessageProvider";
import { UserContext } from "<prefix>/context/UserProvider";
import { useRouter } from "next/router"
import { useContext } from "react";

const { default: Link } = require("next/link")

const Links = [
    {
        title: "Capital",
        link: "/capital"
    },
    {
        title: "About",
        link: "/about"
    },
    {
        title: "Contact",
        link: "/contact"
    },
    {
        title: "Dashboard",
        link: "/dashboard"
    }
]

const Navbar = () => {
    const Router = useRouter();
    const { user, setUser } = useContext(UserContext);
    const { setMessage } = useContext(MessageContext)
    const Logout = () => {
        sessionStorage.clear();
        setMessage({
            type: false,
            message: "Logged out!"
        })
        setUser(null);
        Router.push("/signin")
    }
    return (
        <nav className="sticky top-0 shadow-xl bg-white backdrop-blur-md bg-white/30" style={{ zIndex: "99" }}>
            <div className="w-full flex items-center justify-between gap-10 container py-2">
                <div className="font-bold text-lg lg:text-xl text-blue-600 cursor-pointer" onClick={() => Router.push("/")}>KorzeHasana</div>
                <ul className="flex items-center justify-between gap-3">
                    {
                        Links.map(link => {
                            return (
                                <Link key={link.title} href={link.link} className="hover:text-blue-400">{link.title}</Link>
                            )
                        })
                    }
                    {
                        user ? <button className="button bg-red-400" onClick={Logout}>Logout</button> : null
                    }
                </ul>
            </div>
        </nav>
    )
}

export default Navbar