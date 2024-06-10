import FeedbackRatings from "../FeedbackRatings/FeedbackRatings";
import PopularCamp from "../PopularCamp/PopularCamp";
import Banner from "./Banner";
import GetApp from "./GetApp";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PopularCamp></PopularCamp>
            <FeedbackRatings></FeedbackRatings>
            <GetApp></GetApp>
        </div>
    );
};

export default Home;