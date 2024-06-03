import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <section className="bg-white dark:bg-gray-900 ">
            <div className="container flex items-center min-h-screen px-6 py-12 mx-auto">
                <div className="flex flex-col items-center max-w-sm mx-auto text-center">
                    <p className="p-3 text-4xl font-bold text-red-600 rounded-full bg-blue-50 dark:bg-gray-800">
                        Error 404 
                    </p>
                    <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">Page not found</h1>
                    <p className="mt-4 text-gray-500 dark:text-gray-400">The page you are looking for does not exist. Here are some helpful links:</p>

                    <div className="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
                        <Link to="/"><button className="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-[#6F42C1] rounded-lg shrink-0 sm:w-auto">
                            Take me home
                        </button></Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ErrorPage;