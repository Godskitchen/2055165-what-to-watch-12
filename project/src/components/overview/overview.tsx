import { useMovie } from '../../pages/movie-page/movie-page';

export default function Overview () : JSX.Element {

  const {movie} = useMovie();

  const {
    rating,
    scoresCount,
    description,
    director,
    starring
  } = movie;

  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{`${rating.toFixed(1)}`.replace('.', ',')}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">Very good</span>
          <span className="film-rating__count">{scoresCount} ratings</span>
        </p>
      </div>

      <div className="film-card__text">
        <p>{description}</p>

        <p className="film-card__director"><strong>Director: {director}</strong></p>

        <p className="film-card__starring"><strong>Starring: {starring.join(', ')} and other</strong></p>
      </div>
    </>
  );
}
