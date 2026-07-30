import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';

const ReviewForm = ({
    handleSubmit,
    revText,
    labelText,
    defaultValue,
    rating,
    setRating
}) => {

    return (
        <Form>

            <Form.Group className="mb-3">
                <Form.Label><b>Rate this Movie</b></Form.Label>

                <div style={{ fontSize: "30px", cursor: "pointer" }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            onClick={() => setRating(star)}
                            style={{
                                color: star <= rating ? "gold" : "gray",
                                marginRight: "5px"
                            }}
                        >
                            ★
                        </span>
                    ))}
                </div>

                <div style={{ color: "white", marginTop: "5px" }}>
                    Selected Rating: {rating}/5
                </div>

            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>{labelText}</Form.Label>

                <Form.Control
                    ref={revText}
                    as="textarea"
                    rows={3}
                    defaultValue={defaultValue}
                />

            </Form.Group>

            <Button
                variant="outline-info"
                onClick={handleSubmit}
            >
                Submit
            </Button>

        </Form>
    );
}

export default ReviewForm;