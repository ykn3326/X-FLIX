package dev.farhan.movieist.trending;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/trending")
@CrossOrigin(origins = "*")
public class TrendingController {

    @Autowired
    private TrendingService trendingService;

    @GetMapping
    public TrendingResponse getTrendingMovies() {
        return trendingService.getTrendingMovies();
    }
}