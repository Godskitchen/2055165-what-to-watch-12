import { ReviewType } from '../../types/film';
import dayjs from 'dayjs';

type ReviewProps = {
  review: ReviewType;
}

export default function Review({review}: ReviewProps) : JSX.Element {

  const {comment, rating, user, date} = review;

  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{comment}</p>

        <footer className="review__details">
          <cite className="review__author">{user.name}</cite>
          <time className="review__date" dateTime={dayjs(date).format('YYYY-MM-DD')}>{dayjs(date).format('MMMM DD, YYYY')}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{`${rating.toFixed(1)}`.replace('.', ',')}</div>
    </div>
  );
}

