import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { imageUpload } from "../../utils";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { toast } from "react-toastify";

const JoinUs = () => {
    const navigate = useNavigate()
    const axiosPublic = useAxiosPublic();
    const { createUser, profileUpdate, googleSignIn } = useAuth();

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        const image = await imageUpload(data.image[0])
        console.log(image)
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user)
                profileUpdate(data.name, image)
                    .then(() => {
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                            image: image,
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    reset()
                                    Swal.fire({
                                        title: 'Success',
                                        text: 'Sign Up Successfully',
                                        icon: 'success',
                                        confirmButtonText: 'Ok'
                                    })
                                    navigate("/")
                                }
                            })
                    })
                    .catch(error => {
                        console.log(error)
                    })

            })
            .catch(error => {
                console.log(error)
            })
    }


    const handleGoogleLogin = () => {
        googleSignIn()
            .then((result) => {
                console.log(result.user)
                const userInfo = {
                    name: result.user?.displayName,
                    email: result.user?.email,
                    image: result.user?.photoURL
                }
                axiosPublic.post('users', userInfo)
                    .then(res => {
                        console.log(res.data)
                        if (res.data) {
                            toast.success("login successful")
                            navigate(location?.state || "/")
                        }
                    })
            })
            .catch(() => {
                toast.error("invalid-credential")
            })
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
                            <a href="#" className="w-1/3 text-2xl pb-4 font-medium text-center text-gray-800 capitalize border-b-2 border-[#6F42C1] dark:border-blue-400 dark:text-white">
                                Join Now!
                            </a>
                        </div>
                        {/* user name */}
                        <div className="relative flex items-center mt-8">
                            <span className="absolute">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </span>

                            <input name="name" {...register("name", { required: true })} type="text" className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Username" required />
                        </div>
                        {errors.name && <span className="text-red-600">Name is required</span>}
                        {/* profile image  */}
                        <label htmlFor="dropzone-file" className="flex items-center mt-6">
                            <input name="image" {...register("image", { required: true })} type="file" className="file-input file-input-bordered file-input-info w-full" required />
                        </label>
                        {errors.image && <span className="text-red-600">Image is required</span>}


                        <div className="relative flex items-center mt-6">
                            <span className="absolute">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </span>

                            <input name="email" {...register("email", { required: true })} type="email" className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Email address" required />
                        </div>
                        {errors.email && <span className="text-red-600">Email is required</span>}

                        <div className="relative flex items-center mt-4">
                            <span className="absolute">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </span>

                            <input name="password" {...register("password", { required: true, minLength: 6, pattern: /(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z0-9]).{8,}$/ })} type="password" className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Password" required />
                        </div>
                        {errors.password?.type === 'required' && <span className="text-red-600">Password is required</span>}
                        {errors.password?.type === 'minLength' && <span className="text-red-600">Password should be minimum 6 character long</span>}
                        {errors.password?.type === 'pattern' && <span className="text-red-600">Password should be minimum one special character</span>}

                        <div className="mt-6">
                            <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#6F42C1] rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                Join Us
                            </button>

                            <p className="mt-4 text-center text-gray-600 dark:text-gray-400">or sign in with</p>

                            <a className="flex items-center justify-center px-6 py-3 mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg  hover:bg-gray-50 border-[#6F42C1]">
                                <svg className="w-6 h-6 mx-2" viewBox="0 0 40 40">
                                    <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#FFC107" />
                                    <path d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z" fill="#FF3D00" />
                                    <path d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z" fill="#4CAF50" />
                                    <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#1976D2" />
                                </svg>

                                <button onClick={handleGoogleLogin} className="mx-2">Sign in with Google</button>
                            </a>

                            <div className="mt-6 text-center ">
                                <Link to="/login" className="text-sm text-blue-500 hover:underline dark:text-blue-400">
                                    Already have an account?
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default JoinUs;