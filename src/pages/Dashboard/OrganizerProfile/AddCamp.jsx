import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { imageUpload } from "../../../utils";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import TimePicker from 'react-time-picker';

import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';


const AddCamp = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [value, onChange] = useState('10:00');
    const axiosSecure = useAxiosSecure()
    const { register, handleSubmit, reset } = useForm()
    const onSubmit = async (data) => {
        const image = await imageUpload(data.image[0])
        const date = startDate?.toLocaleDateString().split('T')[0];
        const time = startDate?.toLocaleTimeString().split(' ')[0];
        console.log(image, date, time)
        
        const campItem = {
            campName: data.name,
            image: image,
            campFees: parseFloat(data.fees),
            date: date,
            time: value,
            location: data.location,
            healthcareProfessional: data.healthcareProfessional,
            participantCount: 0,
            description: data.description
        }

        // console.log(campItem)
        
        const campRes = await axiosSecure.post("/camps", campItem)
        console.log(campRes.data)
        if (campRes.data.insertedId) {
            reset();
            //show success popup
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "New Camp has been added",
                showConfirmButton: false,
                timer: 1500
            });
        }
        // }
    }

    return (
        <div>
            <div className="bg-[#F5F5DC] p-10 rounded-xl border border-[#6F42C1] shadow-md">
                <h2 className="text-3xl text-center font-bold">Add Camp</h2>
                <div className="divider"></div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Camp Name*</span>
                        </label>
                        <input type="text" placeholder="Camp Name" className="input input-bordered w-full" {...register("name", { required: true })} required />
                    </div> */}
                    <div className="flex items-center gap-6">
                        {/* Camp Name name */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Camp Name: </span>
                            </label>
                            <input type="text" placeholder="Camp Name" className="input input-bordered w-full " {...register("name", { required: true })} />
                        </div>
                        {/* Camp fees */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Healthcare Professional*</span>
                            </label>
                            <input type="text" placeholder="Healthcare Professional" className="input input-bordered w-full" {...register("healthcareProfessional", { required: true })} required />
                        </div>
                    </div>


                    <div className="flex items-center gap-6">
                        {/* Location */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Location: </span>
                            </label>
                            <input type="text" placeholder="Location" className="input input-bordered w-full " {...register("location", { required: true })} />
                        </div>
                        {/* Camp fees */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Camp fees: </span>
                            </label>
                            <input type="number" placeholder="Camp fees" className="input input-bordered w-full " {...register("fees", { required: true })} />
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        {/* Location */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Date: </span>
                            </label>
                            <DatePicker className="p-3 border rounded-lg w-full" selected={startDate} onChange={(date) => setStartDate(date)} />
                            {/* <TimePicker className="p-3 border rounded-lg w-full bg-white" onChange={onChange} value={value} /> */}
                            {/* <input type="date" placeholder="Camp fees" className="input input-bordered w-full " {...register("fees", { required: true })} /> */}
                        </div>
                        {/* Date and time */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Time: </span>
                            </label>
                            {/* <DatePicker className="p-3 border rounded-lg w-full" selected={startDate} onChange={(date) => setStartDate(date)} /> */}
                            <TimePicker className="p-3 border rounded-lg w-full bg-white" onChange={onChange} value={value} />
                            {/* <input type="date" placeholder="Camp fees" className="input input-bordered w-full " {...register("fees", { required: true })} /> */}
                        </div>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <textarea {...register('description')} className="textarea textarea-bordered h-24" placeholder="Description"></textarea>
                    </div>
                    {/* image upload */}
                    <input {...register('image', { required: true })} type="file" className="file-input file-input-bordered file-input-info w-full mt-6" />
                    <button className="btn bg-[#6F42C1] text-white mt-6">Add Item</button>
                </form>
            </div>
        </div>
    );
};

export default AddCamp;