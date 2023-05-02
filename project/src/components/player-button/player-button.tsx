import { useNavigate } from 'react-router-dom';

type PlayerButtonProps = {
  filmId: string;
}

export default function PlayerButton({ filmId }: PlayerButtonProps): JSX.Element {

  const navigate = useNavigate();
  const handlePlayBtnClick = () => navigate(`/player/${filmId}`);

  return (
    <button onClick={handlePlayBtnClick} className="btn btn--play film-card__button" type="button">
      <svg viewBox="0 0 19 19" width="19" height="19">
        <use xlinkHref="#play-s"></use>
      </svg>
      <span>Play</span>
    </button>
  );
}
