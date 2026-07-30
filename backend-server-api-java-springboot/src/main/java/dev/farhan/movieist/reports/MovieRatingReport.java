package dev.farhan.movieist.reports;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MovieRatingReport {

    private String title;
    private double averageRating;
}