package dev.farhan.movieist;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "dev.farhan.movieist")
public class MovieistApplication {

    public static void main(String[] args) {
        SpringApplication.run(MovieistApplication.class, args);
    }
}
