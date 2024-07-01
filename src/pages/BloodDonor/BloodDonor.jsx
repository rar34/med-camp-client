import { Link } from "react-router-dom";

const BloodDonor = () => {
    return (
        <div className="container mx-auto my-20">
            <div className="flex justify-between">
                <h2 className="text-3xl font-semibold">All Donors are here</h2>
                <p className="text-2xl">Want to donate blood ? <Link className="bg-[#6F42C1] py-2 px-6 ml-4 text-base rounded-lg hover:bg-slate-600 text-white" to="/donate">Donate</Link></p>
            </div>
        </div>
    );
};

export default BloodDonor;