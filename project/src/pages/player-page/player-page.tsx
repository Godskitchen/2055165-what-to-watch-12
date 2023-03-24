import { useNavigate, useParams } from 'react-router-dom';
import { Films } from '../../types/film';
import NotFoundPage from '../not-found-page/not-found-page';
import dayjs from 'dayjs';

type PlayerPageProps = {
  filmList: Films;
}

export default function PlayerPage({filmList} : PlayerPageProps) : JSX.Element {

  const {id} = useParams();
  const film = filmList.find((movie) => `${movie.id}` === id);
  const navigate = useNavigate();

  if (film && id) {

    const {
      videoLink,
      name,
      runTime,
      backgroundImage
    } = film;

    return (
      <div className="player">
        <video src={videoLink} autoPlay muted className="player__video" poster={backgroundImage}>
        </video>

        <button onClick={() => navigate(`/films/${id}`)} type="button" className="player__exit">Exit</button>

        <div className="player__controls">
          <div className="player__controls-row">
            <div className="player__time">
              <progress className="player__progress" value="0" max="100"></progress>
              <div className="player__toggler" style={{left: '0'}}>Toggler</div>
            </div>
            <div className="player__time-value">{dayjs().minute(runTime).second(0).format('HH:mm:ss')}</div>
          </div>

          <div className="player__controls-row">
            <button type="button" className="player__play">
              <svg viewBox="0 0 19 19" width="19" height="19">
                <use xlinkHref="#play-s"></use>
              </svg>
              <span>Play</span>
            </button>
            <div className="player__name">{name}</div>

            <button type="button" className="player__full-screen">
              <svg viewBox="0 0 27 27" width="27" height="27">
                <use xlinkHref="#full-screen"></use>
              </svg>
              <span>Full screen</span>
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return <NotFoundPage />;
  }
}
