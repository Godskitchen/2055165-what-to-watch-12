import { Link } from 'react-router-dom';

type AddReviewBtnProps = {
  filmId: string;
}

export default function AddReviewButton({ filmId }: AddReviewBtnProps): JSX.Element {
  return (
    <Link
      to={`/films/${filmId}/review`}
      className="btn film-card__button"
      data-testid="add-review-btn"
    >
      Add review
    </Link>
  );
}
