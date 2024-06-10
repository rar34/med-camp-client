import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { GiConfirmed } from "react-icons/gi";
import { ImCross } from "react-icons/im";

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
        <div className="p-2 md:p-10 rounded-lg min-h-screen">
            <div className="overflow-x-auto">
                <div className="space-y-3 mb-14 w-3/4 mx-auto">
                    <h2 className="text-3xl text-[#6F42C1] text-center font-bold">Manage Registered Camps</h2>
                    <hr />
                    <p className="text-center text-gray-600">Welcome to the Manage Registered Camps section. Here, you can view and manage all the camps which are registered by participants. Used the table below to see detailed information about each camp, including their current payment status, confirmation status and details. You can update camp status to confirmed or cancel camp information as needed to keep everything up-to-date.</p>
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
                                        camp.paymentStatus === 'Paid' && camp.confirmStatus === 'Confirmed' ? <GiConfirmed className="text-3xl text-green-600" /> : <button onClick={()=>handleCancel(camp._id)} className="btn btn-xs text-white bg-red-600"><ImCross /></button>
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