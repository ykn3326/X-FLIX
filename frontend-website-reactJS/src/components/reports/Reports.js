import { useEffect, useState } from "react";
import api from "../../api/axiosConfig";
import "./Reports.css";

const Reports = () => {

    const [report, setReport] = useState(null);

    useEffect(() => {
        api.get("/api/v1/reports")
            .then((res) => setReport(res.data))
            .catch((err) => console.log(err));
    }, []);

    if (!report) {
        return (
            <div className="reports-container">
                <h2>Loading Reports...</h2>
            </div>
        );
    }

    return (
        <div className="reports-container">

            <h1>Movie Analytics Dashboard</h1>

            <div className="cards">

                <div className="card">
                    <h3>Total Movies</h3>
                    <h2>{report.totalMovies}</h2>
                </div>

                <div className="card">
                    <h3>Total Reviews</h3>
                    <h2>{report.totalReviews}</h2>
                </div>

                <div className="card">
                    <h3>Average Rating</h3>
                    <h2>{Number(report.averageRating).toFixed(2)}</h2>
                </div>

            </div>

            <div className="section">
                <h2>Movies By Genre</h2>

                <table>

                    <thead>
                        <tr>
                            <th>Genre</th>
                            <th>Movies</th>
                        </tr>
                    </thead>

                    <tbody>
                        {report.moviesByGenre &&
                            Object.entries(report.moviesByGenre).map(([genre, count]) => (
                                <tr key={genre}>
                                    <td>{genre}</td>
                                    <td>{count}</td>
                                </tr>
                            ))}
                    </tbody>

                </table>
            </div>

            <div className="section">

                <h2>Top Rated Movies</h2>

                <table>

                    <thead>
                        <tr>
                            <th>Movie</th>
                            <th>Average Rating</th>
                        </tr>
                    </thead>

                    <tbody>
                        {report.topRatedMovies &&
                            report.topRatedMovies.map((movie, index) => (
                                <tr key={index}>
                                    <td>{movie.title}</td>
                                    <td>{movie.averageRating.toFixed(2)}</td>
                                </tr>
                            ))}
                    </tbody>

                </table>

            </div>

            <div className="section">

                <h2>Most Reviewed Movies</h2>

                <table>

                    <thead>
                        <tr>
                            <th>Movie</th>
                            <th>Reviews</th>
                        </tr>
                    </thead>

                    <tbody>
                        {report.mostReviewedMovies &&
                            report.mostReviewedMovies.map((movie, index) => (
                                <tr key={index}>
                                    <td>{movie.title}</td>
                                    <td>{movie.reviewCount}</td>
                                </tr>
                            ))}
                    </tbody>

                </table>

            </div>

        </div>
    );
};

export default Reports;