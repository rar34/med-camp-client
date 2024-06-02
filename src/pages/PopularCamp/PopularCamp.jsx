import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import { FaUserDoctor } from "react-icons/fa6";
import { IoPeople } from "react-icons/io5";
import { MdDateRange } from "react-icons/md";
import { IoMdTimer } from "react-icons/io";


const PopularCamp = () => {
    const axiosPublic = useAxiosPublic()

    const { data: popularCamps = [] } = useQuery({
        queryKey: ['camps'],
        queryFn: async () => {
            const res = await axiosPublic.get('/camps');
            return res.data;
        }
    })

    console.log(popularCamps)
    // const {_id, campName, image, campFees, date, time, location, healthcareProfessional, participantCount} = popularCamps;
    function sortByParticipantCounts(a, b) {
        return b.participantCount - a.participantCount;
    }
    popularCamps.sort(sortByParticipantCounts)

    return (
        <div className="mt-28 bg-[#F5F5DC] py-10">
            <div className=" text-center mb-14">
                <h2 className="font-bold text-2xl md:text-5xl">Popular Medical Camp</h2>
                <p className="my-4 w-full md:w-1/2 text-lg text-gray-700 mx-auto">Improve your heart health at our popular medical camp. Receive expert cardiac care and personalized assessments. Prioritize your well-being with comprehensive screenings and guidance.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 container mx-auto">
                {
                    popularCamps?.slice(0, 6).map(camp => <div key={camp._id} className="w-full overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
                        <img className="object-cover object-center w-full h-56" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80" alt="avatar" />

                        <div className="flex items-center px-6 py-3 bg-[#6F42C1]">
                            <span className="text-xl text-white font-bold">Fees: </span>

                            <h1 className="mx-3 text-lg font-semibold text-white">${camp.campFees}</h1>
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
                                <svg aria-label="location pin icon" className="w-6 h-6 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M16.2721 10.2721C16.2721 12.4813 14.4813 14.2721 12.2721 14.2721C10.063 14.2721 8.27214 12.4813 8.27214 10.2721C8.27214 8.063 10.063 6.27214 12.2721 6.27214C14.4813 6.27214 16.2721 8.063 16.2721 10.2721ZM14.2721 10.2721C14.2721 11.3767 13.3767 12.2721 12.2721 12.2721C11.1676 12.2721 10.2721 11.3767 10.2721 10.2721C10.2721 9.16757 11.1676 8.27214 12.2721 8.27214C13.3767 8.27214 14.2721 9.16757 14.2721 10.2721Z" /><path fillRule="evenodd" clipRule="evenodd" d="M5.79417 16.5183C2.19424 13.0909 2.05438 7.3941 5.48178 3.79418C8.90918 0.194258 14.6059 0.0543983 18.2059 3.48179C21.8058 6.90919 21.9457 12.606 18.5183 16.2059L12.3124 22.7241L5.79417 16.5183ZM17.0698 14.8268L12.243 19.8965L7.17324 15.0698C4.3733 12.404 4.26452 7.9732 6.93028 5.17326C9.59603 2.37332 14.0268 2.26454 16.8268 4.93029C19.6267 7.59604 19.7355 12.0269 17.0698 14.8268Z" />
                                </svg>

                                <h1 className="px-2 text-sm">{camp.location}</h1>
                            </div>

                            <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                                <IoPeople className="text-xl" />

                                <h1 className="px-2 text-sm">Total participant: {camp.participantCount}</h1>
                            </div>
                        </div>
                    </div>)
                }

            </div>
            <div className="flex justify-center w-full mb-4 mt-14">
                <Link className="bg-[#6F42C1] py-3 px-14 rounded-lg hover:bg-slate-600 text-white text-2xl" to="availableCamps">See All Camps</Link>
            </div>
        </div>
    );
};

export default PopularCamp;