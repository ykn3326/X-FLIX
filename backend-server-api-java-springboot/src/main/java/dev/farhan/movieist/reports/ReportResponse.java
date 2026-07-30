package dev.farhan.movieist.reports;

import java.util.List;
import java.util.Map;

public class ReportResponse {

    private long totalMovies;
    private long totalReviews;
    private double averageRating;

    private Map<String, Integer> moviesByGenre;

    private List<MovieRatingReport> topRatedMovies;

    private List<MovieReviewCountReport> mostReviewedMovies;

    public long getTotalMovies() {
        return totalMovies;
    }

    public void setTotalMovies(long totalMovies) {
        this.totalMovies = totalMovies;
    }

    public long getTotalReviews() {
        return totalReviews;
    }

    public void setTotalReviews(long totalReviews) {
        this.totalReviews = totalReviews;
    }

    public double getAverageRating() {
        return averageRating;
    }

    public void setAverageRating(double averageRating) {
        this.averageRating = averageRating;
    }

    public Map<String, Integer> getMoviesByGenre() {
        return moviesByGenre;
    }

    public void setMoviesByGenre(Map<String, Integer> moviesByGenre) {
        this.moviesByGenre = moviesByGenre;
    }

    public List<MovieRatingReport> getTopRatedMovies() {
        return topRatedMovies;
    }

    public void setTopRatedMovies(List<MovieRatingReport> topRatedMovies) {
        this.topRatedMovies = topRatedMovies;
    }

    public List<MovieReviewCountReport> getMostReviewedMovies() {
        return mostReviewedMovies;
    }

    public void setMostReviewedMovies(List<MovieReviewCountReport> mostReviewedMovies) {
        this.mostReviewedMovies = mostReviewedMovies;
    }
}