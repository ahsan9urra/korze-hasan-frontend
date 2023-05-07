import Footer from "<prefix>/components/Footer"
import Navbar from "<prefix>/components/Navbar"
import Loading from "../components/Loding"
import Message from "../components/Message"



const Layout = ({ children }) => {
    return (
        <Loading>
            <Message>
                <>
                    <Navbar />
                    {children}
                    <Footer />
                </>
            </Message>
        </Loading>
    )
}

export default Layout