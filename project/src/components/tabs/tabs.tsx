import { tabNames } from '../../const';
import { Film, Reviews } from '../../types/film';
import { addNewlinesInList } from '../../utils';
import ReviewList from '../reviews-list/review-list';

type TabProps = {
  activeTab: typeof tabNames[number];
  film: Film;
  reviewsList: Reviews;
}
export default function Tabs({activeTab, film, reviewsList} : TabProps) : JSX.Element {

  const {
    rating,
    scoresCount,
    description,
    director,
    starring,
    runTime,
    genre,
    released
  } = film;

  switch(activeTab) {
    case 'Overview': {
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

    case 'Details' : {
      return (
        <div className="film-card__text film-card__row">
          <div className="film-card__text-col">
            <p className="film-card__details-item">
              <strong className="film-card__details-name">Director</strong>
              <span className="film-card__details-value">{director}</span>
            </p>
            <p className="film-card__details-item">
              <strong className="film-card__details-name">Starring</strong>
              <span className="film-card__details-value">
                {addNewlinesInList(starring)}
              </span>
            </p>
          </div>

          <div className="film-card__text-col">
            <p className="film-card__details-item">
              <strong className="film-card__details-name">Run Time</strong>
              <span className="film-card__details-value">{Math.floor(runTime / 60)}h {runTime % 60}m</span>
            </p>
            <p className="film-card__details-item">
              <strong className="film-card__details-name">Genre</strong>
              <span className="film-card__details-value">{genre}</span>
            </p>
            <p className="film-card__details-item">
              <strong className="film-card__details-name">Released</strong>
              <span className="film-card__details-value">{released}</span>
            </p>
          </div>
        </div>
      );
    }

    case 'Reviews' : {
      return <ReviewList reviewsList={reviewsList}/>;
    }
  }
}
