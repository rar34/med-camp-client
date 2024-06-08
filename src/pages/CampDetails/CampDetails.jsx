import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { IoPeople } from "react-icons/io5";
import { FaLocationDot, FaUserDoctor } from "react-icons/fa6";
import { MdDateRange } from "react-icons/md";
import { IoMdTimer } from "react-icons/io";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const CampDetails = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    // console.log(id)

    const { data: singleCamp = {} } = useQuery({
        queryKey: ['camps', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/camps/${id}`)
            return res.data;
        }
    })
    // console.log(singleCamp)

    const { _id, campName, image, campFees, date, time, location, healthcareProfessional, participantCount, description } = singleCamp;

    const handleJobSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const campId = _id;
        const participantName = user?.displayName;
        const participantEmail = user?.email;
        const age = form.age.value;
        const phone = form.phone.value;
        const gender = form.gender.value;
        const emergencyContact = form.emergencyContact.value;

        const joinCamp = {
            campId, campName, campFees, location, participantName, participantEmail, age, phone, gender, emergencyContact, participantCount: participantCount + 1
        }
        // console.log(joinCamp)

        try {
            const campRes = await axiosPublic.post("/joinCamp", joinCamp)
            console.log(campRes.data)
            if (campRes.data.insertedId) {
                form.reset();
                navigate('/dashboard/registered-camp')
                //show success popup
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "You have successfully registered to the camp",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        catch (error) {
            console.log(error)
            toast.error(error.response.data)
            navigate("/")
        }

    }

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
                        {/* <button className="btn bg-[#6F42C1] w-full text-white text-xl">Join Camp</button> */}
                        {/* Open the modal using document.getElementById('ID').showModal() method */}
                        <button className="btn bg-[#6F42C1] w-full text-white text-xl" onClick={() => document.getElementById('my_modal_2').showModal()}>Join Camp</button>
                        <dialog id="my_modal_2" className="modal">
                            <div className="modal-box bg-[#6F42C1]">
                                <h2 className="text-2xl text-white mb-3 text-center font-semibold">Please enter your resume link to apply for the job</h2>
                                <hr className="mb-2" />
                                <form onSubmit={handleJobSubmit}>
                                    <label className="font-bold mb-2 text-white" htmlFor="">Camp Name:</label> <br />
                                    <input type="text" className="input w-full mb-3" defaultValue={campName} readOnly />
                                    <label className="font-bold mb-2 text-white" htmlFor="">Camp Fees:</label> <br />
                                    <input type="text" className="input w-full mb-3" defaultValue={campFees} readOnly />
                                    <label className="font-bold mb-2 text-white" htmlFor="">Location:</label> <br />
                                    <input type="text" className="input w-full mb-3" defaultValue={location} readOnly />
                                    <label className="font-bold mb-2 text-white" htmlFor="">Healthcare Professional:</label> <br />
                                    <input type="text" className="input w-full mb-3" defaultValue={healthcareProfessional} readOnly />
                                    <label className="font-bold mb-2 text-white" htmlFor="">Participant Name:</label> <br />
                                    <input type="text" className="input w-full mb-3" defaultValue={user.displayName} readOnly /><br />
                                    <label className="font-bold mb-2 text-white" htmlFor="">User Email</label> <br />
                                    <input type="text" className="input w-full mb-3" defaultValue={user.email} readOnly /><br />
                                    <label className="font-bold mb-2 text-white" htmlFor="">Age:</label> <br />
                                    <input type="text" name="age" placeholder="Your age" className="input mt-3 input-bordered w-full" required />
                                    <label className="font-bold mb-2 text-white" htmlFor="">Phone Number:</label> <br />
                                    <input type="text" name="phone" placeholder="Phone Number" className="input mt-3 input-bordered w-full" required />
                                    <label className="font-bold mb-2 text-white" htmlFor="">Gender:</label> <br />
                                    <select name="gender" id="gender" className="select select-bordered w-full mt-3">
                                        <option disabled selected>Select your Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="others">Others</option>
                                    </select>
                                    <label className="font-bold mb-2 text-white" htmlFor="">Emergency Contact:</label> <br />
                                    <input name="emergencyContact" type="text" placeholder="Emergency Contact" className="input mt-3 input-bordered w-full" required />
                                    <input className="btn btn-outline btn-info w-full mt-4" type="submit" value="Join Camp" />
                                </form>
                            </div>
                            <form method="dialog" className="modal-backdrop">
                                <button>close</button>
                            </form>
                        </dialog>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CampDetails;