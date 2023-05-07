import Profile from "<prefix>/components/dashboard/Profile";
import Transactions from "<prefix>/components/dashboard/Transactions";
import { UserContext } from "<prefix>/context/UserProvider";
import Private from "<prefix>/layout/Private"
import { useContext, useEffect, useState } from "react";

const Dashboard = () => {
  const [list, setList] = useState(["Profile"])
  const [currentTab, setCurrentTab] = useState("Profile");
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        setList([...list, "Transactions", "Users"]);
      }
    }
  }, [user])

  return (
    <Private>
      <div className="container section">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 xl:grid-cols-12 gap-5">
          <div className="col-span-0 md:col-span-2 lg:col-span-3 xl:col-span-4 bg-blue-600 p-2 md:p-3 lg:p-4 rounded-md text-white min-h-[70vh]">
            <h1 className="mb-4 font-bold text-xl lg:text-2xl">Dashboard</h1>
            <div className="grid grid-cols-1 gap-[3px]">
              {
                list.map((item) => {
                  return (
                    <span key={item} onClick={() => {
                      setCurrentTab(item)
                    }} className={`px-3 py-1 rounded-md hover:bg-blue-400 cursor-pointer ${item === currentTab ? "bg-white text-blue-600 hover:bg-blue-100" : ""}`}>{item}</span>
                  )
                })
              }
            </div>
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-5 xl:col-span-8">
            {
              currentTab === "Profile" ? <Profile /> :
                currentTab === "Transactions" ? <Transactions /> : null
            }
          </div>
        </div>
      </div>
    </Private>
  )
}

export default Dashboard