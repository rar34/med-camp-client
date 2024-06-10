import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'


const FeedbackRatings = () => {
    const axiosPublic = useAxiosPublic();

    const { data: reviews = [] } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const res = await axiosPublic.get('/reviews')
            return res.data;
        }
    })

    console.log(reviews)

    return (
        <div className="bg-[#F5F5DC] my-16 py-10">
            <div className="my-14 container mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold text-center">Participant Reviews</h2>
                <div className="divider"></div>
                <Swiper navigation={true} modules={[Navigation]} className="mySwiper mt-10">

                    {
                        reviews?.map(review => <SwiperSlide key={review._id}>
                            <div className="px-2 md:px-10 text-center space-y-4">
                                <h3 className="text-2xl"><span className="font-bold">Camp Name:</span> {review?.campName}</h3>
                                
                                <h2 className="text-3xl"><span className="font-bold">By:</span> {review?.name}</h2>
                                <div className="flex items-center justify-center">
                                    <Rating
                                        style={{ maxWidth: 180 }}
                                        value={review?.rating}
                                        readOnly
                                    />
                                </div>
                                <p>{review?.reviewText}</p>
                            </div>
                        </SwiperSlide>)
                    }
                </Swiper>
            </div>
        </div>
    );
};

export default FeedbackRatings;