package dev.farhan.movieist.reports;

import dev.farhan.movieist.movies.Movie;
import dev.farhan.movieist.movies.MovieRepository;
import dev.farhan.movieist.movies.Review;
import dev.farhan.movieist.movies.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ReportService {

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    public ReportResponse getReport() {

        ReportResponse report = new ReportResponse();

        // Total Movies
        report.setTotalMovies(movieRepository.count());

        // Total Reviews
        report.setTotalReviews(reviewRepository.count());

        // Average Rating (overall)
        List<Review> reviews = reviewRepository.findAll();

        double average = reviews.stream()
                .filter(r -> r.getRating() != null)
                .mapToInt(Review::getRating)
                .average()
                .orElse(0.0);

        report.setAverageRating(average);

        // Movies by Genre
        List<Movie> movies = movieRepository.findAll();

        Map<String, Integer> genreCount = new HashMap<>();

        for (Movie movie : movies) {
            if (movie.getGenres() != null) {
                for (String genre : movie.getGenres()) {
                    genreCount.put(genre, genreCount.getOrDefault(genre, 0) + 1);
                }
            }
        }

        report.setMoviesByGenre(genreCount);

        // Top Rated Movies
        List<MovieRatingReport> topRated = new ArrayList<>();

        for (Movie movie : movies) {

            if (movie.getReviews() != null && !movie.getReviews().isEmpty()) {

                double avg = movie.getReviews().stream()
                        .filter(r -> r.getRating() != null)
                        .mapToInt(Review::getRating)
                        .average()
                        .orElse(0.0);

                topRated.add(new MovieRatingReport(movie.getTitle(), avg));
            }
        }

        topRated = topRated.stream()
                .sorted((a, b) -> Double.compare(b.getAverageRating(), a.getAverageRating()))
                .limit(5)
                .collect(Collectors.toList());

        report.setTopRatedMovies(topRated);

        // Most Reviewed Movies
        List<MovieReviewCountReport> mostReviewed = new ArrayList<>();

        for (Movie movie : movies) {

            int count = movie.getReviews() == null ? 0 : movie.getReviews().size();

            mostReviewed.add(new MovieReviewCountReport(movie.getTitle(), count));
        }

        mostReviewed = mostReviewed.stream()
                .sorted((a, b) -> Integer.compare(b.getReviewCount(), a.getReviewCount()))
                .limit(5)
                .collect(Collectors.toList());

        report.setMostReviewedMovies(mostReviewed);

        return report;
    }
}