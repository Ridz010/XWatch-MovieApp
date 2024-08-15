import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
    FaHeart, FaCalendarAlt, FaClock, FaLanguage, FaStar,
    FaMoneyBillWave, FaGlobe
} from 'react-icons/fa';
import { useFavorites } from "../components/FavoritesContext";

function DetailMovie() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const { favorites, addFavorite, removeFavorite } = useFavorites();
    const isFavorite = favorites.some(fav => fav.id === id);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, {
                    headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MDNhYTRkYzljMGYxZTQxNTJjMmY2MDAyMjljNjlhYiIsIm5iZiI6MTcyMzQyODUwNi41NzkyNTEsInN1YiI6IjY2MWI1ZTExYzFmZmJkMDE5MDgzMDE2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Jdx9w-X1LDxOXvGLXlfHuomwsRRqT3sH6Y74ZkRnuQk' // Replace with your API key
                    }
                });
                setMovie(response.data);
            } catch (error) {
                console.error("Error fetching movie details:", error);
            }
        };

        fetchMovieDetails();
    }, [id]);

    const handleFavoriteClick = () => {
        if (isFavorite) {
            removeFavorite(id);
        } else {
            addFavorite({
                id: movie.id,
                title: movie.title,
                image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                year: movie.release_date.split('-')[0],
                rating: Math.round(movie.vote_average / 2)
            });
        }
    };

    if (!movie) {
        return null;
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex items-center px-4 py-8 sm:px-6 md:px-8 lg:px-10"
        >
            <div className="container mx-auto">
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white overflow-hidden"
                >
                    <div className="flex flex-col md:flex-row">
                        <motion.div
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="md:flex-shrink-0"
                        >
                            <img
                                className="w-full h-80 object-cover md:w-96 md:h-auto rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                            />
                        </motion.div>
                        <div className="p-4 md:p-8 w-full">
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="uppercase tracking-wide text-sm text-[#6100B1] font-semibold"
                            >
                                {movie.tagline}
                            </motion.div>
                            <motion.h1
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="block mt-1 text-2xl sm:text-3xl md:text-4xl leading-tight font-bold text-[#6100B1]"
                            >
                                {movie.title}
                            </motion.h1>
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                                className="mt-2 flex items-center"
                            >
                                <FaStar className="text-yellow-400 mr-2" />
                                <span className="text-gray-600 text-lg">
                                    {movie.vote_average.toFixed(1)} ({movie.vote_count} votes)
                                </span>
                            </motion.div>
                            <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.6 }}
                                className="mt-4 text-gray-700 text-base leading-relaxed"
                            >
                                {movie.overview}
                            </motion.p>
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.7 }}
                                className="mt-6 flex flex-wrap gap-2"
                            >
                                {movie.genres.map((genre) => (
                                    <motion.span
                                        key={genre.id}
                                        whileHover={{ scale: 1.05 }}
                                        className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium"
                                    >
                                        {genre.name}
                                    </motion.span>
                                ))}
                            </motion.div>
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.8 }}
                                className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
                            >
                                <div className="flex items-center text-gray-600">
                                    <FaCalendarAlt className="mr-3 text-xl text-[#6100B1]" />
                                    <span className="text-base md:text-lg">Release: {movie.release_date}</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <FaClock className="mr-3 text-xl text-[#6100B1]" />
                                    <span className="text-base md:text-lg">Runtime: {movie.runtime} min</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <FaLanguage className="mr-3 text-xl text-[#6100B1]" />
                                    <span className="text-base md:text-lg">Language: {movie.original_language.toUpperCase()}</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <FaMoneyBillWave className="mr-3 text-xl text-[#6100B1]" />
                                    <span className="text-base md:text-lg">Budget: ${movie.budget.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <FaGlobe className="mr-3 text-xl text-[#6100B1]" />
                                    <span className="text-base md:text-lg">Status: {movie.status}</span>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.9 }}
                                className="mt-8"
                            >
                                <h2 className="text-xl sm:text-2xl font-semibold text-[#6100B1] mb-4">Production Companies</h2>
                                <div className="flex flex-wrap gap-6">
                                    {movie.production_companies.map((company) => (
                                        <motion.div
                                            key={company.id}
                                            whileHover={{ scale: 1.05 }}
                                            className="flex items-center space-x-4"
                                        >
                                            {company.logo_path && (
                                                <img
                                                    src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                                                    alt={company.name}
                                                    className="w-16 h-16 object-contain"
                                                />
                                            )}
                                            <div>
                                                <span className="font-medium text-lg text-gray-700">
                                                    {company.name}
                                                </span>
                                                {company.origin_country && (
                                                    <span className="text-sm text-gray-500"> ({company.origin_country})</span>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Production Countries */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 1 }}
                                className="mt-8"
                            >
                                <h2 className="text-xl sm:text-2xl font-semibold text-[#6100B1] mb-4">Production Countries</h2>
                                <ul className="space-y-2">
                                    {movie.production_countries.map((country, index) => (
                                        <motion.li
                                            key={index}
                                            initial={{ x: -20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ duration: 0.3, delay: 1 + index * 0.1 }}
                                            className="text-base md:text-lg font-medium text-gray-700"
                                        >
                                            {country.name}
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>

                            <motion.button
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 1.1 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleFavoriteClick}
                                className={`mt-8 flex items-center ${isFavorite ? 'bg-red-500' : 'bg-[#6100B1]'} text-white px-8 py-3 rounded-full hover:bg-opacity-90 transition duration-300 text-base md:text-lg font-medium`}
                                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                            >
                                <FaHeart className="mr-3" />
                                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}

export default DetailMovie;
