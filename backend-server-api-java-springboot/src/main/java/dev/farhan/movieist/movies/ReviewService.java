package dev.farhan.movieist.movies;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository repository;

    @Autowired
    private MovieRepository movieRepository;

    public Review createReview(String reviewBody, int rating, String imdbId) {

        Review review = repository.save(
                new Review(
                        reviewBody,
                        rating,
                        LocalDateTime.now(),
                        LocalDateTime.now()
                )
        );

        Movie movie = movieRepository.findMovieByImdbId(imdbId)
                .orElseThrow(() -> new RuntimeException("Movie not found"));

        if (movie.getReviews() == null) {
            movie.setReviews(new ArrayList<>());
        }

        movie.getReviews().add(review);

        movieRepository.save(movie);

        return review;
    }
}