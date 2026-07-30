const movies = db.movies.find().toArray();
const reviews = db.reviews.find().toArray();

movies.forEach(movie => {
    const shuffled = [...reviews].sort(() => Math.random() - 0.5);

    const selectedReviews = shuffled
        .slice(0, 10)
        .map(review => review._id);

    db.movies.updateOne(
        { _id: movie._id },
        {
            $set: {
                reviews: selectedReviews
            }
        }
    );
});

print("Done! All movies now have 10 random reviews.");