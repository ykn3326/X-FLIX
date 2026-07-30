package dev.farhan.movieist.trending;

public class TrendingMovie {

    private String imdbId;
    private String title;
    private String poster;
    private Double averageRating;
    private Integer reviewCount;
    private Double trendingScore;

    public TrendingMovie() {
    }

    public TrendingMovie(String imdbId, String title, String poster,
                         Double averageRating,
                         Integer reviewCount,
                         Double trendingScore) {
        this.imdbId = imdbId;
        this.title = title;
        this.poster = poster;
        this.averageRating = averageRating;
        this.reviewCount = reviewCount;
        this.trendingScore = trendingScore;
    }

    public String getImdbId() {
        return imdbId;
    }

    public void setImdbId(String imdbId) {
        this.imdbId = imdbId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getPoster() {
        return poster;
    }

    public void setPoster(String poster) {
        this.poster = poster;
    }

    public Double getAverageRating() {
        return averageRating;
    }

    public void setAverageRating(Double averageRating) {
        this.averageRating = averageRating;
    }

    public Integer getReviewCount() {
        return reviewCount;
    }

    public void setReviewCount(Integer reviewCount) {
        this.reviewCount = reviewCount;
    }

    public Double getTrendingScore() {
        return trendingScore;
    }

    public void setTrendingScore(Double trendingScore) {
        this.trendingScore = trendingScore;
    }
}