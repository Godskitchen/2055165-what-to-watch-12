import { Reviews } from '../../types/film';
import Review from '../review/review';

type ReviewListProps = {
  reviewList: Reviews;
}

export default function ReviewList({reviewList} : ReviewListProps) : JSX.Element {

  if (reviewList.length === 0) {
    return (
      <div className="film-card__reviews film-card__row">
      </div>
    );
  } else {
    let reviews = null;

    if (reviewList.length === 1) {
      reviews =
        (
          <div className="film-card__reviews-col">
            <Review review = {reviewList[0]}/>
          </div>
        );
    } else {
      reviews =
        (
          <>
            <div className="film-card__reviews-col">
              {reviewList.slice(0, Math.ceil(reviewList.length / 2)).map((review) =>
                <Review key={review.id} review={review}/>
              )}
            </div>
            <div className="film-card__reviews-col">
              {reviewList.slice(Math.ceil(reviewList.length / 2), reviewList.length).map((review) =>
                <Review key={review.id} review={review}/>
              )}
            </div>
          </>
        );
    }
    return (
      <div className="film-card__reviews film-card__row">
        {reviews}
      </div>
    );
  }
}

