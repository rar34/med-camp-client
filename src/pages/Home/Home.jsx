import FeedbackRatings from "../FeedbackRatings/FeedbackRatings";
import PopularCamp from "../PopularCamp/PopularCamp";
import Banner from "./Banner";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PopularCamp></PopularCamp>
            <FeedbackRatings></FeedbackRatings>
        </div>
    );
};

export default Home;