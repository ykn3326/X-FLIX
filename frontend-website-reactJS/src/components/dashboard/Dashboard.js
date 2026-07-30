import "./Dashboard.css";
import { useEffect, useState } from "react";
import api from "../../api/axiosConfig";

const Dashboard = () => {

    const [watchList, setWatchList] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState("0.0");
    const [favoriteGenre, setFavoriteGenre] = useState("Not Available");

    useEffect(() => {

        const savedWatchList =
            JSON.parse(localStorage.getItem("watchList")) || [];

        setWatchList(savedWatchList);

        loadReviews(savedWatchList);

        calculateFavoriteGenre(savedWatchList);

    }, []);

    const loadReviews = async (movies) => {

        try {

            let allReviews = [];

            for (const movie of movies) {

                const response = await api.get(
                    `/api/v1/movies/${movie.imdbId}`
                );

                const movieReviews =
                    response.data.reviews || [];

                const updated = movieReviews.map((review) => ({
                    ...review,
                    movieTitle: movie.title
                }));

                allReviews.push(...updated);

            }

            setReviews(allReviews);

            if (allReviews.length > 0) {

                const avg =
                    allReviews.reduce(
                        (sum, review) =>
                            sum + (review.rating || 0),
                        0
                    ) / allReviews.length;

                setAverageRating(avg.toFixed(1));

            }

        } catch (err) {

            console.log(err);

        }

    };

    const calculateFavoriteGenre = (movies) => {

        const genres = {};

        movies.forEach((movie) => {

            movie.genres.forEach((genre) => {

                genres[genre] =
                    (genres[genre] || 0) + 1;

            });

        });

        let fav = "Not Available";
        let max = 0;

        Object.keys(genres).forEach((genre) => {

            if (genres[genre] > max) {

                max = genres[genre];
                fav = genre;

            }

        });

        setFavoriteGenre(fav);

    };

    const recentReviews =
        [...reviews]
            .sort(
                (a, b) =>
                    new Date(b.created) -
                    new Date(a.created)
            )
            .slice(0, 5);

    const recentMovies =
        [...watchList].slice(-5).reverse();

    return (

        <div className="dashboard-container">

            <h1 className="dashboard-title">
                👤 User Dashboard
            </h1>

            <p className="dashboard-subtitle">
                Welcome Back!
            </p>

            <div className="dashboard-cards">

                <div className="dashboard-card">
                    <h2>❤️</h2>
                    <h3>Watch List</h3>
                    <p>{watchList.length} Movies</p>
                </div>

                <div className="dashboard-card">
                    <h2>⭐</h2>
                    <h3>Reviews</h3>
                    <p>{reviews.length} Reviews</p>
                </div>

                <div className="dashboard-card">
                    <h2>🌟</h2>
                    <h3>Average Rating</h3>
                    <p>{averageRating}</p>
                </div>

                <div className="dashboard-card">
                    <h2>🎭</h2>
                    <h3>Favorite Genre</h3>
                    <p>{favoriteGenre}</p>
                </div>

            </div>

            <div className="dashboard-section">

                <h2>📝 Recent Reviews</h2>

                {
                    recentReviews.length === 0 ? (

                        <div className="empty-box">
                            No reviews available.
                        </div>

                    ) : (

                        recentReviews.map((review, index) => (

                            <div
                                key={index}
                                className="review-item"
                            >

                                <h4>
                                    {review.movieTitle || "Movie"}
                                </h4>

                                <div
                                    style={{
                                        color: "gold",
                                        fontSize: "22px"
                                    }}
                                >
                                    {"★".repeat(review.rating || 0)}
                                    {"☆".repeat(5 - (review.rating || 0))}
                                </div>

                                <p>{review.body}</p>

                                <small>
                                    {
                                        review.created
                                            ? new Date(
                                                  review.created
                                              ).toLocaleDateString()
                                            : ""
                                    }
                                </small>

                                <hr />

                            </div>

                        ))

                    )

                }

            </div>

            <div className="dashboard-section">

                <h2>❤️ Recently Added Watch List Movies</h2>

                {
                    recentMovies.length === 0 ? (

                        <div className="empty-box">
                            No movies in Watch List.
                        </div>

                    ) : (

                        recentMovies.map((movie) => (

                            <div
                                key={movie.imdbId}
                                className="watch-item"
                            >

                                <strong>{movie.title}</strong>

                                <br />

                                <small>
                                    {movie.genres.join(", ")}
                                </small>

                                <hr />

                            </div>

                        ))

                    )

                }

            </div>

            <div className="dashboard-section">

                <h2>📊 Personal Statistics</h2>

                <ul className="stats-list">

                    <li>
                        Total Movies Reviewed : {reviews.length}
                    </li>

                    <li>
                        Total Movies Saved : {watchList.length}
                    </li>

                    <li>
                        Average Rating : {averageRating}
                    </li>

                    <li>
                        Favorite Genre : {favoriteGenre}
                    </li>

                </ul>

            </div>

        </div>

    );

};

export default Dashboard;