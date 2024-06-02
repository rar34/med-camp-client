import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const AvailableCamp = () => {
    const axiosPublic = useAxiosPublic()

    const { data: availableCamps = [] } = useQuery({
        queryKey: ['camps'],
        queryFn: async () => {
            const res = await axiosPublic.get('/camps');
            return res.data;
        }
    })

    console.log(availableCamps)

    return (
        <div>

        </div>
    );
};

export default AvailableCamp;