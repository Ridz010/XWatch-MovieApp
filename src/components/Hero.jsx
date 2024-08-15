import React, { useState, useEffect } from 'react';
import { FaPlay, FaHeart } from 'react-icons/fa';
import { AiFillStar } from 'react-icons/ai';
import bgImage from '../assets/bg.png';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useFavorites } from "../components/FavoritesContext";

function Hero() {
    const [movies, setMovies] = useState([]);
    const [currentMovie, setCurrentMovie] = useState(null);
    const { favorites, addFavorite, removeFavorite } = useFavorites();

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get('https://api.themoviedb.org/4/account/661b5e11c1ffbd0190830169/movie/recommendations', {
                    params: {
                        page: 1,
                        language: 'en-US'
                    },
                    headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MDNhYTRkYzljMGYxZTQxNTJjMmY2MDAyMjljNjlhYiIsIm5iZiI6MTcyMzQyODUwNi41NzkyNTEsInN1YiI6IjY2MWI1ZTExYzFmZmJkMDE5MDgzMDE2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Jdx9w-X1LDxOXvGLXlfHuomwsRRqT3sH6Y74ZkRnuQk'
                    }
                });
                setMovies(response.data.results);
                if (response.data.results.length > 0) {
                    setCurrentMovie(response.data.results[0]);
                }
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };
        fetchMovies();
    }, []);

    const handleFavoriteClick = () => {
        if (currentMovie) {
            const isFavorite = favorites.some(fav => fav.id === currentMovie.id);
            if (isFavorite) {
                removeFavorite(currentMovie.id);
            } else {
                addFavorite({
                    id: currentMovie.id,
                    title: currentMovie.title,
                    image: `https://image.tmdb.org/t/p/original${currentMovie.poster_path}`,
                    year: currentMovie.release_date.split('-')[0],
                    rating: Math.round(currentMovie.vote_average / 2)
                });
            }
        }
    };

    const isFavorite = currentMovie ? favorites.some(fav => fav.id === currentMovie.id) : false;

    return (
        <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-3xl overflow-hidden mt-6">
            <motion.div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${currentMovie ? `https://image.tmdb.org/t/p/original${currentMovie.poster_path}` : bgImage})` }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
            </motion.div>

            <motion.div
                className="relative z-10 text-white p-4 sm:p-8 md:p-12 flex flex-col justify-end h-full"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                <Link
                    to={currentMovie ? `/detail-movie/${currentMovie.id}` : '#'}
                    className="relative text-xl sm:text-2xl md:text-4xl font-bold mb-2 text-white hover:underline transition-colors duration-300 group"
                >
                    {currentMovie ? currentMovie.title : 'House of Wealth'}
                </Link>
                <div className="flex items-center space-x-4 mb-4">
                    <span className="text-xs sm:text-sm">{currentMovie ? currentMovie.overview : '2022 | Comedy horror | 1 Season'}</span>
                </div>
                <div className="flex items-center space-x-4">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        className="bg-[#6100B1] hover:bg-purple-800 text-white font-semibold py-1 px-3 sm:py-2 sm:px-6 rounded-lg flex items-center text-xs sm:text-sm"
                    >
                        <FaPlay className="mr-2" /> Trailer
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={handleFavoriteClick}
                        className={`${isFavorite ? 'bg-red-500 hover:bg-red-600' : 'bg-white hover:bg-white/90'} text-purple-600 font-bold p-1 sm:p-2 rounded-lg flex items-center`}
                    >
                        <FaHeart className={isFavorite ? 'text-white' : ''} />
                    </motion.button>
                    <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: i * 0.2, duration: 0.4, ease: "easeOut" }}
                            >
                                <AiFillStar className={`text-yellow-400 ${i < 5 ? 'opacity-100' : 'opacity-30'} text-sm sm:text-base`} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default Hero;