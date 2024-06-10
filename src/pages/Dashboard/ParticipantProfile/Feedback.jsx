import { useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const Feedback = () => {
    const [rating, setRating] = useState(0);
    const [message, setMessage] = useState('');
    const axiosPublic = useAxiosPublic()

    const handleClick = (rate) => {
        setRating(rate);
        axiosPublic.post('/rate', { rating: rate })
            .then(response => {
                console.log(response.data)
                setMessage('Rating saved successfully');
            })
            .catch(error => {
                console.log(error)
                setMessage('Error saving rating');
            });
    };
    return (
        <div>
            <h1>Rate Us</h1>
            <div>
                {[1, 2, 3, 4, 5].map((rate) => (
                    <span
                        key={rate}
                        style={{
                            fontSize: '2rem',
                            cursor: 'pointer',
                            color: rate <= rating ? 'gold' : 'grey'
                        }}
                        onClick={() => handleClick(rate)}
                    >
                        ★
                    </span>
                ))}
            </div>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Feedback;
