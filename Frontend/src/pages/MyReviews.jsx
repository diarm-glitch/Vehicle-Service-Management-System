import { useEffect, useState } from "react";
import axios from "axios";

function MyReviews() {
  const token = localStorage.getItem("token");
  const [myReviews, setMyReviews] = useState([]);

  useEffect(() => {
    fetchMyReviews();
  }, []);

  const fetchMyReviews = async () => {
    try {
      const res = await axios.get("http://localhost:5000/car-reviews/my-reviews", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMyReviews(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteReview = async (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) {
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/car-reviews/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchMyReviews();
    } catch (err) {
      console.log(err);
      alert("Failed to delete review");
    }
  };

  return (
    <div className="container mt-4">
      <h2>My Reviews</h2>

      <div className="card p-4">
        {myReviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          myReviews.map((review) => (
            <div key={review.id} className="mb-3 pb-3 border-bottom">
              <h5>
                {review.car_make} {review.car_model}
              </h5>

              <p><strong>Year:</strong> {review.car_year}</p>
              <p><strong>Rating:</strong> {review.rating}/5</p>
              <p><strong>{review.title}</strong></p>
              <p>{review.review_text}</p>

              <button
                className="btn btn-danger btn-sm"
                onClick={() => deleteReview(review.id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyReviews;