import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { IoPeople } from "react-icons/io5";
import { FaLocationDot, FaUserDoctor } from "react-icons/fa6";
import { MdDateRange } from "react-icons/md";
import { IoMdTimer } from "react-icons/io";

const CampDetails = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();
    console.log(id)

    const { data: singleCamp = {} } = useQuery({
        queryKey: ['camps', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/camps/${id}`)
            return res.data;
        }
    })
    console.log(singleCamp)

    const {  campName, image, campFees, date, time, location, healthcareProfessional, participantCount, description } = singleCamp;

    return (
        <div className="w-2/3 my-14 mx-auto">
            <div className="w-full overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
                <img className="object-cover object-center w-full h-[700px]" src={image} alt="avatar" />

                <div className="flex items-center px-6 py-3 bg-[#6F42C1]">
                    <span className="text-xl text-white font-bold">Fees: </span>

                    <h1 className="mx-3 text-lg font-semibold text-white">${campFees}</h1>
                </div>

                <div className="px-6 py-4">
                    <span className="flex items-center justify-between">
                        <p className="py-2 flex items-center gap-2 font-medium text-gray-700 dark:text-gray-400"><MdDateRange /> {date}</p>
                        <p className="py-2 flex items-center gap-2 font-medium text-gray-700 dark:text-gray-400"><IoMdTimer /> {time}</p>
                    </span>
                    <hr className="my-4" />
                    <h1 className="text-xl font-semibold text-gray-800 dark:text-white">{campName}</h1>

                    <p className="py-2 text-gray-700 dark:text-gray-400">{description}</p>


                    <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                        <FaUserDoctor className=" text-xl" />

                        <h1 className="px-2 text-sm">{healthcareProfessional}</h1>
                    </div>

                    <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                    <FaLocationDot className="text-xl" />

                        <h1 className="px-2 text-sm">{location}</h1>
                    </div>

                    <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                        <IoPeople className="text-xl" />
                        <h1 className="px-2 text-sm">Total participant: {participantCount}</h1>
                    </div>
                    <div className="flex mt-6 justify-center">
                        {/* <Link className="bg-[#6F42C1] py-2 px-6 rounded-lg hover:bg-slate-600 text-white" to={`/camps/${_id}`}>Join Camp</Link> */}
                        <button className="btn bg-[#6F42C1] w-full text-white text-xl">Join Camp</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CampDetails;