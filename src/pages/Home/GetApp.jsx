import { FaApple } from "react-icons/fa";
import { IoLogoGooglePlaystore } from "react-icons/io5";

const GetApp = () => {
    return (
        <div className="my-10">
            <div className="container justify-between flex flex-col px-6 md:px-24 py-10 mx-auto space-y-6 lg:h-[32rem] lg:py-16 lg:flex-row lg:items-center">
                <div className="w-full lg:w-1/2">
                    <div className="lg:max-w-lg">
                        <h1 className="text-3xl font-semibold tracking-wide mb-4 text-[#6F42C1] lg:text-4xl">
                            DOWNLOAD & ENJOY
                        </h1>
                        <h1 className="text-5xl font-bold">Get the Camp On App</h1>
                        <p className="my-6">Search your desired camps and find the right fit. Simply
                            swipe right to apply.
                        </p>

                    </div>

                    <div className="flex gap-4">
                        <div className="flex gap-2 cursor-pointer bg-black text-white p-4 rounded-lg justify-center items-center">
                            <IoLogoGooglePlaystore className="text-4xl" />
                            <p>Get In On <br /> Google Play</p>
                        </div>
                        <div className="flex gap-2 cursor-pointer bg-black text-white p-4 rounded-lg justify-center items-center">
                            <FaApple className="text-4xl" />
                            <p>Get In On <br /> Apple Store</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-center w-full lg:w-1/2">
                    <img className="object-fit w-full h-full mx-auto rounded-md lg:max-w-2xl" src="https://i.ibb.co/XW6K1nR/getapp.jpg" alt="glasses photo" />
                </div>
            </div>
        </div>
    );
};

export default GetApp;