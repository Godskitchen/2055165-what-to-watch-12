import { Reviews } from '../../types/film';
import Review from '../review/review';

type ReviewListProps = {
  reviewsList: Reviews;
}

export default function ReviewList({reviewsList} : ReviewListProps) : JSX.Element {

  if (reviewsList.length === 0) {
    return (
      <div className="film-card__reviews film-card__row">
      </div>
    );
  }

  if (reviewsList.length === 1) {
    return (
      <div className="film-card__reviews film-card__row">
        <div className="film-card__reviews-col">
          <Review key={reviewsList[0].id} review = {reviewsList[0]}/>
        </div>
      </div>
    );
  }

  return (
    <div className="film-card__reviews film-card__row" data-testid='reviews-list'>
      <div className="film-card__reviews-col">
        {reviewsList.slice(0, Math.ceil(reviewsList.length / 2)).map((review) =>
          <Review key={review.id} review={review}/>
        )}
      </div>
      <div className="film-card__reviews-col">
        {reviewsList.slice(Math.ceil(reviewsList.length / 2), reviewsList.length).map((review) =>
          <Review key={review.id} review={review}/>
        )}
      </div>
    </div>
  );
}

