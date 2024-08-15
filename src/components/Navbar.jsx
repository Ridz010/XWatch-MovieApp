import { FaSearch } from 'react-icons/fa';
import { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import SearchResults from "./SearchResults";
import axios from "axios";
import { debounce } from 'lodash';

function Navbar() {
    const [activeItem, setActiveItem] = useState('Movies');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [genres, setGenres] = useState({});

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await axios.get('https://api.themoviedb.org/3/genre/movie/list', {
                    headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MDNhYTRkYzljMGYxZTQxNTJjMmY2MDAyMjljNjlhYiIsIm5iZiI6MTcyMzQyODUwNi41NzkyNTEsInN1YiI6IjY2MWI1ZTExYzFmZmJkMDE5MDgzMDE2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Jdx9w-X1LDxOXvGLXlfHuomwsRRqT3sH6Y74ZkRnuQk'
                    }
                });
                const genreMap = response.data.genres.reduce((acc, genre) => {
                    acc[genre.id] = genre.name;
                    return acc;
                }, {});
                setGenres(genreMap);
            } catch (error) {
                console.error("Error fetching genres:", error);
            }
        };

        fetchGenres();
    }, []);

    const fetchSearchResults = async (query) => {
        if (query.trim() === '') {
            setShowResults(false);
            return;
        }

        try {
            const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
                params: {
                    query: query,
                    language: 'en-US',
                    page: 1
                },
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MDNhYTRkYzljMGYxZTQxNTJjMmY2MDAyMjljNjlhYiIsIm5iZiI6MTcyMzQyODUwNi41NzkyNTEsInN1YiI6IjY2MWI1ZTExYzFmZmJkMDE5MDgzMDE2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Jdx9w-X1LDxOXvGLXlfHuomwsRRqT3sH6Y74ZkRnuQk'
                }
            });
            setSearchResults(response.data.results);
            setShowResults(true);
        } catch (error) {
            console.error("Error searching movies:", error);
        }
    };

    const debouncedSearch = debounce((query) => fetchSearchResults(query), 500);

    const handleInputChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        debouncedSearch(query);
    };

    return (
        <motion.nav
            className="bg-white shadow-md p-4 rounded-b-3xl sticky top-0 z-40"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
        >
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                    <a
                        href="#"
                        onClick={() => setActiveItem('Movies')}
                        className="relative text-[#6100B1] hover:text-purple-800 font-semibold text-xl"
                    >
                        Movies
                        <span className='absolute bottom-[-2px] left-0 w-full h-[2px] bg-purple-700 transition-all duration-500 transform'></span>
                    </a>
                </div>
                <div className="w-full md:w-auto">
                    <form className="relative">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={handleInputChange}
                            className="pl-10 pr-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-600 w-full md:w-64"
                        />
                        <button type="button" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <FaSearch />
                        </button>
                    </form>
                </div>
            </div>
            {showResults && (
                <SearchResults results={searchResults} onClose={() => setShowResults(false)} genres={genres} />
            )}
        </motion.nav>
    );
}

export default Navbar;
