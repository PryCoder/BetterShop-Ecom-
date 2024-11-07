import React, { useState, useEffect } from 'react';

const Rating = ({ listingId }) => {
  const [rating, setRating] = useState(0); // Local rating state
  const [averageRating, setAverageRating] = useState(0); // Average rating from server
  const [numberOfRatings, setNumberOfRatings] = useState(0); // Total number of ratings
  const [userRating, setUserRating] = useState(null); // User's rating state
  const [error, setError] = useState(null); // Error message state
  const [success, setSuccess] = useState(false); // Success message state
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [modalSuccess, setModalSuccess] = useState(false); // Success state for the modal

  // Function to fetch current rating data from the server
  const fetchRatingData = async () => {
    try {
      const response = await fetch(`http://localhost:5173/api/listings/${listingId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch rating data.');
      }

      const data = await response.json();
      setAverageRating(data.starRating); // Set the average rating
      setNumberOfRatings(data.numberOfRatings); // Set the number of ratings
      setUserRating(data.ratings.find(r => r.userId === localStorage.getItem('userId'))?.rating || null); // Set user's rating
    } catch (err) {
      console.error(err);
      setError(err.message); // Set error message
    }
  };

  useEffect(() => {
    fetchRatingData(); // Fetch rating data when the component mounts
  }, [listingId]);

  // Function to handle rating submission
  const handleRatingSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state
    setSuccess(false); // Reset success state

    if (userRating !== null) {
      // If the user has already rated, show the modal
      setShowModal(true);
      return;
    }

    try {
      const response = await fetch(`http://localhost:5173/api/listings/${listingId}/rate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming token is stored in local storage
        },
        body: JSON.stringify({ rating }), // Send the rating in the request body
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit rating.');
      }

      setSuccess(true); // Set success message
      setModalSuccess(true); // Indicate success for modal

      // Update the average rating and number of ratings
      setNumberOfRatings((prev) => prev + 1); // Increment the total number of ratings
      setAverageRating((prev) => {
        const newAverage = (prev * numberOfRatings + rating) / (numberOfRatings + 1);
        return newAverage;
      });

      setUserRating(rating); // Set user's rating
      setRating(0); // Reset local rating
    } catch (err) {
      console.error(err);
      setError(err.message); // Set error message
    }
  };

  // Function to handle confirmation of re-rating
  const confirmReRate = async () => {
    try {
      const response = await fetch(`http://localhost:5173/api/listings/${listingId}/rate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming token is stored in local storage
        },
        body: JSON.stringify({ rating: rating }), // Send the new rating in the request body
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit rating.');
      }

      setSuccess(true); // Set success message
      setModalSuccess(true); // Indicate success for modal
      setShowModal(false); // Hide the modal

      // Update the average rating and number of ratings
      setNumberOfRatings((prev) => prev - 1); // Decrement the total number of ratings since we are updating
      setAverageRating((prev) => {
        const newAverage = (prev * (numberOfRatings + 1) - userRating + rating) / (numberOfRatings);
        return newAverage;
      });

      setUserRating(rating); // Update user's rating
      setRating(0); // Reset local rating
    } catch (err) {
      console.error(err);
      setError(err.message); // Set error message
    }
  };

  return (
    <div className="mt-4 p-4 border rounded shadow-lg">
      <h3 className="text-lg font-semibold">Rate this listing:</h3>
      <form onSubmit={handleRatingSubmit} className="flex flex-col mt-2">
        <div className="flex justify-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <label key={star} className="cursor-pointer">
              <input
                type="radio"
                value={star}
                checked={rating === star} // Check if the current star is selected
                onChange={() => setRating(star)} // Set local rating
                required
                className="hidden"
              />
              <span
                className={`text-3xl ${averageRating >= star ? 'text-yellow-400' : 'text-gray-300'} transition duration-200`} // Display star color based on average rating
                aria-label={`Rate ${star} stars`}
                role="button"
              >
                &#9733; {/* Star character */}
              </span>
            </label>
          ))}
        </div>
        {rating > 0 && ( // Show the submit button only if a rating is selected
          <button type="submit" className="mt-2 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
            Submit Rating
          </button>
        )}
      </form>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {/* Display average rating and number of ratings */}
      <div className="mt-4">
        <h4 className="text-lg">Average Rating: {averageRating.toFixed(1)} ({numberOfRatings} ratings)</h4>
      </div>

      {/* Modal for confirming re-rating */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-lg font-semibold">You have already rated this listing!</h2>
            <p className="mt-2">Would you like to change your rating?</p>
            {modalSuccess && <p className="text-green-500 mt-2">Rating submitted successfully!</p>} {/* Success message in modal */}
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmReRate}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Yes, Change My Rating
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rating;
