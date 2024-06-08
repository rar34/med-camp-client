import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import { FaLocationDot, FaUserDoctor } from "react-icons/fa6";
import { MdDateRange } from "react-icons/md";
import { IoMdTimer } from "react-icons/io";


const PopularCamp = () => {
    const axiosPublic = useAxiosPublic()

    const { data: popularCamps = [], isLoading } = useQuery({
        queryKey: ['camps'],
        queryFn: async () => {
            const res = await axiosPublic.get('/camps');
            return res.data;
        }
    })

    // console.log(popularCamps)
    // const {_id, campName, image, campFees, date, time, location, healthcareProfessional, participantCount} = popularCamps;
    function sortByParticipantCounts(a, b) {
        return b.participantCount - a.participantCount;
    }
    popularCamps.sort(sortByParticipantCounts)


    if (isLoading) {
        return <div className="text-center mt-10"><span className="loading loading-spinner text-primary"></span></div>
    }

    return (
        <div className="mt-28 bg-[#F5F5DC] py-10">
            <div className=" text-center mb-14">
                <h2 className="font-bold text-2xl mb-6 md:text-5xl">Popular Medical Camp</h2>
                <p className="my-4 w-full md:w-1/2 text-lg text-gray-700 mx-auto">Improve your heart health at our popular medical camp. Receive expert cardiac care and personalized assessments. Prioritize your well-being with comprehensive screenings and guidance.</p>
            </div>
            <div className="grid grid-cols-1 p-3 md:grid-cols-2 lg:grid-cols-3 gap-6 container mx-auto">
                {
                    popularCamps?.slice(0, 6).map(camp => <div key={camp._id} className="w-full overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
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

                            {/* <p className="py-2 text-gray-700 dark:text-gray-400">{camp.description}</p> */}


                            <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                                <FaUserDoctor className=" text-xl" />

                                <h1 className="px-2 text-sm">{camp.healthcareProfessional}</h1>
                            </div>

                            <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                                <FaLocationDot className="text-xl" />

                                <h1 className="px-2 text-sm">{camp.location}</h1>
                            </div>
                            <div className="flex mt-3 justify-end">
                                <Link className="bg-[#6F42C1] py-2 px-6 rounded-lg hover:bg-slate-600 text-white" to={`/camps/${camp._id}`}>See Details</Link>
                            </div>
                        </div>
                    </div>)
                }

            </div>
            <div className="flex justify-center w-full mb-4 mt-14">
                <Link className="bg-[#6F42C1] py-3 px-14 rounded-lg hover:bg-slate-600 text-white text-2xl" to="availableCamp">See All Camps</Link>
            </div>
        </div>
    );
};

export default PopularCamp;