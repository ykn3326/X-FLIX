import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import api from "../../api/axiosConfig";

const Recommendations = () => {
  const { imdbId } = useParams();

  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);

  useEffect(() => {

    // Get top recommendations
    api.get(`/api/v1/movies/recommend/${imdbId}`)
      .then((response) => {
        setRecommendedMovies(response.data);
      });

    // Get all movies
    api.get("/api/v1/movies")
      .then((response) => {
        setAllMovies(response.data);
      });

  }, [imdbId]);

  const MovieCard = (movie) => (
    <Col key={movie.imdbId} lg={3} md={4} sm={6} xs={12} className="mb-4">

      <Card
        style={{
          backgroundColor: "#1c1c1c",
          color: "white",
          height: "100%"
        }}
      >
        <Card.Img
          variant="top"
          src={movie.poster}
          style={{
            height: "350px",
            objectFit: "cover"
          }}
        />

        <Card.Body>

          <Card.Title>{movie.title}</Card.Title>

          <Card.Text>
            📅 {movie.releaseDate}
          </Card.Text>

          <Card.Text>
            🎭 {movie.genres.join(", ")}
          </Card.Text>

          <Link to={`/Reviews/${movie.imdbId}`}>
            <Button variant="warning">
              View Movie
            </Button>
          </Link>

        </Card.Body>
      </Card>

    </Col>
  );

  return (
    <Container className="mt-4">

      <h2 className="text-white mb-4">
        🎯 Recommended Movies
      </h2>

      <Row>
        {recommendedMovies.map(MovieCard)}
      </Row>

      <hr style={{ color: "white" }} />

      <h2 className="text-white mb-4">
        🎬 Explore More Movies
      </h2>

      <Row>
        {allMovies.map(MovieCard)}
      </Row>

    </Container>
  );
};

export default Recommendations;