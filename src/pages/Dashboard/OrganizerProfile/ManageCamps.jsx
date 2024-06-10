import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { useState } from "react";

const ManageCamps = () => {
    const [searchText, setSearchText] = useState('');
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

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchText(query);
    };

    const filteredCamps = camps.filter(camp =>
        camp?.campName.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div className="p-2 md:p-10 rounded-lg min-h-screen">
            <div className="overflow-x-auto">
                <div className="space-y-3 mb-14 w-3/4 mx-auto">
                    <h2 className="text-3xl text-[#6F42C1] text-center font-bold">Manage Camps</h2>
                    <hr />
                    <p className="text-center text-gray-600">Welcome to the Manage Camps section. Here, you can view and manage all the camps in our system. Use the table below to see detailed information about each camp, including their current status and details. You can edit, update, or delete camp information as needed to keep everything up-to-date.</p>
                    <hr />
                </div>
                <div className="flex justify-center my-10">
                    <label className="input rounded-none rounded-l-lg input-bordered flex items-center gap-2">
                        <input value={searchText} onChange={handleSearchChange} name="searchText" type="text" className="grow" placeholder="Search your camp" />
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                    </label>
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
                            filteredCamps?.map((camp, index) => <tr className="hover" key={camp._id}>
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