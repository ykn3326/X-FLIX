package com.siddheshkukade.movies;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@ComponentScan(basePackages = {
    "com.siddheshkukade.movies",
    "dev.farhan.movieist.movies",
    "dev.farhan.movieist.reports",
    "dev.farhan.movieist.trending"
})
@EnableMongoRepositories(basePackages = {
    "dev.farhan.movieist.movies"
})
public class MoviesApplication {

    public static void main(String[] args) {
        SpringApplication.run(MoviesApplication.class, args);
    }
}