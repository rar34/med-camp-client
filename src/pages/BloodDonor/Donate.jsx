import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

const Donate = () => {
    const axiosPublic = useAxiosPublic();
    const [startDate, setStartDate] = useState(new Date());
    const { register, handleSubmit, reset } = useForm()
    const navigate = useNavigate()
    const onSubmit = async (data) => {
        const date = startDate?.toLocaleDateString().split('T')[0];
        const bloodDonor = {
            donorName: data.name,
            location: data.location,
            bloodGrour: data.bloodGroup,
            phone: data.number,
            lastDonateDate: date
        }

        console.log(bloodDonor)


        const bloodRes = await axiosPublic.post("/donate", bloodDonor)
        console.log(bloodRes.data)
        if (bloodRes.data.insertedId) {
            reset();
            navigate('/bloodDonor')
            //show success popup
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your information been added",
                showConfirmButton: false,
                timer: 1500
            });
        }
        
    }


    return (
        <div className="my-14 container mx-auto">
            <div className="text-center space-y-3">
                <h2 className="text-3xl md:text-5xl font-bold text-[#6F42C1]">Donate your blood</h2>
                <p>Fill all fields to donate your blood</p>
            </div>
            <div className="w-full md:w-2/3 mx-auto my-14 border border-[#6F42C1] shadow-lg p-10 rounded-lg">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="">
                        {/* Camp Name name */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Your Name: </span>
                            </label>
                            <input type="text" placeholder="Your Name" className="input input-bordered w-full " {...register("name", { required: true })} />
                        </div>
                        {/* Blood group */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Your Blood Group*</span>
                            </label>
                            <select {...register("bloodGroup")} className="select select-bordered w-full">
                                <option disabled selected>Select your blood group</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B_">B-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                            </select>
                        </div>
                    </div>


                    <div className="">
                        {/* Location */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Location: </span>
                            </label>
                            <input type="text" placeholder="Location" className="input input-bordered w-full " {...register("location", { required: true })} />
                        </div>
                        {/* Phone numbre */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Phone Number: </span>
                            </label>
                            <input type="number" placeholder="Phone Number" className="input input-bordered w-full " {...register("number", { required: true })} />
                        </div>
                    </div>
                    <div className="">
                        {/* last Donate */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Last Donate Date: </span>
                            </label>
                            <DatePicker className="p-3 border rounded-lg w-full" selected={startDate} onChange={(date) => setStartDate(date)} />

                        </div>

                    </div>


                    <button className="btn bg-[#6F42C1] text-white mt-6">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Donate;