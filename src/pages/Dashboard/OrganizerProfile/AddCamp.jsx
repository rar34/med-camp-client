import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaUtensils } from "react-icons/fa6";

const AddCamp = () => {

    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure()
    const { register, handleSubmit, reset } = useForm()
    const onSubmit = async (data) => {
        console.log(data)
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post("", imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        console.log(res.data)
        if (res.data.success) {
            // send the data to the server with image
            const menuItem = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: res.data.data.display_url
            }
            const menuRes = await axiosSecure.post("/menu", menuItem)
            console.log(menuRes.data)
            if (menuRes.data.insertedId) {
                reset();
                //show success popup
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your item has been added",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    }

    return (
        <div>
            <div className="bg-[#F5F5DC] p-10 rounded-xl">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Camp Name*</span>
                        </label>
                        <input type="text" placeholder="Camp Name" className="input input-bordered w-full" {...register("name", { required: true })} required />
                    </div>
                    <div className="flex items-center gap-6">
                        {/* Healthcare professional name */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Healthcare Professional: </span>
                            </label>
                            <input type="text" placeholder="Healthcare Professional" className="input input-bordered w-full " {...register("fees", { required: true })} />
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
                                <span className="label-text">Location: </span>
                            </label>
                            <input type="text" placeholder="Location" className="input input-bordered w-full " {...register("fees", { required: true })} />
                        </div>
                        {/* Date and time */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Date and Time: </span>
                            </label>
                            <input type="date" placeholder="Camp fees" className="input input-bordered w-full " {...register("fees", { required: true })} />
                        </div>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <textarea {...register('recipe')} className="textarea textarea-bordered h-24" placeholder="Description"></textarea>
                    </div>
                    <input {...register('image', { required: true })} type="file" className="file-input file-input-bordered file-input-info w-full mt-6" />
                    {/* <input className="btn btn-primary mt-6 w-full" type="submit" value="Add Items" /> */}
                    <button className="btn bg-[#6F42C1] text-white mt-6">Add Item <FaUtensils></FaUtensils></button>
                </form>
            </div>
        </div>
    );
};

export default AddCamp;