package dev.farhan.movieist.movies;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class MovieService {

    @Autowired
    private MovieRepository repository;

    public List<Movie> findAllMovies() {
        return repository.findAll();
    }

    public Optional<Movie> findMovieByImdbId(String imdbId) {
        return repository.findMovieByImdbId(imdbId);
    }

    // Genre Based Recommendation
    public List<Movie> recommendMovies(String imdbId) {

        Optional<Movie> movieOptional = repository.findMovieByImdbId(imdbId);

        if (movieOptional.isEmpty()) {
            return new ArrayList<>();
        }

        Movie selectedMovie = movieOptional.get();
        List<Movie> allMovies = repository.findAll();

        List<Movie> recommendations = new ArrayList<>();

        for (Movie movie : allMovies) {

            if (movie.getImdbId().equals(selectedMovie.getImdbId())) {
                continue;
            }

            int matchingGenres = 0;

            for (String genre : movie.getGenres()) {
                if (selectedMovie.getGenres().contains(genre)) {
                    matchingGenres++;
                }
            }

            if (matchingGenres > 0) {
                recommendations.add(movie);
            }
        }

        if (recommendations.size() > 6) {
            return new ArrayList<>(recommendations.subList(0, 6));
        }

        return recommendations;
    }
}