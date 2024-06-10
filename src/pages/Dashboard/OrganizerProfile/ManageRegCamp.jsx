import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageRegCamp = () => {
    const axiosSecure = useAxiosSecure();

    const { data: regCamps } = useQuery({
        queryKey: ['regCamps'],
        queryFn: async ()=>{
            const res = await axiosSecure.get('/regCamps')
            return res.data;
        }
    })
    console.log(regCamps)


    return (
        <div className="p-2 md:p-10 rounded-lg min-h-screen">
            <h2 className="text-3xl text-center font-bold text-[#6F42C1]">Manage Register Camp</h2>
        </div>
    );
};

export default ManageRegCamp;