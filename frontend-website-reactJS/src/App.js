import './App.css';
import api from './api/axiosConfig';
import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import { Routes, Route } from 'react-router-dom';

import Home from './components/home/Home';
import Header from './components/header/Header';
import Trailer from './components/trailer/Trailer';
import Reviews from './components/reviews/Reviews';
import NotFound from './components/notFound/NotFound';
import Recommendations from './components/recommendations/Recommendations';
import WatchList from './components/watchList/WatchList';
import Reports from './components/reports/Reports';
import Trending from './components/trending/Trending';
import Dashboard from './components/dashboard/Dashboard';

function App() {

    const [movies, setMovies] = useState([]);
    const [movie, setMovie] = useState();
    const [reviews, setReviews] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const getMovies = async () => {

        try {
            const response = await api.get("/api/v1/movies");
            setMovies(response.data);
        }
        catch (err) {
            console.log(err);
        }

    };

    const getMovieData = async (movieId) => {

        try {

            const response = await api.get(`/api/v1/movies/${movieId}`);

            const singleMovie = response.data;

            setMovie(singleMovie);

            setReviews(singleMovie.reviews);

        }
        catch (error) {
            console.error(error);
        }

    };

    useEffect(() => {
        getMovies();
    }, []);

    return (

        <div className="App">

            <Header
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />

            <Routes>

                <Route path="/" element={<Layout />}>

                    <Route
                        index
                        element={
                            <Home
                                movies={movies}
                                searchTerm={searchTerm}
                            />
                        }
                    />

                    <Route
                        path="Trailer/:ytTrailerId"
                        element={<Trailer />}
                    />

                    <Route
                        path="Reviews/:movieId"
                        element={
                            <Reviews
                                getMovieData={getMovieData}
                                movie={movie}
                                reviews={reviews}
                                setReviews={setReviews}
                            />
                        }
                    />

                    <Route
                        path="Recommendations/:imdbId"
                        element={<Recommendations />}
                    />

                    <Route
                        path="watchList"
                        element={<WatchList />}
                    />

                    <Route
                        path="reports"
                        element={<Reports />}
                    />

                    <Route
                        path="trending"
                        element={<Trending />}
                    />

                    <Route
                        path="dashboard"
                        element={<Dashboard />}
                    />

                    <Route
                        path="*"
                        element={<NotFound />}
                    />

                </Route>

            </Routes>

        </div>

    );
}

export default App;