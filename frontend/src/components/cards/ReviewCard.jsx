const ReviewCard = ({ review }) => {
  return (
    <div className='review-card'>
      <div className='review-card-heading'>
        <h3 className='title'>
          {review.user.username} - {review.score}/10
        </h3>
        <p>{new Date(review.date).toLocaleString('en-GB')}</p>
      </div>
      <div className='review-card-body'>
        <p className='title'>{review.tags.map((tag) => tag)}</p>
        <p>{review.review}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
