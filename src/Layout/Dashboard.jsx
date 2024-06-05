import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { FaCalendarPlus, FaListCheck, FaUser } from "react-icons/fa6";
import { FaHome, FaListAlt, FaMoneyCheckAlt } from "react-icons/fa";
import { MdAnalytics } from "react-icons/md";

const Dashboard = () => {
    const { user } = useAuth();
    const isAdmin = true;
    console.log(user)
    const navOptions = <>
        <div className="avatar mx-auto">
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={user?.photoURL} />
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
                    to="/add-camp"><FaCalendarPlus /> Add A Camp</NavLink></li>
                <li><NavLink
                    style={({ isActive }) => { return isActive ? { borderBottomColor: "yellow", backgroundColor: 'transparent ' } : {}; }} className={'border-b-2 mb-4 shadow-md'}
                    to="/manage-camp"><FaListAlt /> Manage Camps</NavLink></li>
                <li><NavLink
                    style={({ isActive }) => { return isActive ? { borderBottomColor: "yellow", backgroundColor: 'transparent ' } : {}; }} className={'border-b-2 mb-4 shadow-md'}
                    to="/manage-reg-camp"><FaListCheck /> Manage Registered Camps</NavLink></li>

                <div className="divider"></div>
                <li><NavLink
                    style={({ isActive }) => { return isActive ? { borderBottomColor: "yellow", backgroundColor: 'transparent ' } : {}; }} className={'border-b-2 mb-4 shadow-md'}
                    to="/"><FaHome /> Home</NavLink></li>
            </>
                :
                <>
                    <li><NavLink
                        style={({ isActive }) => { return isActive ? { borderBottomColor: "skyblue", backgroundColor: 'transparent ' } : {}; }} className={'border-b-2 mb-4'}
                        to="/dashboard/organizer-profile"><MdAnalytics /> Analytics</NavLink></li>
                    <li><NavLink
                        style={({ isActive }) => { return isActive ? { borderBottomColor: "skyblue", backgroundColor: 'transparent ' } : {}; }} className={'border-b-2 mb-4'}
                        to="/add-camp"><FaUser />  Participant Profile</NavLink></li>
                    <li><NavLink
                        style={({ isActive }) => { return isActive ? { borderBottomColor: "skyblue", backgroundColor: 'transparent ' } : {}; }} className={'border-b-2 mb-4'}
                        to="/manage-camp"><FaListAlt /> Registered Camps</NavLink></li>
                    <li><NavLink
                        style={({ isActive }) => { return isActive ? { borderBottomColor: "skyblue", backgroundColor: 'transparent ' } : {}; }} className={'border-b-2 mb-4'}
                        to="/manage-reg-camp"><FaMoneyCheckAlt /> Payment History</NavLink></li>

                    <div className="divider"></div>
                    <li><NavLink
                        style={({ isActive }) => { return isActive ? { borderBottomColor: "skyblue", backgroundColor: 'transparent ' } : {}; }} className={'border-b-2 mb-4'}
                        to="/"><FaHome /> Home</NavLink></li>
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
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;