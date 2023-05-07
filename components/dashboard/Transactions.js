import { LoadingContext } from "<prefix>/context/LoadingProvider";
import { MessageContext } from "<prefix>/context/MessageProvider";
import { UserContext } from "<prefix>/context/UserProvider";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const { user } = useContext(UserContext);
    const { setMessage} = useContext(MessageContext);
    const { setLoading} = useContext(LoadingContext);

    const GetTransactions = async (user_name) => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:4000/api/transactions/${user_name}`);
            console.log(response);
            if (response.status === 200) {
                setMessage({
                    type: true,
                    message: "Data fetch successful!"
                })
                setTransactions(response.data.result)
            }
        } catch (error) {
            setMessage({
                type: false,
                message: "Something went wrong!"
            })
        }
        setLoading(false);
    }

    useEffect(() => {
        if (user) {
            const user_name = user.user_name;
            user_name && GetTransactions(user_name);
        }
    }, [user])

    const tableHeadings = ["ID", "User", "Transaction Type", "Amount", "Balance", "Date"]

    return (
        <div>
            <h1 className="text-xl lg:text-2xl font-bold mb-5">Transactions</h1>
            <div>
                <table className="w-full text-center">
                    <thead className="bg-blue-600 text-white ">
                        <tr>
                            {
                                tableHeadings.map(th => {
                                    return (
                                        <th key={th} className="px-3 py-1">{th}</th>
                                    )
                                })
                            }

                        </tr>
                    </thead>
                    <tbody>
                        {
                            transactions.length ?
                                transactions.map(item => {
                                    return (
                                        <tr key={item.id}>
                                            {
                                                Object.values(item).map(data => {
                                                    return (
                                                        <td key={data} className="border-b px-3 py-1">{data}</td>
                                                    )
                                                })
                                            }
                                        </tr>
                                    )
                                }) : null
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Transactions;