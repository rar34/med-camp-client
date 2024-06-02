import PopularCamp from "../PopularCamp/PopularCamp";
import Banner from "./Banner";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PopularCamp></PopularCamp>
            <h2 className="text-5xl font-bold">this is home</h2>
        </div>
    );
};

export default Home;