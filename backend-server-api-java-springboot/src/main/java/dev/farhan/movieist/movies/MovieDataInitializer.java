package dev.farhan.movieist.movies;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.util.List;

@Component
public class MovieDataInitializer implements CommandLineRunner {

    private final MovieRepository movieRepository;
    private final ObjectMapper objectMapper;

    public MovieDataInitializer(MovieRepository movieRepository, ObjectMapper objectMapper) {
        this.movieRepository = movieRepository;
        this.objectMapper = objectMapper;
    }

    @Override
    public void run(String... args) throws Exception {
        if (movieRepository.count() > 0) {
            return;
        }

        try (InputStream movieData = new ClassPathResource("movies.json").getInputStream()) {
            List<Movie> movies = objectMapper.readValue(movieData, new TypeReference<>() {});
            if (!movies.isEmpty()) {
                movieRepository.saveAll(movies);
            }
        }
    }
}
