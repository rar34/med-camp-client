import { Link } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const BloodDonor = () => {
    const [searchText, setSearchText] = useState('');
    const axiosPublic = useAxiosPublic();

    const { data: donors = [], isLoading } = useQuery({
        queryKey: ['donor'],
        queryFn: async () => {
            const res = await axiosPublic.get('/donate')
            return res.data;
        }
    })
    console.log(donors)

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchText(query);
    };

    const filterDonors = donors.filter(donor =>
        (donor?.bloodGroup.toLowerCase().includes(searchText.toLowerCase()) || (donor?.location.toLowerCase().includes(searchText.toLowerCase())))
    );

    if(isLoading){
        return <div className="text-center"><span className="loading loading-spinner loading-lg"></span></div>
    }

    return (
        <div className="w-full md:w-2/3 mx-auto px-2 my-20">
            <div className="flex justify-between">
                <h2 className="text-3xl font-semibold">All Donors are here</h2>
                <p className="text-2xl">Want to donate blood ? <Link className="bg-[#6F42C1] py-2 px-6 ml-4 text-base rounded-lg hover:bg-slate-600 text-white" to="/donate">Donate</Link></p>
            </div>
            <div className="flex justify-center my-10">
                    <label className="input rounded-lg input-bordered flex items-center gap-2">
                        <input value={searchText} onChange={handleSearchChange} name="searchText" type="text" className="grow" placeholder="Search by blood group or location" />
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                    </label>
                </div>
            <div className="-mx-4 -my-2 mt-14 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-[#6F42C1] text-white">
                                <tr>
                                    <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right ">
                                        <div className="flex items-center gap-x-3">

                                            <button className="flex items-center gap-x-2">
                                                <span>Donor Name</span>
                                            </button>
                                        </div>
                                    </th>

                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right ">
                                        Blood Group
                                    </th>

                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right ">
                                        Location
                                    </th>

                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right ">
                                        Last Donation date
                                    </th>

                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right ">
                                        Contact Number
                                    </th>

                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                {
                                    filterDonors?.map(donor => <tr key={donor._id}>
                                        <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                            <div className="inline-flex items-center gap-x-3">
                                                <span>{donor.donorName}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{donor.bloodGroup}</td>
                                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                            <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 dark:bg-gray-800">
                                                <h2 className="text-sm font-normal">{donor.location}</h2>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                            <div className="flex items-center gap-x-2">
                                                <div>
                                                    <h2 className="text-sm font-medium text-gray-800 dark:text-white ">{donor.lastDonateDate}</h2>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{donor.phone}</td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BloodDonor;