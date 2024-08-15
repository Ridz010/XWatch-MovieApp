// Favourites.jsx
import { useFavorites } from "../components/FavoritesContext";
import { AiFillStar } from "react-icons/ai";
import { FaHeart, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Favourites() {
    const { favorites, removeFavorite } = useFavorites();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    return (
        <motion.div
            className="container mx-auto px-4 py-8"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <h1 className="text-3xl font-bold text-[#6100B1] mb-6">My Favorites</h1>
            {favorites.length === 0 ? (
                <motion.p
                    className="text-gray-600 text-center text-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    You haven't added any favorites yet.
                </motion.p>
            ) : (
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    variants={containerVariants}
                >
                    {favorites.map((movie) => (
                        <motion.div
                            key={movie.id}
                            className="bg-white rounded-xl shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-200"
                            variants={itemVariants}
                        >
                            <div className="relative h-48 sm:h-64">
                                <img src={movie.image} alt={movie.title} className="w-full h-full object-cover" />
                                <button
                                    className="absolute top-2 right-2 bg-white/70 hover:bg-white/90 text-red-500 p-2 rounded-full shadow-lg transition-colors duration-200"
                                    onClick={() => removeFavorite(movie.id)}
                                >
                                    <FaTrash />
                                </button>
                            </div>
                            <div className="p-4">
                                <Link to={`/detail-movie/${movie.id}`} className="font-semibold text-[#6100B1] hover:text-purple-500 transition-colors duration-200 text-lg truncate block">
                                    {movie.title}
                                </Link>
                                <div className="flex justify-between items-center mt-2">
                                    <span className="text-gray-600 text-sm">{movie.year}</span>
                                    <div className="flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                            <AiFillStar key={i} className={`text-yellow-400 ${i < movie.rating ? 'opacity-100' : 'opacity-30'}`} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </motion.div>
    )
}

export default Favourites;