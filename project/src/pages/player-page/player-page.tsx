import { useNavigate, useParams } from 'react-router-dom';
import NotFoundPage from '../not-found-page/not-found-page';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect, useRef, useState } from 'react';
import { fetchFilmAction } from '../../store/api-actions';
import ProgressBar from '../../components/progress-bar/progress-bar';
import LoadingSpinner from '../loading-spinner/loading-spinner';
import { getCurrentFilm, getFilmsDataLoadingStatus, getLoadErrorStatus } from '../../store/app-data/app-data-selectors';
import FilmErrorBlock from '../../components/film-error-block/film-error-block';

export default function PlayerPage() : JSX.Element {

  const {id} = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchFilmAction(id));
    }
  },[id, dispatch]);

  const isFilmsDataLoading = useAppSelector(getFilmsDataLoadingStatus);
  const isLoadError = useAppSelector(getLoadErrorStatus);

  const film = useAppSelector(getCurrentFilm);

  if (film === undefined || isFilmsDataLoading) {
    return <LoadingSpinner />;
  }

  if (film === null || !id) {
    if (isLoadError) {
      return <FilmErrorBlock />;
    }
    return <NotFoundPage />;
  }

  const {
    videoLink,
    name,
    backgroundImage
  } = film;

  const metaDataHandler = () => {
    if (videoRef.current !== null) {
      setDuration(Number(videoRef.current.duration.toFixed(0)));
    }
  };

  const fullScreenBtnCLickHandler = () => {
    videoRef.current?.requestFullscreen();
  };

  const playBtnClickHandler = () => {
    if (videoRef.current?.paused) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  };

  const playHandler = () => setIsPlaying(true);
  const pauseHandler = () => setIsPlaying(false);
  const endedHandler = () => setIsPlaying(false);

  const timeUpdateHandler = () => {
    if (videoRef.current !== null) {
      setCurrentTime(Number(videoRef.current.currentTime.toFixed(0)));
    }
  };

  const exitBtnClickHandler = () => navigate(`/films/${id}`);

  return (
    <div className="player">
      <video
        ref={videoRef}
        src={videoLink}
        onEnded={endedHandler}
        onPlay={playHandler}
        onPause={pauseHandler}
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={metaDataHandler}
        autoPlay
        className="player__video"
        poster={backgroundImage}
      />

      <button onClick={exitBtnClickHandler} type="button" className="player__exit">Exit</button>

      <div className="player__controls">
        <ProgressBar currentTime={currentTime} duration={duration} />

        <div className="player__controls-row">
          <button onClick={playBtnClickHandler} type="button" className="player__play">
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use xlinkHref={isPlaying ? '#pause' : '#play-s'}></use>
            </svg>
            <span>Play</span>
          </button>
          <div className="player__name">{name}</div>

          <button onClick={fullScreenBtnCLickHandler} type="button" className="player__full-screen">
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}
