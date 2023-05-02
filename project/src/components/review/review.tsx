import { ReviewType } from '../../types/film';
import dayjs from 'dayjs';

type ReviewProps = {
  review: ReviewType;
}

export default function Review({ review }: ReviewProps): JSX.Element {

  const { comment, rating, user, date } = review;

  return (
    <div className="review" data-testid='review'>
      <blockquote className="review__quote">
        <p className="review__text" data-testid='comment'>{comment}</p>

        <footer className="review__details">
          <cite className="review__author" data-testid='author'>{user.name}</cite>
          <time className="review__date" data-testid='review-date' dateTime={dayjs(date).format('YYYY-MM-DD')}>{dayjs(date).format('MMMM DD, YYYY')}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{`${rating.toFixed(1)}`.replace('.', ',')}</div>
    </div>
  );
}

