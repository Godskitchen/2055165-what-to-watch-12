import { useState, ChangeEvent, Fragment, useEffect, FormEvent } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import Logo from '../../components/logo/logo';
import { CLASSPATH_LOGO_HEADER } from '../../const';
import NotFoundPage from '../not-found-page/not-found-page';
import { addReviewAction, fetchFilmAction } from '../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../hooks';
import UserBlock from '../../components/user-block/user-block';
import BlockUI from '../../components/block-UI/block-UI';
import { getCurrentFilm, getDataUploadingStatus } from '../../store/app-data/app-data-selectors';

const MIN_CHARS_COUNT = 50;
const MAX_CHARS_COUNT = 400;

export default function AddReviewPage() : JSX.Element {

  const isUIBlocking = useAppSelector(getDataUploadingStatus);

  const [textFieldError, setTextFieldError] = useState('Your review must not be empty');
  const [isTextFieldUsed, setIsTextFieldUsed] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const {id} = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchFilmAction(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (textFieldError) {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }
  }, [textFieldError]);

  const film = useAppSelector(getCurrentFilm);

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

  const onRatingChangeHandler = ({target}: ChangeEvent<HTMLInputElement>) => {
    setReviewData({...reviewData, rating: target.value});
  };

  const onTextReviewChangeHandler = ({target}: ChangeEvent<HTMLTextAreaElement>) => {
    setReviewData({...reviewData, reviewText: target.value});
    if (target.value.length < MIN_CHARS_COUNT || target.value.length > MAX_CHARS_COUNT) {
      setTextFieldError(`Your review mustn't be less then ${MIN_CHARS_COUNT} and greater then ${MAX_CHARS_COUNT} characters`);
      if (!target.value) {
        setTextFieldError('Your review must not be empty');
      }
    } else {
      setTextFieldError('');
    }
  };

  const ratingStars = new Array(10).fill('').map((_, index) =>
  {
    const ratingValue = `${10 - index}`;
    return (
      <Fragment key={ratingValue}>
        <input className="rating__input" id={`star-${ratingValue}`} type="radio" name="rating" value={`${ratingValue}`} onChange={onRatingChangeHandler} checked={reviewData.rating === `${ratingValue}`} />
        <label className="rating__label" htmlFor={`star-${ratingValue}`}>{`Rating ${ratingValue}`}</label>
      </Fragment>
    );
  });

  const blurHandler = () => setIsTextFieldUsed(true);

  const onSubmit = () => {
    dispatch(addReviewAction({rating: Number(reviewData.rating), comment: reviewData.reviewText, filmId: id}));
  };

  const submitHandler = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    onSubmit();
  };

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

          <UserBlock />
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={posterImage} alt={`${name} poster`} width="218" height="327" />
        </div>
      </div>

      <div className="add-review">
        <form action="#" className="add-review__form" onSubmit={submitHandler}>
          <div className="rating">
            <div className="rating__stars">
              {ratingStars}
            </div>
          </div>

          <div className="add-review__text" style={{backgroundColor: 'rgba(255, 255, 255, 0.35)'}}>
            <textarea
              onBlur={blurHandler}
              onChange={onTextReviewChangeHandler}
              className="add-review__textarea"
              value={reviewData.reviewText}
              name="review-text"
              id="review-text"
              placeholder="Review text"
            >
            </textarea>

            <div className="add-review__submit">
              <button
                className="add-review__btn"
                type="submit"
                disabled={!isFormValid}
              >
                Post
              </button>
            </div>

          </div>
          {(isTextFieldUsed && textFieldError) && <div style={{color: 'red'}}>{textFieldError}</div>}
        </form>
      </div>

      {isUIBlocking ? <BlockUI /> : ''}
    </section>
  );
}
