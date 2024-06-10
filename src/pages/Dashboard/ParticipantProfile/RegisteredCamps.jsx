import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const RegisteredCamps = () => {

    const { user } = useAuth()
    const axiosSecure = useAxiosSecure();
    const { data: regCamps = [], refetch } = useQuery({
        queryKey: ['regCamps', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/regCamps/${user.email}`)
            return res.data;
        }
    })

    const handleCancel = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Cancel it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/regCamps/${id}`)
                console.log(res.data)
                if (res.data.deletedCount > 0) {
                    Swal.fire({
                        title: "Cancelled!",
                        text: "Your Camp has been cancelled from registered camp.",
                        icon: "success"
                    });
                    refetch();
                }
            }
        });
    }



    return (
        <div>
            <section className="container min-h-screen py-6 px-4 mx-auto">
                <div className="flex flex-col">
                    <h2 className="text-3xl text-[#6F42C1] text-center mb-8 font-bold">Registered Camps</h2>
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-[#6F42C1]">
                                        <tr className="text-white">
                                            <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right ">
                                                <div className="flex items-center gap-x-3">

                                                    <button className="flex items-center gap-x-2">
                                                        <span>Camp name</span>
                                                    </button>
                                                </div>
                                            </th>

                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right ">
                                                Camp Fees
                                            </th>

                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right ">
                                                Status
                                            </th>

                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right ">
                                                Participant Name
                                            </th>

                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right ">
                                                Confirmation Status
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right ">
                                                Cancel Button
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right ">
                                                Feedback Button
                                            </th>

                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                        {
                                            regCamps?.map(camp => <tr key={camp._id} >
                                                <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                                    <div className="inline-flex items-center gap-x-3">
                                                        <span>{camp.campName}</span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">${camp.campFees}</td>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                    <div className="inline-flex items-center px-3 py-1">
                                                        {
                                                            camp.paymentStatus === 'Paid' ? <button className="btn btn-sm bg-[#6F42C1] text-white" disabled>{camp.paymentStatus}</button> : <Link to={`/dashboard/payment/${camp._id}`}><button className="btn btn-sm bg-[#6F42C1] text-white">{camp.paymentStatus}</button> </Link>
                                                        }

                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                    <div className="flex items-center gap-x-2">
                                                        <div>
                                                            <h2 className="text-sm font-medium text-gray-800 dark:text-white ">{camp.participantName}</h2>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{camp.confirmStatus}</td>
                                                <td className="px-4 py-4 text-sm ">
                                                    {
                                                        camp.paymentStatus === 'Paid' ? <button className="btn btn-sm bg-[#6F42C1] text-white" disabled>Cancel</button> : <button onClick={() => handleCancel(camp._id)} className="btn btn-sm bg-[#6F42C1] text-white">Cancel</button>
                                                    }
                                                </td>
                                                <td className="px-4 py-4 text-sm text-green-600 whitespace-nowrap">
                                                    {
                                                        camp.confirmStatus === 'Confirmed' ? <button className="border-x-2 px-1">Feedback</button> :
                                                            <button disabled className="border-x-2 px-1">Feedback</button>

                                                    }
                                                </td>

                                            </tr>)
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default RegisteredCamps;