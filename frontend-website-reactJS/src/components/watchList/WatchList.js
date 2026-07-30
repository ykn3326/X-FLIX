import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const WatchList = () => {

    const [watchList, setWatchList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        const movies = JSON.parse(localStorage.getItem("watchList")) || [];
        setWatchList(movies);

    }, []);

    const removeMovie = (imdbId) => {

        const updatedList = watchList.filter(
            (movie) => movie.imdbId !== imdbId
        );

        localStorage.setItem(
            "watchList",
            JSON.stringify(updatedList)
        );

        setWatchList(updatedList);
    };

    return (

        <Container className="mt-4">

            <h2
                style={{
                    color: "white",
                    textAlign: "center",
                    marginBottom: "30px"
                }}
            >
                ❤️ My Watch List
            </h2>

            {
                watchList.length === 0 ? (

                    <h4
                        style={{
                            color: "white",
                            textAlign: "center"
                        }}
                    >
                        Your Watch List is Empty
                    </h4>

                ) : (

                    <Row>

                        {
                            watchList.map((movie) => (

                                <Col
                                    md={4}
                                    lg={3}
                                    className="mb-4"
                                    key={movie.imdbId}
                                >

                                    <Card
                                        bg="dark"
                                        text="light"
                                    >

                                        <Card.Img
                                            variant="top"
                                            src={movie.poster}
                                            style={{
                                                height: "400px",
                                                objectFit: "cover"
                                            }}
                                        />

                                        <Card.Body>

                                            <Card.Title>
                                                {movie.title}
                                            </Card.Title>

                                            <Button
                                                variant="info"
                                                onClick={() =>
                                                    navigate(`/Reviews/${movie.imdbId}`)
                                                }
                                            >
                                                Reviews
                                            </Button>

                                            <Button
                                                variant="danger"
                                                style={{ marginLeft: "10px" }}
                                                onClick={() =>
                                                    removeMovie(movie.imdbId)
                                                }
                                            >
                                                Remove
                                            </Button>

                                        </Card.Body>

                                    </Card>

                                </Col>

                            ))
                        }

                    </Row>

                )
            }

        </Container>

    );
}

export default WatchList;