import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageRegCamp = () => {
    const axiosSecure = useAxiosSecure();

    const { data: regCamps, refetch } = useQuery({
        queryKey: ['regCamps'],
        queryFn: async () => {
            const res = await axiosSecure.get('/regCamps')
            return res.data;
        }
    })
    console.log(regCamps)

    const handleConfirm = async (id) => {
        const campRes = await axiosSecure.patch(`/regCamp/${id}`)
        console.log(campRes.data)
        if (campRes.data.modifiedCount > 0) {
            refetch()
            //show success popup
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `Confirmed successfully`,
                showConfirmButton: false,
                timer: 1500
            });
        }
    }


    return (
        <div className="p-2 md:p-10 rounded-lg min-h-screen">
            <div className="overflow-x-auto">
                <div className="space-y-3 mb-14 w-3/4 mx-auto">
                    <h2 className="text-3xl text-[#6F42C1] text-center font-bold">Manage Camps</h2>
                    <hr />
                    <p className="text-center text-gray-600">Welcome to the Manage Camps section. Here, you can view and manage all the camps in our system. Use the table below to see detailed information about each camp, including their current status and details. You can edit, update, or delete camp information as needed to keep everything up-to-date.</p>
                    <hr />
                </div>
                <table className="table">
                    {/* head */}
                    <thead className="bg-[#6F42C1] text-white">
                        <tr>
                            <th>#</th>
                            <th>Camp Name</th>
                            <th>Camp Fees</th>
                            <th>Participant Name</th>
                            <th>Payment status</th>
                            <th>Confirmation status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            regCamps?.map((camp, index) => <tr className="hover" key={camp._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <p>{camp.campName}</p>
                                    </div>
                                </td>
                                <td>
                                    ${camp.campFees}
                                </td>
                                <td>{camp.participantName}</td>
                                <td>
                                    {
                                        camp.paymentStatus === 'Paid' ? <p className="text-green-600">Paid</p> : <p className="text-red-600">Unpaid</p>
                                    }
                                </td>
                                <td>
                                    {
                                        camp.paymentStatus === 'Paid' ? <button onClick={() => handleConfirm(camp._id)} className="btn btn-xs text-white bg-red-600">{camp.confirmStatus}</button> : <button className="btn btn-xs text-white bg-green-600" disabled>{camp.confirmStatus}</button>
                                    }
                                </td>
                                <td>
                                    {
                                        camp.paymentStatus === 'Paid' && camp.confirmStatus === 'Confirmed' ? <button disabled className="btn btn-xs text-white bg-green-600">Cancel</button> : <button className="btn btn-xs text-white bg-red-600">Cancel</button>
                                    }
                                    
                                </td>

                            </tr>)
                        }

                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default ManageRegCamp;