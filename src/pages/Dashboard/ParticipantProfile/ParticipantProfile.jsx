import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";

const ParticipantProfile = () => {

    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    console.log(user)
    const { data: users = [] } = useQuery({
        queryKey: ['users', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/users/${user?.email}`)
            return res.data;
        }
    })
    console.log(users)

    return (
        <div>
            <div className="flex flex-col items-center py-12 bg-[#F5F5DC] ">
                <div className="avatar flex-1">
                    <div className="w-96 h-96 border-4 rounded-full">
                        <img src={users?.image} />
                    </div>
                </div>
                <div className="card-body flex-1">
                    <h2 className="card-title"><span className="font-bold">Name:</span> {users?.name}</h2>
                    <p><span className="font-bold">Email:</span> {users?.email}</p>
                    {
                        users?.phone && <p><span className="font-bold">Phone:</span> {users?.phone}</p>
                    }
                    <div className="card-actions my-4 justify-center">
                        <Link to="/dashboard/update-participant-profile"><button className="btn bg-[#6F42C1] text-white">Edit profile</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ParticipantProfile;