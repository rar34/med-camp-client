import AvailableCamp from "../AvailableCamp/AvailableCamp";
import Banner from "./Banner";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <AvailableCamp></AvailableCamp>
            <h2 className="text-5xl font-bold">this is home</h2>
        </div>
    );
};

export default Home;