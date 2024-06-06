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
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className="bg-base-200">
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
                            camps?.map((camp, index) => <tr key={camp._id}>
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
                                <td><button onClick={() => handleDeleteItem(camp)} className="text-red-600 text-xl"><FaTrashAlt></FaTrashAlt></button></td>
                            </tr>)
                        }

                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default ManageCamps;