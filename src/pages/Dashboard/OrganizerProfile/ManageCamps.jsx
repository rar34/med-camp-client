import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const ManageCamps = () => {

    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const { data: camps = [], refetch } = useQuery({
        queryKey: ['camps'],
        queryFn: async () => {
            const res = await axiosPublic.get('/camps');
            return res.data;
        }
    })


    const handleDeleteItem = (camp) => {
        // console.log(item)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/camps/${camp._id}`)
                console.log(res.data)
                if (res.data.deletedCount > 0) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                    refetch();
                }
            }
        });
    }
    return (
        <div className="bg-[#F5F5DC] p-2 md:p-10 rounded-lg min-h-screen">
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
                            <th>Healthcare Professional</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Location</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            camps?.map((camp, index) => <tr className="hover" key={camp._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <p>{camp.campName}</p>
                                    </div>
                                </td>
                                <td>
                                    {camp.healthcareProfessional}
                                </td>
                                <td>{camp.date}</td>
                                <td>{camp.time}</td>
                                <td>{camp.location}</td>
                                <td><Link to={`/dashboard/update-camp/${camp._id}`}><button className="text-green-600 text-xl"><FaEdit></FaEdit></button></Link></td>
                                <td><button onClick={() => handleDeleteItem(camp)} className="text-red-600 -ml-10 text-xl"><FaTrashAlt></FaTrashAlt></button></td>
                            </tr>)
                        }

                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default ManageCamps;