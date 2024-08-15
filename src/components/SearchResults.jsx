import { Link } from 'react-router-dom';

function SearchResults({ results, onClose, genres }) {
    return (
        <div className="absolute top-full left-0 right-0 bg-white shadow-md rounded-b-lg max-h-96 overflow-y-auto">
            {results.length === 0 ? (
                <p className="p-4 text-center text-gray-500">No results found</p>
            ) : (
                <ul>
                    {results.map((movie) => (
                        <li key={movie.id} className="border-b last:border-b-0">
                            <Link
                                to={`/detail-movie/${movie.id}`}
                                className="flex items-center p-4 hover:bg-gray-100 transition duration-200"
                                onClick={onClose}
                            >
                                <img
                                    src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                                    alt={movie.title}
                                    className="w-12 h-18 object-cover rounded mr-4"
                                />
                                <div>
                                    <h3 className="font-semibold text-[#6100B1]">{movie.title}</h3>
                                    <p className="text-sm text-gray-500">
                                        {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {movie.genre_ids.map(id => genres[id]).join(', ')}
                                    </p>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default SearchResults;