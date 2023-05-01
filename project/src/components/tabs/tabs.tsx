import { tabNames } from '../../const';
import { Film, Reviews } from '../../types/film';
import { addNewlinesInList, getFilmRatingLevel } from '../../utils/utils';
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
          <div className="film-rating" data-testid='film-rating'>
            <div className="film-rating__score">{`${rating.toFixed(1)}`.replace('.', ',')}</div>
            <p className="film-rating__meta">
              <span className="film-rating__level">{getFilmRatingLevel(parseFloat(rating.toFixed(1)))}</span>
              <span className="film-rating__count">{scoresCount} ratings</span>
            </p>
          </div>

          <div className="film-card__text">
            <p data-testid='description'>{description}</p>

            <p className="film-card__director" data-testid='overview-director'><strong>Director: {director}</strong></p>

            <p className="film-card__starring" data-testid='overview-starring'><strong>Starring: {starring.join(', ')} and other</strong></p>
          </div>
        </>
      );
    }

    case 'Details' : {
      const hours = Math.floor(runTime / 60);
      const totalTime = `${hours ? `${hours}h` : ''} ${runTime % 60}m`;

      return (
        <div className="film-card__text film-card__row">
          <div className="film-card__text-col">
            <p className="film-card__details-item">
              <strong className="film-card__details-name">Director</strong>
              <span className="film-card__details-value" data-testid='details-director'>{director}</span>
            </p>
            <p className="film-card__details-item">
              <strong className="film-card__details-name" data-testid='details-starring'>Starring</strong>
              <span className="film-card__details-value">
                {addNewlinesInList(starring)}
              </span>
            </p>
          </div>

          <div className="film-card__text-col">
            <p className="film-card__details-item">
              <strong className="film-card__details-name" data-testid='details-runtime'>Run Time</strong>
              <span className="film-card__details-value">{totalTime}</span>
            </p>
            <p className="film-card__details-item">
              <strong className="film-card__details-name">Genre</strong>
              <span className="film-card__details-value" data-testid='details-genre'>{genre}</span>
            </p>
            <p className="film-card__details-item">
              <strong className="film-card__details-name">Released</strong>
              <span className="film-card__details-value" data-testid='details-year'>{released}</span>
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
