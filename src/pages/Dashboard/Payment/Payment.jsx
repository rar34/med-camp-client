import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useParams } from "react-router-dom";


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const Payment = () => {
    const {fee} = useParams()
    const fees = parseFloat(fee)
    // console.log(fees)

    
    return (
        <div>
            <h2 className="text-3xl text-center my-6 font-bold text-[#6F42C1]">Please pay to continue</h2>
            <h3 className="text-2xl font-bold">Total fees: ${fees}</h3>
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