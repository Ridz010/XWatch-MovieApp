import ComingSoon from "../components/ComingSoon";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Trending from "../components/Trending";

function Home() {
    return (
        <div className="p-1">
            <Navbar />
            <Hero />
            <Trending />
            <ComingSoon />
        </div>
    )
}

export default Home;