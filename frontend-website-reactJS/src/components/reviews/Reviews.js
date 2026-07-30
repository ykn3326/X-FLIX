import { useEffect, useRef, useState } from 'react';
import api from '../../api/axiosConfig';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import ReviewForm from '../reviewForm/ReviewForm';

const Reviews = ({ getMovieData, movie, reviews, setReviews }) => {

    const revText = useRef();
    const [rating, setRating] = useState(5);

    let params = useParams();
    const movieId = params.movieId;

    useEffect(() => {
        getMovieData(movieId);
    }, []);

    const addReview = async (e) => {

        e.preventDefault();

        const rev = revText.current;

        try {

            await api.post("/api/v1/reviews", {
                reviewBody: rev.value,
                rating: rating,
                imdbId: movieId
            });

            const updatedReviews = [
                ...reviews,
                {
                    body: rev.value,
                    rating: rating,
                    created: new Date(),
                    movieTitle: movie?.title,
                    imdbId: movieId
                }
            ];

            rev.value = "";
            setRating(5);

            setReviews(updatedReviews);

        } catch (err) {
            console.error(err);
        }

    };

    const averageRating =
        reviews && reviews.length > 0
            ? (
                reviews.reduce(
                    (sum, review) =>
                        sum + (review.rating || 0),
                    0
                ) / reviews.length
            ).toFixed(1)
            : "0.0";

    return (

        <Container>

            <Row>
                <Col>
                    <h3>Reviews</h3>
                </Col>
            </Row>

            <Row className="mt-2">

                <Col md={4}>

                    <img
                        src={movie?.poster}
                        alt={movie?.title}
                        style={{
                            width: "100%",
                            borderRadius: "10px"
                        }}
                    />

                </Col>

                <Col md={8}>

                    <Row className="mb-4">

                        <Col>

                            <div
                                style={{
                                    background: "#222",
                                    padding: "20px",
                                    borderRadius: "10px",
                                    textAlign: "center"
                                }}
                            >

                                <h2 style={{ color: "gold" }}>
                                    ⭐ {averageRating} / 5
                                </h2>

                                <h5 style={{ color: "white" }}>
                                    Based on {reviews.length} Review{reviews.length !== 1 ? "s" : ""}
                                </h5>

                            </div>

                        </Col>

                    </Row>

                    <ReviewForm
                        handleSubmit={addReview}
                        revText={revText}
                        labelText="Write a Review?"
                        rating={rating}
                        setRating={setRating}
                    />

                    <Row>
                        <Col>
                            <hr />
                        </Col>
                    </Row>

                    {
                        reviews?.map((r, index) => (

                            <div key={index}><Row>

                                    <Col>

                                        <div
                                            style={{
                                                color: "gold",
                                                fontSize: "24px"
                                            }}
                                        >
                                            {"★".repeat(r.rating || 0)}
                                            {"☆".repeat(5 - (r.rating || 0))}
                                        </div>

                                        <div
                                            style={{
                                                fontSize: "20px",
                                                color: "white",
                                                marginTop: "5px"
                                            }}
                                        >
                                            {r.body}
                                        </div>

                                        <small
                                            style={{
                                                color: "#999"
                                            }}
                                        >
                                            {
                                                r.created
                                                    ? new Date(r.created).toLocaleDateString()
                                                    : ""
                                            }
                                        </small>

                                    </Col>

                                </Row>

                                <Row>

                                    <Col>
                                        <hr />
                                    </Col>

                                </Row>

                            </div>

                        ))
                    }

                </Col>

            </Row>

        </Container>

    );

}

export default Reviews;