import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import { FaLocationDot, FaUserDoctor } from "react-icons/fa6";
import { MdDateRange } from "react-icons/md";
import { IoMdTimer } from "react-icons/io";
import SearchBar from "./SearchBar";
import { useState } from "react";

const AvailableCamps = () => {
    const [value, setValue] = useState(3);

    const axiosPublic = useAxiosPublic()

    const { data: camps = [], isLoading } = useQuery({
        queryKey: ['camps'],
        queryFn: async () => {
            const res = await axiosPublic.get('/camps');
            return res.data;
        }
    })


    // const [searchCamps, setSearchCamps] = useState(camps);
    const [filteredCamps, setFilteredCamps] = useState(camps);

    const handleSearch = ({ keyword, startDate, endDate }) => {

        console.log(keyword, startDate, endDate)
        let filtered = filteredCamps;

        if (keyword) {
            filtered = filtered.filter(camp =>
                camp.campName.toLowerCase().includes(keyword.toLowerCase())
            );
        }

        if (startDate) {
            filtered = filtered.filter(camp => new Date(camp.date) >= new Date(startDate));
        }

        if (endDate) {
            filtered = filtered.filter(camp => new Date(camp.date) <= new Date(endDate));
        }

        setFilteredCamps(filtered);
        keyword = '';
        startDate = '';
        endDate = '';
    };

    const handleSort = (criteria) => {
        let sorted = [...filteredCamps];
        switch (criteria) {
            case 'mostRegistered':
                sorted.sort((a, b) => b.participantCount - a.participantCount);
                break;
            case 'campFees':
                sorted.sort((a, b) => a.campFees - b.campFees);
                break;
            case 'alphabetical':
                sorted.sort((a, b) => a.campName.localeCompare(b.campName));
                break;
            default:
                break;
        }
        setFilteredCamps(sorted);
    };


    if (isLoading) {
        return <div className="text-center mt-10"><span className="loading loading-spinner text-primary"></span></div>
    }

    // console.log(camps)

    return (
        <div className="pt-14 bg-[#F5F5DC] px-2 py-10">

            <div className=" text-center mb-14">
                <h2 className="font-bold text-2xl mb-6 md:text-5xl">Available Medical Camp</h2>
                <p className="my-4 w-full md:w-1/2 text-lg text-gray-700 mx-auto">Improve your heart health at our popular medical camp. Receive expert cardiac care and personalized assessments. Prioritize your well-being with comprehensive screenings and guidance.</p>
            </div>
            <div className="text-center flex flex-col md:flex-row gap-4 items-center justify-center mb-10">
                <SearchBar onSearch={handleSearch} onSort={handleSort}></SearchBar>
                <button onClick={()=>setValue(2)} className="btn bg-[#6F42C1] text-white">Layout</button>
            </div>
            <div className={`grid grid-cols-1 p-3 md:grid-cols-2 lg:grid-cols-${value} gap-6 container mx-auto`}>
                {
                    filteredCamps.length > 0 ? (filteredCamps?.map(camp => <div key={camp._id} className="w-full overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
                        <img className="object-cover object-center w-full h-72" src={camp.image} alt="avatar" />

                        <div className="flex items-center justify-between px-6 py-3 bg-[#6F42C1]">
                            <div className="flex">
                                <span className="text-xl text-white font-bold">Fees: </span>
                                <h1 className="mx-3 text-lg font-semibold text-white">${camp.campFees}</h1>
                            </div>
                            <div className="flex">
                                <span className="text-xl text-white font-bold">Participant: </span>
                                <h1 className="mx-3 text-lg font-semibold text-white">{camp.participantCount}</h1>
                            </div>
                        </div>

                        <div className="px-6 py-4">
                            <span className="flex items-center justify-between">
                                <p className="py-2 flex items-center gap-2 font-medium text-gray-700 dark:text-gray-400"><MdDateRange /> {camp.date}</p>
                                <p className="py-2 flex items-center gap-2 font-medium text-gray-700 dark:text-gray-400"><IoMdTimer /> {camp.time}</p>
                            </span>
                            <hr className="my-4" />
                            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">{camp.campName}</h1>

                            <p className="py-2 text-gray-700 dark:text-gray-400">{camp.description.slice(0, 120) + '....'}</p>


                            <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                                <FaUserDoctor className=" text-xl" />

                                <h1 className="px-2 text-sm"><span className="font-bold">Healthcare Professional:</span> {camp.healthcareProfessional}</h1>
                            </div>

                            <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                                <FaLocationDot className="text-xl" />

                                <h1 className="px-2 text-sm">{camp.location}</h1>
                            </div>
                            <div className="flex mt-3 justify-end">
                                <Link className="bg-[#6F42C1] py-2 px-6 rounded-lg hover:bg-slate-600 text-white" to={`/camps/${camp._id}`}>See Details</Link>
                            </div>
                        </div>
                    </div>)) : (<p className="text-red-600 text-2xl font-medium">No camps found.</p>)
                }

            </div>
            {/* <div className="flex justify-center w-full mb-4 mt-14">
                <Link className="bg-[#6F42C1] py-3 px-14 rounded-lg hover:bg-slate-600 text-white text-2xl" to="availableCamps">See All Camps</Link>
            </div> */}
        </div>
    );
};

export default AvailableCamps;