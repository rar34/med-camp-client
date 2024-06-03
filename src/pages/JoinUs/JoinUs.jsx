import { useNavigate } from "react-router-dom";
// import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
// import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";

const JoinUs = () => {
    const navigate = useNavigate()
    // const axiosPublic = useAxiosPublic();
    const { createUser, profileUpdate } = useAuth();

    const handleSubmit = async e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const image = form.image.files[0];
        const password = form.password.value;

        const formData = new FormData();
        formData.append('image', image);



        try {
            // save image into imgbb
            const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, formData)

            console.log(data.data.display_url)
            // create user
            const result = await createUser(email, password);
            console.log(result)
            await profileUpdate(name, data.data.display_url)
            Swal.fire({
                title: 'Success',
                text: 'Sign Up Successfully',
                icon: 'success',
                confirmButtonText: 'Ok'
            })
            navigate("/")

        }
        catch (err) {
            console.log(err)
        }
    }

    // const { register, handleSubmit, reset, formState: { errors } } = useForm();

    // const onSubmit = (data) => {
    //     createUser(data.email, data.password)
    //         .then(result => {
    //             const user = result.user;
    //             console.log(user)
    //             profileUpdate(data.name, data.photoURL)
    //                 .then(() => {
    //                     const userInfo = {
    //                         name: data.name,
    //                         email: data.email
    //                     }
    //                     axiosPublic.post('/users', userInfo)
    //                         .then(res => {
    //                             if (res.data.insertedId) {
    //                                 reset()
    // Swal.fire({
    //     title: 'Success',
    //     text: 'Sign Up Successfully',
    //     icon: 'success',
    //     confirmButtonText: 'Ok'
    // })
    // navigate("/")
    //                             }
    //                         })


    //                 })
    //                 .catch(error => {
    //                     console.log(error)
    //                 })

    //         })
    //         .catch(error => {
    //             console.log(error)
    //         })
    // }

    return (
        <div>
            <section className="bg-[#F5F5DC]">
                <div className="container flex items-center justify-center py-20 px-6 mx-auto">
                    <form onSubmit={handleSubmit} className="w-full border-2 border-[#6F42C1] p-10 rounded-xl shadow-xl max-w-md">
                        <div className="flex justify-center mx-auto">
                            <img className="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt="" />
                        </div>

                        <div className="flex items-center justify-center mt-6">
                            <a href="#" className="w-1/3 pb-4 font-medium text-center text-gray-800 capitalize border-b-2 border-[#6F42C1] dark:border-blue-400 dark:text-white">
                                Join Now!
                            </a>
                        </div>

                        <div className="relative flex items-center mt-8">
                            <span className="absolute">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </span>

                            <input name="name" type="text" className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Username" required />
                        </div>

                        <label htmlFor="dropzone-file" className="flex items-center mt-6">


                            <input name="image" type="file" className="file-input file-input-bordered file-input-info w-full" required />
                        </label>


                        <div className="relative flex items-center mt-6">
                            <span className="absolute">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </span>

                            <input name="email" type="email" className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Email address" required />
                        </div>

                        <div className="relative flex items-center mt-4">
                            <span className="absolute">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </span>

                            <input name="password" type="password" className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Password" required />
                        </div>

                        <div className="mt-6">
                            <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#6F42C1] rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                Join Us
                            </button>

                            <div className="mt-6 text-center ">
                                <a href="#" className="text-sm text-blue-500 hover:underline dark:text-blue-400">
                                    Already have an account?
                                </a>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default JoinUs;