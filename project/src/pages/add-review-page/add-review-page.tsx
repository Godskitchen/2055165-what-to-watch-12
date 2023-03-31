import { useState, ChangeEvent, Fragment } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import Logo from '../../components/logo/logo';
import UserAvatar from '../../components/user-avatar/user-avatar';
import { CLASSPATH_LOGO_HEADER } from '../../const';
import { Films } from '../../types/film';
import NotFoundPage from '../not-found-page/not-found-page';

type AddReviewPageProps = {
  filmsList: Films;
}

export default function AddReviewPage({filmsList} : AddReviewPageProps) : JSX.Element {

  const {id} = useParams();
  const film = filmsList.find((movie) => `${movie.id}` === id);

  const DEFAULT_RATING_VALUE = '5';
  const [reviewData, setReviewData] = useState({rating: DEFAULT_RATING_VALUE, reviewText: ''});

  if (!film || !id) {
    return <NotFoundPage />;
  }

  const {
    name,
    backgroundImage,
    backgroundColor,
    posterImage
  } = film;

  const onRatingChange = ({target}: ChangeEvent<HTMLInputElement>) : void => {
    setReviewData({...reviewData, rating: target.value});
  };

  const onTextReviewChange = ({target}: ChangeEvent<HTMLTextAreaElement>) : void => {
    setReviewData({...reviewData, reviewText: target.value});
  };

  const ratingStars = new Array(10).fill('').map((_, index) =>
  {
    const ratingValue = `${10 - index}`;
    return (
      <Fragment key={ratingValue}>
        <input className="rating__input" id={`star-${ratingValue}`} type="radio" name="rating" value={`${ratingValue}`} onChange={onRatingChange} checked={reviewData.rating === `${ratingValue}`} />
        <label className="rating__label" htmlFor={`star-${ratingValue}`}>{`Rating ${ratingValue}`}</label>
      </Fragment>
    );
  });

  return (
    <section className="film-card film-card--full" style={{backgroundColor: `${backgroundColor}`}}>
      <Helmet>
        <title>What to Watch. Ваша рецензия на фильм</title>
      </Helmet>
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={backgroundImage} alt={name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <Logo classPath={CLASSPATH_LOGO_HEADER} />

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`/films/${id}`} className="breadcrumbs__link">{name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <Link to='#' className="breadcrumbs__link" style={{pointerEvents: 'none'}}>Add review</Link>
              </li>
            </ul>
          </nav>

          <ul className="user-block">
            <li className="user-block__item">
              <UserAvatar />
            </li>
            <li className="user-block__item">
              <Link to='/' className="user-block__link">Sign out</Link>
            </li>
          </ul>
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={posterImage} alt={`${name} poster`} width="218" height="327" />
        </div>
      </div>

      <div className="add-review">
        <form action="#" className="add-review__form">
          <div className="rating">
            <div className="rating__stars">
              {ratingStars}
            </div>
          </div>

          <div className="add-review__text" style={{backgroundColor: 'rgba(255, 255, 255, 0.35)'}}>
            <textarea onChange={onTextReviewChange} className="add-review__textarea" value={reviewData.reviewText} name="review-text" id="review-text" placeholder="Review text"></textarea>
            <div className="add-review__submit">
              <button className="add-review__btn" type="submit">Post</button>
            </div>

          </div>
        </form>
      </div>
    </section>
  );
}
