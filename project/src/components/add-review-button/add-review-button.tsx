import { Link } from 'react-router-dom';

type AddReviewBtnProps = {
  filmsId: string;
}

export default function AddReviewButton({filmsId} : AddReviewBtnProps ) : JSX.Element {
  return (
    <Link to={`/films/${filmsId}/review`} className="btn film-card__button">Add review</Link>
  );
}
