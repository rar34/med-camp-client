import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const CheckoutForm = () => {
    const [error, setError] = useState('')
    const [clientSecret, setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState('')
    const stripe = useStripe();
    const { user } = useAuth();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    // const axiosPublic = useAxiosPublic();
    const { id } = useParams();
    const { data: regCamp = {} } = useQuery({
        queryKey: ['regCamp', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/regCamp/${id}`)
            return res.data;
        }
    })

    const fees = regCamp.campFees;
    // console.log(fees)

    useEffect(() => {
        if (fees > 0) {
            axiosSecure.post('/create-payment-intent', { fees: fees })
                .then(res => {
                    // console.log(res.data.clientSecret)
                    setClientSecret(res.data.clientSecret)
                })
        }
    }, [axiosSecure, fees])


    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('Payment Error', error)
            setError(error.message)
        }
        else {
            console.log('Payment method', paymentMethod)
        }

        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })
        if (confirmError) {
            console.log('confirm error', confirmError)
        }
        else {
            console.log('payment intent', paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                // console.log('transaction id', paymentIntent.id)
                setTransactionId(paymentIntent.id)

                // now save the payment information in database
                const payments = {
                    campName: regCamp.campName,
                    fees: regCamp.campFees,
                    paymentStatus: 'Paid',
                    confirmStatus: 'Pending',
                    participantName: regCamp.participantName,
                    paymentId: regCamp.campId,
                    transactionId: paymentIntent.id
                }

                const res = await axiosSecure.post('/payments', payments)
                console.log(res)
            }
        }

    }

    return (
        <form className="my-10" onSubmit={handleSubmit}>
            <CardElement className="border p-4 border-[#6F42C1] rounded-md"
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className="btn px-10 bg-[#6F42C1] text-white my-4" type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            <p className="text-red-600">{error}</p>
            {transactionId && <p className="text-green-600"><span className="font-bold">Transaction Id:</span> {transactionId}</p>}
        </form>
    );
};

export default CheckoutForm;