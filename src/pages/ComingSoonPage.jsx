import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';
import { FaHeart, FaCalendarAlt } from 'react-icons/fa';
import { useFavorites } from '../components/FavoritesContext';

function ComingSoonPage() {
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const { favorites, addFavorite, removeFavorite } = useFavorites();

    useEffect(() => {
        const fetchUpcomingMovies = async () => {
            try {
                const response = await axios.get('https://api.themoviedb.org/3/movie/upcoming', {
                    params: {
                        language: 'en-US',
                        page: 1
                    },
                    headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MDNhYTRkYzljMGYxZTQxNTJjMmY2MDAyMjljNjlhYiIsIm5iZiI6MTcyMzQyODUwNi41NzkyNTEsInN1YiI6IjY2MWI1ZTExYzFmZmJkMDE5MDgzMDE2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Jdx9w-X1LDxOXvGLXlfHuomwsRRqT3sH6Y74ZkRnuQk'
                    }
                });
                setUpcomingMovies(response.data.results);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching upcoming movies:", error);
                setLoading(false);
            }
        };

        fetchUpcomingMovies();
    }, []);

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

    const handleFavoriteClick = (movie) => {
        const isFavorite = favorites.some(fav => fav.id === movie.id);
        if (isFavorite) {
            removeFavorite(movie.id);
        } else {
            addFavorite({
                id: movie.id,
                title: movie.title,
                year: new Date(movie.release_date).getFullYear(),
                image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                rating: Math.round(movie.vote_average / 2)
            });
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <motion.div
                    className="w-16 h-16 border-4 border-t-4 border-purple-500 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
            </div>
        );
    }

    return (
        <motion.div 
            className="container mx-auto px-4 py-8"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <h1 className="text-3xl font-bold text-[#6100B1] mb-6">Coming Soon</h1>
            <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-6"
                variants={containerVariants}
            >
                {upcomingMovies.map((movie) => (
                    <motion.div 
                        key={movie.id} 
                        className="bg-white rounded-xl shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-200"
                        variants={itemVariants}
                    >
                        <div className="relative h-64">
                            <img 
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                                alt={movie.title} 
                                className="w-full h-full object-cover"
                            />
                            <button
                                className="absolute top-2 right-2 bg-white/70 hover:bg-white/90 text-purple-500 p-2 rounded-full shadow-lg transition-colors duration-200"
                                onClick={() => handleFavoriteClick(movie)}
                            >
                                <FaHeart className={favorites.some(fav => fav.id === movie.id) ? "text-red-500" : "text-purple-500"} />
                            </button>
                        </div>
                        <div className="p-4">
                            <Link to={`/detail-movie/${movie.id}`} className="font-semibold text-[#6100B1] hover:text-purple-500 transition-colors duration-200 text-lg truncate block">
                                {movie.title}
                            </Link>
                            <div className="flex justify-between items-center mt-2">
                                <div className="flex items-center text-gray-600 text-sm">
                                    <FaCalendarAlt className="mr-1" />
                                    {new Date(movie.release_date).toLocaleDateString()}
                                </div>
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <AiFillStar key={i} className={`text-yellow-400 ${i < Math.round(movie.vote_average / 2) ? 'opacity-100' : 'opacity-30'}`} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
}

export default ComingSoonPage;