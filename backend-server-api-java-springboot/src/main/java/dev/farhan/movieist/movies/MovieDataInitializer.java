package dev.farhan.movieist.movies;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Component
public class MovieDataInitializer implements CommandLineRunner {

    private static final int REVIEWS_PER_MOVIE = 10;

    private final MovieRepository movieRepository;
    private final ReviewRepository reviewRepository;
    private final ObjectMapper objectMapper;

    public MovieDataInitializer(
            MovieRepository movieRepository,
            ReviewRepository reviewRepository,
            ObjectMapper objectMapper
    ) {
        this.movieRepository = movieRepository;
        this.reviewRepository = reviewRepository;
        this.objectMapper = objectMapper;
    }

    @Override
    public void run(String... args) throws Exception {
        if (movieRepository.count() == 0) {
            List<Movie> initialMovies = readResource("movies.json", new TypeReference<>() {});
            if (!initialMovies.isEmpty()) {
                movieRepository.saveAll(initialMovies);
            }
        }

        List<Movie> importedMovies = readResource("movies-import.json", new TypeReference<>() {});
        for (Movie movie : importedMovies) {
            Movie storedMovie = movieRepository.findMovieByImdbId(movie.getImdbId()).orElse(null);
            if (storedMovie == null) {
                movieRepository.save(movie);
            }
        }

        List<Review> importedReviews = readResource("reviews-import.json", new TypeReference<>() {});
        List<Review> storedReviews = new ArrayList<>(importedReviews.size());
        for (Review review : importedReviews) {
            Review storedReview = reviewRepository.findByBody(review.getBody()).orElse(null);
            if (storedReview == null) {
                LocalDateTime now = LocalDateTime.now();
                review.setRating(5);
                review.setCreated(now);
                review.setUpdated(now);
                storedReview = reviewRepository.save(review);
            }
            storedReviews.add(storedReview);
        }

        for (Movie movie : importedMovies) {
            Movie storedMovie = movieRepository.findMovieByImdbId(movie.getImdbId()).orElseThrow();
            if (storedMovie.getReviews() == null || storedMovie.getReviews().isEmpty()) {
                Collections.shuffle(storedReviews);
                storedMovie.setReviews(new ArrayList<>(storedReviews.subList(
                        0,
                        Math.min(REVIEWS_PER_MOVIE, storedReviews.size())
                )));
                movieRepository.save(storedMovie);
            }
        }
    }

    private <T> T readResource(String resourceName, TypeReference<T> type) throws Exception {
        try (InputStream data = new ClassPathResource(resourceName).getInputStream()) {
            return objectMapper.readValue(data, type);
        }
    }
}
