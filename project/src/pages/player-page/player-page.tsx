import { useNavigate, useParams } from 'react-router-dom';
import NotFoundPage from '../not-found-page/not-found-page';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect, useRef, useState } from 'react';
import { fetchFilmAction } from '../../store/api-actions';
import ProgressBar from '../../components/progress-bar/progress-bar';
import { getCurrentFilm, getFilmsLoadingStatus, getLoadErrorStatus } from '../../store/app-data/app-data-selectors';
import ErrorScreen from '../../components/error-components/error-screen/error-screen';
import LoadingScreen from '../../components/loading-components/loading-screen/loading-screen';

export default function PlayerPage() : JSX.Element {

  const {id} = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let isMounted = true;

    if (isMounted && id) {
      dispatch(fetchFilmAction(id));
    }

    return () => {isMounted = false;};
  },[id, dispatch]);

  const isFilmsLoading = useAppSelector(getFilmsLoadingStatus);
  const isLoadError = useAppSelector(getLoadErrorStatus);

  const film = useAppSelector(getCurrentFilm);

  if (film === undefined || isFilmsLoading) {
    return <LoadingScreen />;
  }

  if (film === null || !id) {
    if (isLoadError) {
      return <ErrorScreen />;
    }
    return <NotFoundPage />;
  }

  const {
    videoLink,
    name,
    backgroundImage
  } = film;

  const handleLoadMetaData = () => {
    if (videoRef.current !== null) {
      setDuration(Number(videoRef.current.duration.toFixed(0)));
    }
  };

  const handleFullScrBtnClick = () => {
    videoRef.current?.requestFullscreen();
  };

  const handlePlayBtnClick = () => {
    if (videoRef.current?.paused) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  };

  const handleVideoPlay = () => setIsPlaying(true);
  const handleVideoPause = () => setIsPlaying(false);
  const handleVideoEnded = () => setIsPlaying(false);

  const handleVideoTimeUpdate = () => {
    if (videoRef.current !== null) {
      setCurrentTime(Number(videoRef.current.currentTime.toFixed(0)));
    }
  };

  const handleExitBtnClick = () => navigate(`/films/${id}`);

  return (
    <div className="player">
      <video
        ref={videoRef}
        src={videoLink}
        onEnded={handleVideoEnded}
        onPlay={handleVideoPlay}
        onPause={handleVideoPause}
        onTimeUpdate={handleVideoTimeUpdate}
        onLoadedMetadata={handleLoadMetaData}
        autoPlay
        className="player__video"
        poster={backgroundImage}
      />

      <button onClick={handleExitBtnClick} type="button" className="player__exit">Exit</button>

      <div className="player__controls">
        <ProgressBar currentTime={currentTime} duration={duration} />

        <div className="player__controls-row">
          <button onClick={handlePlayBtnClick} type="button" className="player__play">
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use xlinkHref={isPlaying ? '#pause' : '#play-s'}></use>
            </svg>
            <span>Play</span>
          </button>
          <div className="player__name">{name}</div>

          <button onClick={handleFullScrBtnClick} type="button" className="player__full-screen">
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
