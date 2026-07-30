package dev.farhan.movieist.trending;

import dev.farhan.movieist.movies.Movie;
import dev.farhan.movieist.movies.MovieRepository;
import dev.farhan.movieist.movies.Review;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
public class TrendingService {

    @Autowired
    private MovieRepository movieRepository;

    public TrendingResponse getTrendingMovies() {

        List<Movie> movies = movieRepository.findAll();
        List<TrendingMovie> trendingMovies = new ArrayList<>();

        for (Movie movie : movies) {

            List<Review> reviews = movie.getReviews();

            int reviewCount = 0;
            double averageRating = 0.0;

            if (reviews != null && !reviews.isEmpty()) {

                reviewCount = (int) reviews.stream()
                        .filter(review -> review != null && review.getRating() != null)
                        .count();

                averageRating = reviews.stream()
                        .filter(review -> review != null && review.getRating() != null)
                        .mapToInt(Review::getRating)
                        .average()
                        .orElse(0.0);
            }

            double trendingScore = averageRating * reviewCount;

            TrendingMovie trendingMovie = new TrendingMovie(
                    movie.getImdbId(),
                    movie.getTitle(),
                    movie.getPoster(),
                    averageRating,
                    reviewCount,
                    trendingScore
            );

            trendingMovies.add(trendingMovie);
        }

        trendingMovies.sort(
                Comparator.comparingDouble(TrendingMovie::getTrendingScore)
                        .reversed()
        );

        if (trendingMovies.size() > 10) {
            trendingMovies = new ArrayList<>(trendingMovies.subList(0, 10));
        }

        return new TrendingResponse(trendingMovies);
    }
}