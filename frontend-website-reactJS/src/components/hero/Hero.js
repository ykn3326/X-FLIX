import './Hero.css';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const Hero = ({ movies, searchTerm }) => {

    const navigate = useNavigate();

    function reviews(movieId) {
        navigate(`/Reviews/${movieId}`);
    }

    function recommendations(imdbId) {
        navigate(`/Recommendations/${imdbId}`);
    }

    const addToWatchList = (movie) => {

        let watchList = JSON.parse(localStorage.getItem("watchList")) || [];

        const exists = watchList.find(
            (m) => m.imdbId === movie.imdbId
        );

        if (exists) {
            alert("Movie is already in your Watch List!");
            return;
        }

        watchList.push(movie);

        localStorage.setItem(
            "watchList",
            JSON.stringify(watchList)
        );

        alert("❤️ Movie added to Watch List!");

    };

    if (!movies || movies.length === 0) {

        return (
            <div
                style={{
                    color: "white",
                    textAlign: "center",
                    marginTop: "50px"
                }}
            >
                Loading Movies...
            </div>
        );

    }

    const filteredMovies = movies.filter((movie) => {

        const search = searchTerm.toLowerCase();

        return (
            movie.title.toLowerCase().includes(search) ||
            movie.genres.some((genre) =>
                genre.toLowerCase().includes(search)
            )
        );

    });

    return (

        <div className="movie-carousel-container">

            {
                filteredMovies.length === 0 ? (

                    <div
                        style={{
                            color: "white",
                            textAlign: "center",
                            fontSize: "24px",
                            marginTop: "50px"
                        }}
                    >
                        No movies found.
                    </div>

                ) : (

                    <Carousel>

                        {

                            filteredMovies.map((movie) => {

                                const backdrop = movie.backdrops?.[0] || "";
                                const poster = movie.poster || "";
                                const trailer = movie.trailerLink || "";

                                return (

                                    <Paper key={movie.imdbId}><div className="movie-card-container">

                                            <div
                                                className="movie-card"
                                                style={{
                                                    backgroundImage: backdrop
                                                        ? `linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1)), url(${backdrop})`
                                                        : "none",
                                                    backgroundSize: "cover",
                                                    backgroundPosition: "center",
                                                    backgroundRepeat: "no-repeat"
                                                }}
                                            >

                                                <div className="movie-detail">

                                                    <div className="movie-poster">

                                                        <img
                                                            src={poster}
                                                            alt={movie.title}
                                                        />

                                                    </div>

                                                    <div className="movie-title">

                                                        <h4>{movie.title}</h4>

                                                    </div>

                                                    <div className="movie-buttons-container">

                                                        <Link
                                                            to={`/Trailer/${trailer.slice(-11)}`}
                                                        >

                                                            <div className="play-button-icon-container">

                                                                <FontAwesomeIcon
                                                                    className="play-button-icon"
                                                                    icon={faCirclePlay}
                                                                />

                                                            </div>

                                                        </Link>

                                                        <div className="movie-review-button-container">

                                                            <Button
                                                                variant="info"
                                                                onClick={() => reviews(movie.imdbId)}
                                                            >
                                                                Reviews
                                                            </Button>

                                                            <Button
                                                                variant="warning"
                                                                style={{ marginLeft: "10px" }}
                                                                onClick={() => recommendations(movie.imdbId)}
                                                            >
                                                                Recommendations
                                                            </Button>

                                                            <Button
                                                                variant="danger"
                                                                style={{ marginLeft: "10px" }}
                                                                onClick={() => addToWatchList(movie)}
                                                            >
                                                                ❤️ Watch List
                                                            </Button>

                                                        </div>

                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                    </Paper>);

                            })

                        }

                    </Carousel>

                )

            }

        </div>

    );

};

export default Hero;