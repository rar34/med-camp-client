import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { FaCalendarPlus, FaListCheck, FaUser } from "react-icons/fa6";
import { FaHome, FaListAlt, FaMoneyCheckAlt } from "react-icons/fa";
import { MdAnalytics } from "react-icons/md";
import useAdmin from "../hooks/useAdmin";
import { toast } from "react-toastify";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const Dashboard = () => {
    const { user, logOut } = useAuth();
    const [isAdmin] = useAdmin();
    const axiosPublic = useAxiosPublic();
    // console.log(user)
    const { data: users = [] } = useQuery({
        queryKey: ['users', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/users/${user?.email}`)
            return res.data;
        }
    })

    const handleLogOut = () => {
        logOut()
            .then(result => {
                toast.success("log out successful")
                console.log(result.user)
            })
            .catch(error => {
                console.log(error)
                toast.error(error.message)
            })
    }
    // console.log(user)
    const navOptions = <>
        <div className="avatar online mx-auto">
            <div className="w-24 rounded-full border-2 ring-offset-base-100 ring-offset-2">
                <img src={users?.image} />
            </div>
        </div>
        <h3 className="text-3xl text-center my-2 font-bold">{user?.displayName}</h3>
        <div className="divider"></div>

        {
            isAdmin ? <>
                <li><NavLink
                    style={({ isActive }) => { return isActive ? { borderBottomColor: "yellow", backgroundColor: 'transparent ' } : {}; }} className={'border-b-2 mb-4 shadow-md'}
                    to="/dashboard/organizer-profile"><FaUser /> Organizer Profile</NavLink></li>
                <li><NavLink
                    style={({ isActive }) => { return isActive ? { borderBottomColor: "yellow", backgroundColor: 'transparent ' } : {}; }} className={'border-b-2 mb-4 shadow-md'}
                    to="/dashboard/add-camp"><FaCalendarPlus /> Add A Camp</NavLink></li>
                <li><NavLink
                    style={({ isActive }) => { return isActive ? { borderBottomColor: "yellow", backgroundColor: 'transparent ' } : {}; }} className={'border-b-2 mb-4 shadow-md'}
                    to="/dashboard/manage-camps"><FaListAlt /> Manage Camps</NavLink></li>
                <li><NavLink
                    style={({ isActive }) => { return isActive ? { borderBottomColor: "yellow", backgroundColor: 'transparent ' } : {}; }} className={'border-b-2 mb-4 shadow-md'}
                    to="/dashboard/manage-reg-camp"><FaListCheck /> Manage Registered Camps</NavLink></li>

                <div className="divider"></div>
                <li><NavLink
                    style={({ isActive }) => { return isActive ? { borderBottomColor: "yellow", backgroundColor: 'transparent ' } : {}; }} className={'border-b-2 mb-4 shadow-md'}
                    to="/"><FaHome /> Home</NavLink></li>
                <li className=' mb-4 shadow-md'><button onClick={handleLogOut}>Logout</button></li>
            </>
                :
                <>
                    <li><NavLink
                        style={({ isActive }) => { return isActive ? { borderBottomColor: "yellow", backgroundColor: 'transparent ' } : {}; }} className={'border-b-2 mb-4'}
                        to="/dashboard/analytics"><MdAnalytics /> Analytics</NavLink></li>
                    <li><NavLink
                        style={({ isActive }) => { return isActive ? { borderBottomColor: "yellow", backgroundColor: 'transparent ' } : {}; }} className={'border-b-2 mb-4'}
                        to="/dashboard/participant-profile"><FaUser />  Participant Profile</NavLink></li>
                    <li><NavLink
                        style={({ isActive }) => { return isActive ? { borderBottomColor: "yellow", backgroundColor: 'transparent ' } : {}; }} className={'border-b-2 mb-4'}
                        to="/dashboard/registered-camp"><FaListAlt /> Registered Camps</NavLink></li>
                    <li><NavLink
                        style={({ isActive }) => { return isActive ? { borderBottomColor: "yellow", backgroundColor: 'transparent ' } : {}; }} className={'border-b-2 mb-4'}
                        to="/dashboard/payment-history"><FaMoneyCheckAlt /> Payment History</NavLink></li>

                    <div className="divider"></div>
                    <li><NavLink
                        style={({ isActive }) => { return isActive ? { borderBottomColor: "yellow", backgroundColor: 'transparent ' } : {}; }} className={'border-b-2 mb-4'}
                        to="/"><FaHome /> Home</NavLink></li>
                    <li className='mb-4 shadow-md'><button onClick={handleLogOut}>Logout</button></li>
                </>
        }
    </>



    return (
        <div className="flex gap-6 container mx-auto">
            {/* dashboard side bar */}
            <div className="drawer w-14 lg:w-80 bg-[#6F42C1] min-h-screen text-white z-50 container mx-auto">
                <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />

                <div className="drawer-content flex flex-col">
                    {/* Navbar */}
                    <div className="w-full navbar">
                        <div className="flex-none lg:hidden">
                            <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                            </label>
                        </div>
                        <div className="flex-none font-bold hidden lg:block">
                            <ul className="menu flex-col text-lg pl-3 menu-horizontal">
                                {navOptions}
                            </ul>
                        </div>
                    </div>

                </div>
                {/* for responsive device */}
                <div className="drawer-side">
                    <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu font-bold text-lg w-64 min-h-full bg-[#6F42C1]">
                        {navOptions}
                    </ul>
                </div>
            </div>
            {/* dashboard content */}
            <div className="flex-1 p-2 md:p-8 bg-[#F5F5DC] overflow-x-auto">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;