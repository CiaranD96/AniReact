import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReviewCard from '../cards/ReviewCard';

const ReviewsTab = () => {
  const [reviews, setReviews] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    const getReviews = async () => {
      try {
        const response = await fetch(
          `https://api.jikan.moe/v4/anime/${params.animeId}/reviews?page=${pageNumber}`
        );
        const data = await response.json();

        setReviews(data.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    getReviews();
  }, [params.animeId, pageNumber]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className='tab-container review-tab-container'>
      {reviews.length > 0
        ? reviews.map((review) => (
            <ReviewCard key={review.mal_id} review={review} />
          ))
        : 'Oops, there are no reviews yet'}
    </div>
  );
};

export default ReviewsTab;
