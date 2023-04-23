import { Link } from 'react-router-dom';
import CardVideoPlayer from '../card-video-player/card-video-player';

type FilmCardProps = {
  id: number;
  name: string;
  previewImage: string;
  previewVideoLink: string;
  isActive: boolean;
  onCardEnter(): void;
  onCardLeave(): void;
}

export default function FilmCard({id, name, previewImage, previewVideoLink, isActive, onCardEnter, onCardLeave} : FilmCardProps) : JSX.Element {

  const handleCardMouseEnter = () => onCardEnter();
  const handleCardMouseLeave = () => onCardLeave();

  return (
    <article className="small-film-card catalog__films-card" onMouseEnter={handleCardMouseEnter} onMouseLeave={handleCardMouseLeave}>
      <Link className="small-film-card__link" to={`/films/${id}`}>
        <div className="small-film-card__image">
          <CardVideoPlayer poster={previewImage} videoLink={previewVideoLink} isActive={isActive} />
        </div>
        <h3 className="small-film-card__title">
          {name}
        </h3>
      </Link>
    </article>
  );
}
