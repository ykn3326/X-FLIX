import { useEffect, useState } from "react";
import api from "../../api/axiosConfig";
import "./Trending.css";

const Trending = () => {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        getTrendingMovies();
    }, []);

    const getTrendingMovies = async () => {
        try {
            const response = await api.get("/api/v1/trending");
            setMovies(response.data.trendingMovies);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="trending-container">

            <h1 className="title">🔥 Trending Movies</h1>

            <div className="movie-grid">

                {movies.map((movie, index) => (

                    <div className="movie-card" key={movie.imdbId}>

                        <div className="rank">
                            #{index + 1}
                        </div>

                        <img
                            src={movie.poster}
                            alt={movie.title}
                        />

                        <h3>{movie.title}</h3>

                        <p>⭐ Rating : {movie.averageRating.toFixed(2)}</p>

                        <p>📝 Reviews : {movie.reviewCount}</p>

                        <p>🔥 Score : {movie.trendingScore.toFixed(2)}</p>

                    </div>

                ))}

            </div>

        </div>
    );
};

export default Trending;