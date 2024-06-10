import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const Payment = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();
    // console.log(id)
    
    const { data: regCamp = {} } = useQuery({
        queryKey: ['regCamp', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/regCamp/${id}`)
            return res.data;
        }
    })


    return (
        <div>
            <h2 className="text-3xl text-center my-6 font-bold text-[#6F42C1]">Please pay to continue</h2>
            <h3 className="text-2xl font-bold">Total fees: ${regCamp.campFees}</h3>
            <hr />
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;