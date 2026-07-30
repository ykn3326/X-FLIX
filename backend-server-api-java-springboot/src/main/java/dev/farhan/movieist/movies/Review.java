package dev.farhan.movieist.movies;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "reviews")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Review {

    @Id
    private ObjectId id;

    private String body;
    private Integer rating;

    private LocalDateTime created;
    private LocalDateTime updated;

    public Review(String body, Integer rating, LocalDateTime created, LocalDateTime updated) {
        this.body = body;
        this.rating = rating;
        this.created = created;
        this.updated = updated;
    }
}