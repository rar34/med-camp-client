import { Link } from "react-router-dom";

const Navbar = () => {
    const user = true;
    const navOptions = <>
        <li><a>Home</a></li>
        <li><a>Available Camps</a></li>
    </>
    return (
        <div className="drawer bg-[#007BFF] text-white sticky top-0">
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
                    <button className="btn btn-outline border-2 border-[#28A745] text-white text-xl font-bold">Join US</button>
                    <div className="dropdown dropdown-end " >
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar tooltip" data-tip={user?.displayName || user?.email}>
                            <div className="w-10 rounded-full ">
                                <img alt="Tailwind CSS Navbar component" src={user?.photoURL || "https://i.ibb.co/ZX6HMzF/pp.jpg"} />
                            </div>

                        </div>
                        <ul tabIndex={0} className="mt-3 z-[10] p-2 shadow menu menu-sm text-white font-bold dropdown-content bg-[#007BFF] w-32">
                            <li className="hover:bg-gray-500"><Link to="/user-profile">User Profile</Link></li>
                            <li className="hover:bg-gray-500"><Link to="/login"><button>Logout</button></Link></li>
                        </ul>
                    </div>
                </div>

            </div>
            {/* for responsive device */}
            <div className="drawer-side">
                <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu font-bold text-2xl w-64 min-h-full bg-[#007BFF]">
                    {navOptions}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;