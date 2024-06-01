import { Navigation, Pagination, Scrollbar, A11y, EffectFade, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';


import img1 from "../../assets/banner/1.jpg"
import img2 from "../../assets/banner/2.jpg"
import img3 from "../../assets/banner/3.jpg"
import img4 from "../../assets/banner/4.jpg"
import img5 from "../../assets/banner/5.jpg"

const Banner = () => {

    return (
        <div className=' container mx-auto my-4 md:min-h-[700px] bg-cover'>
            <div>
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y, EffectFade, Autoplay]}
                    spaceBetween={50}
                    effect="fade"
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    scrollbar={{ draggable: true }}
                    loop={true}
                    autoplay={
                        { delay: 2000 }
                    }
                >
                    <SwiperSlide>
                        <div className="hero md:min-h-[750px]" style={{ backgroundImage: `url(${img1})` }}>
                            <div className="hero-overlay md:h-[750px] bg-opacity-70"></div>
                            <div className="hero-content text-neutral-content">
                                <div className="">
                                    <h1 className="mb-5 text-3xl md:text-5xl font-bold">Transforming Lives Through Comprehensive Healthcare</h1>
                                    <p className="mb-5">Meet Maria, a mother of three, whose life changed after attending our medical camp.
                                        Diagnosed with hypertension, she received timely treatment and education on
                                        managing her condition. Today, Maria leads a healthier, happier life, thanks to our
                                        dedicated team and comprehensive care.</p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="hero md:min-h-[750px]" style={{ backgroundImage: `url(${img2})` }}>
                            <div className="hero-overlay md:h-[750px] bg-opacity-70"></div>
                            <div className="hero-content text-neutral-content">
                                <div className="">
                                    <h1 className="mb-5 text-3xl md:text-5xl font-bold">Bringing Hope to Future Generations</h1>
                                    <p className="mb-5">In a remote village, our medical camp conducted health checkups for over 200 children.
                                        For many, it was their first-ever medical examination. Early detection of health issues
                                        and providing necessary vaccinations have paved the way for a healthier future for these
                                        children.</p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="hero md:min-h-[750px]" style={{ backgroundImage: `url(${img3})` }}>
                            <div className="hero-overlay md:h-[750px] bg-opacity-70"></div>
                            <div className="hero-content text-neutral-content">
                                <div className="">
                                    <h1 className="mb-5 text-3xl md:text-5xl font-bold">Life-changing Surgeries for Those in Need</h1>
                                    <p className="mb-5">John, a farmer, had been suffering from a debilitating hernia for years. Our medical
                                        camp provided him with the much-needed surgery free of cost. Now, John is back to
                                        working in his fields and supporting his family, pain-free and full of gratitude.</p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="hero md:min-h-[750px]" style={{ backgroundImage: `url(${img4})` }}>
                            <div className="hero-overlay md:h-[750px] bg-opacity-70"></div>
                            <div className="hero-content text-neutral-content">
                                <div className="">
                                    <h1 className="mb-5 text-3xl md:text-5xl font-bold">Stronger Together: Community and Healthcare</h1>
                                    <p className="mb-5">Our success is a testament to the power of community collaboration. From local
                                        volunteers to international doctors, everyone played a crucial role. This camp not only
                                        provided medical aid but also strengthened community bonds, fostering a spirit of
                                        cooperation and mutual support.</p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="hero md:min-h-[750px]" style={{ backgroundImage: `url(${img5})` }}>
                            <div className="hero-overlay md:h-[750px] bg-opacity-70"></div>
                            <div className="hero-content text-neutral-content">
                                <div className="">
                                    <h1 className="mb-5 text-3xl md:text-5xl font-bold">Gratitude and New Beginnings</h1>
                                    <p className="mb-5">‘I can’t express how thankful I am,’ says Sarah, a beneficiary of our recent medical camp.
                                        Diagnosed with diabetes, she received medication and ongoing support. Sarah’s story is
                                        one of many, showcasing the lasting impact of our medical camps on individuals and
                                        families alike.</p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>

                </Swiper>
            </div>
        </div >
    );
};

export default Banner;