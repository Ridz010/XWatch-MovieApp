import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import ComingSoonCard from './ComingSoonCard';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function ComingSoon() {
    const [upComing, setUpComing] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const sliderRef = useRef(null);

    useEffect(() => {
        const fetchUpComing = async () => {
            try {
                const response = await axios.get('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', {
                    params: {
                        language: 'en-US'
                    },
                    headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MDNhYTRkYzljMGYxZTQxNTJjMmY2MDAyMjljNjlhYiIsIm5iZiI6MTcyMzQyODUwNi41NzkyNTEsInN1YiI6IjY2MWI1ZTExYzFmZmJkMDE5MDgzMDE2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Jdx9w-X1LDxOXvGLXlfHuomwsRRqT3sH6Y74ZkRnuQk'
                    }
                });
                setUpComing(response.data.results);
            } catch (error) {
                console.error("Error fetching upcoming movies:", error);
            }
        }

        fetchUpComing();
    }, []);

    const slideLeft = () => {
        setCurrentIndex(prevIndex =>
            prevIndex === 0 ? Math.max(upComing.length - 3, 0) : prevIndex - 1
        );
    }

    const slideRight = () => {
        setCurrentIndex(prevIndex =>
            prevIndex === upComing.length - 3 ? 0 : prevIndex + 1
        );
    }

    return (
        <>
            <div className="mt-5">
                <h1 className="text-2xl text-[#6100B1] font-bold">Coming Soon</h1>
                <hr className="w-20 border-[#6100B1]" />
            </div>
            <div className="mt-5">
                <div className="relative">
                    <div ref={sliderRef} className='flex justify-center space-x-6 overflow-hidden'>
                        {upComing.slice(currentIndex, currentIndex + 3).map(comingsoon => (
                            <ComingSoonCard
                                key={comingsoon.id}
                                id={comingsoon.id}
                                title={comingsoon.original_title}
                                year={new Date(comingsoon.release_date).getFullYear()}
                                image={`https://image.tmdb.org/t/p/w500${comingsoon.poster_path}`}
                                rating={Math.round(comingsoon.vote_average / 2)}
                            />
                        ))}
                    </div>
                    <button
                        className='absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white/90 p-2 rounded-full shadow-md'
                        onClick={slideLeft}
                    >
                        <FaChevronLeft className='text-[#6100B1]' />
                    </button>
                    <button
                        className='absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white/90 p-2 rounded-full shadow-md'
                        onClick={slideRight}
                    >
                        <FaChevronRight className='text-[#6100B1]' />
                    </button>
                </div>
            </div>
        </>
    )
}

export default ComingSoon;
