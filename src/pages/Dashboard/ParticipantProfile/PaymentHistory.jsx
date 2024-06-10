import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";

const PaymentHistory = () => {
    const [searchText, setSearchText] = useState('');
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: payments = [] } = useQuery({
        queryKey: ['payment', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user?.email}`)
            return res.data;
        }
    })

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchText(query);
    };

    const filteredCamps = payments.filter(payment =>
        payment?.campName.toLowerCase().includes(searchText.toLowerCase())
    );


    return (
        <section className="container min-h-screen py-6 px-4 mx-auto">
            <div className="flex flex-col">
                <h2 className="text-3xl text-[#6F42C1] text-center mb-8 font-bold">Payment History</h2>
                <div className="flex justify-center my-10">
                    <label className="input rounded-none rounded-l-lg input-bordered flex items-center gap-2">
                        <input value={searchText} onChange={handleSearchChange} name="searchText" type="text" className="grow" placeholder="Search your camp" />
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                    </label>
                </div>
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-[#6F42C1] text-white">
                                    <tr>
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
                                            Payment Status
                                        </th>

                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right ">
                                            Participant Name
                                        </th>

                                        {/* <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right ">
                                            Confirmation Status
                                        </th> */}

                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                    {
                                        filteredCamps?.map(payment => <tr key={payment._id}>
                                            <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                                <div className="inline-flex items-center gap-x-3">
                                                    <span>{payment.campName}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">${payment.fees}</td>
                                            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 dark:bg-gray-800">
                                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>

                                                    <h2 className="text-sm font-normal">{payment.paymentStatus}</h2>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                <div className="flex items-center gap-x-2">
                                                    <div>
                                                        <h2 className="text-sm font-medium text-gray-800 dark:text-white ">{payment.participantName}</h2>
                                                    </div>
                                                </div>
                                            </td>
                                            {/* <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{payment.confirmStatus}</td> */}
                                        </tr>)
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>


        </section>
    );
};

export default PaymentHistory;