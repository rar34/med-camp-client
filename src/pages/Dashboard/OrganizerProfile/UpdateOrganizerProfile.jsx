import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { imageUpload } from "../../../utils";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const UpdateOrganizerProfile = () => {
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: users = [] } = useQuery({
        queryKey: ['users', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`)
            return res.data;
        }
    })
    console.log(users)
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = async (data) => {
        const newImage = await imageUpload(data.image[0])

        const updateUser = {
            name: data.name,
            image: newImage || data.image,
            phone: data.phone
        }

        const campRes = await axiosSecure.patch(`/users/${users._id}`, updateUser)
        console.log(campRes.data)
        if (campRes.data.modifiedCount) {
            reset();
            navigate('/dashboard/organizer-profile')
            //show success popup
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${users.name} is updated successfully`,
                showConfirmButton: false,
                timer: 1500
            });
        }


    }



    return (
        <div>
            <section className="bg-[#F5F5DC]">
                <div className="container flex items-center justify-center py-20 px-6 mx-auto">
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full border-2 border-[#6F42C1] p-10 rounded-xl shadow-xl max-w-md">
                        <div className="flex justify-center mx-auto">
                            <img className="w-auto h-7 sm:h-8" src="https://i.ibb.co/tsknk7d/icon.png" alt="" />
                        </div>

                        <div className="flex items-center justify-center mt-6">
                            <a href="#" className=" text-2xl pb-4 font-medium text-center text-gray-800 capitalize border-b-2 border-[#6F42C1] dark:border-blue-400 dark:text-white">
                                Update profile Now!
                            </a>
                        </div>
                        {/* user name */}
                        <div className="relative flex items-center mt-8">
                            <span className="absolute">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </span>

                            <input defaultValue={users.name} name="name" {...register("name")} type="text" className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Username" />
                        </div>
                        {/* profile image  */}
                        <label htmlFor="dropzone-file" className="flex items-center mt-6">
                            <input name="image" {...register("image")} type="file" className="file-input file-input-bordered file-input-info w-full" />
                        </label>


                        <div className="relative flex items-center mt-6">
                            <span className="absolute">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </span>

                            <input defaultValue={users?.email} name="email" {...register("email")} type="email" className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Email address" readOnly />
                        </div>

                        <div className="relative flex items-center mt-4">
                            <span className="absolute">
                                <svg aria-hidden="true" focusable="false" className="icon mx-3 text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="1em" height="1em"><path d="M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 464-207.5 464-464 0-11.2-7.7-20.9-18.6-23.4z" /></svg>

                            </span>

                            <input name="password" {...register("phone")} type="text" className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Phone number" required />
                        </div>
                        <div className="mt-6">
                            <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#6F42C1] rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                Update Profile
                            </button>

                        </div>
                    </form>
                </div>
            </section >
        </div >
    );
};

export default UpdateOrganizerProfile;