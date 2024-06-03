import { Link, NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";

const Navbar = () => {
    const { user, logOut } = useAuth();
    const navOptions = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/availableCamp">Available Camps</NavLink></li>
    </>

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

    return (
        <div className=" bg-[#6F42C1]  sticky top-0 z-40">
            <div className="drawer z-50 container mx-auto text-white">
                <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    {/* Navbar */}
                    <div className="w-full navbar">
                        <div className="flex-none lg:hidden">
                            <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                            </label>
                        </div>
                        <div className="flex-1 text-xl font-bold"><img className='w-10' src="" alt="" /><span className='text-xl md:text-3xl -ml-10'>MedCampOrganizer</span></div>
                        <div className="flex-none font-bold hidden lg:block">
                            <ul className="menu text-xl menu-horizontal">
                                {navOptions}
                            </ul>
                        </div>

                        {
                            user ? <div className="dropdown dropdown-end " >
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar tooltip">
                                    <div className="w-10 border-2 border-white rounded-full ">
                                        <img alt="Tailwind CSS Navbar component" src={user?.photoURL || "https://i.ibb.co/ZX6HMzF/pp.jpg"} />
                                    </div>

                                </div>
                                <ul tabIndex={0} className="mt-3 z-[10] p-2 shadow menu menu-sm text-white font-bold dropdown-content bg-[#6F42C1] w-32">
                                    <li className="hover:bg-gray-500"><Link to="">User Name</Link></li>
                                    <li className="hover:bg-gray-500"><Link to="">Dashboard</Link></li>
                                    <li className="hover:bg-gray-500 text-red-500"><Link to="/login"><button onClick={handleLogOut}>Logout</button></Link></li>
                                </ul>
                            </div>
                                :
                                <Link to="/join-now"><button className="btn btn-outline border hover:bg-[#28A745] border-[#F5F5DC] text-white text-xl font-medium md:font-bold">Join US</button></Link>
                        }
                    </div>

                </div>
                {/* for responsive device */}
                <div className="drawer-side">
                    <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu font-bold text-2xl w-64 min-h-full bg-[#6F42C1]">
                        {navOptions}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;