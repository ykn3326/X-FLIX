package dev.farhan.movieist.trending;

import java.util.List;

public class TrendingResponse {

    private List<TrendingMovie> trendingMovies;

    public TrendingResponse(List<TrendingMovie> trendingMovies) {
        this.trendingMovies = trendingMovies;
    }

    public List<TrendingMovie> getTrendingMovies() {
        return trendingMovies;
    }

    public void setTrendingMovies(List<TrendingMovie> trendingMovies) {
        this.trendingMovies = trendingMovies;
    }
}