import { AiFillStar } from "react-icons/ai";
import { FaHeart } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useFavorites } from "./FavoritesContext";

function ComingSoonCard({ id, title, year, image, rating }) {
    const { favorites, addFavorite, removeFavorite } = useFavorites();
    const isFavorite = favorites.some(fav => fav.id === id);

    const handleFavoriteClick = () => {
        if (isFavorite) {
            removeFavorite(id);
        } else {
            addFavorite({ id, title, year, image, rating });
        }
    }

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden w-full sm:w-56 md:w-72 lg:w-80 transform transition-transform duration-200 min-w-[200px]">
            <div className="relative h-48 sm:h-64 md:h-80 lg:h-80">
                <img src={image} alt={title} className="w-full h-full object-cover" />
                <button className="absolute top-2 left-2 bg-white/70 hover:bg-white/90 text-white p-2 rounded-full shadow-lg" onClick={handleFavoriteClick}>
                    <FaHeart className={isFavorite ? "text-red-500" : "text-purple-500"} />
                </button>
            </div>
            <div className="p-4">
                <Link to={`/detail-movie/${id}`} className="font-semibold text-[#6100B1] hover:text-purple-500 transition-colors duration-200 text-lg truncate block">{title}</Link>
                <div className="flex justify-between items-center mt-2">
                    <span className="text-gray-600 text-sm">{year}</span>
                    <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                            <AiFillStar key={i} className={`text-yellow-400 ${i < rating ? 'opacity-100' : 'opacity-30'}`} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ComingSoonCard