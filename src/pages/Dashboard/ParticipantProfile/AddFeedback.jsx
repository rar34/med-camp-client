import '@smastrom/react-rating/style.css'
import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import './Feedback.css'
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';


const AddFeedback = () => {
    const [ratings, setRatings] = useState(null);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const { id } = useParams();
    console.log(id)
    
    const { data: regCamp = {} } = useQuery({
        queryKey: ['reviewCamp', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/regCamp/${id}`)
            return res.data;
        }
    })
    console.log(regCamp)


    const handleSubmit = async(e) => {
        e.preventDefault();
        const form = e.target;
        const reviewText = form.review.value;
        const review = {
            reviewText, ratings, campName: regCamp.campName, name: regCamp.participantName
        }
        
        const reviewRes = await axiosPublic.post("/reviews", review)
        console.log(reviewRes.data)
        if (reviewRes.data.insertedId) {
            form.reset();
            navigate('/dashboard/analytics')
            //show success popup
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Review has been added",
                showConfirmButton: false,
                timer: 1500
            });
        }

    }

    console.log(ratings)

    return (
        <div>
            <h2 className="text-3xl text-[#6F42C1] font-bold text-center">Provide your feedback and ratings</h2>
            <div className='w-full md:w-3/4'>

                <form onSubmit={handleSubmit}>
                    <div className='flex'>
                        {
                            [...Array(5)].map((star, index) => {
                                const currentRatings = index + 1;
                                return (
                                    <label key={index}>
                                        <input type="radio" name='rating' value={currentRatings} onClick={() => setRatings(currentRatings)} required />

                                        <FaStar className='star' size={50}
                                            color={currentRatings <= (ratings) ? '#ffc107' : '#e4d5d9'}
                                        />
                                    </label>
                                )
                            })
                        }

                    </div>
                    <textarea name='review' className="textarea w-full my-6 textarea-primary" placeholder="Enter you review"></textarea>
                    <input className='btn bg-[#6F42C1] text-white font-semibold' type="submit" value="Add Review" required />
                </form>
            </div>

        </div>
    );
};

export default AddFeedback;