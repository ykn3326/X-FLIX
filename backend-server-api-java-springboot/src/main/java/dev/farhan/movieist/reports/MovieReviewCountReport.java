package dev.farhan.movieist.reports;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MovieReviewCountReport {

    private String title;
    private int reviewCount;
}