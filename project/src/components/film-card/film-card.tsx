import { Link } from 'react-router-dom';
import { MouseEvent } from 'react';

type FilmCardProps = {
  id: number;
  name: string;
  previewImage: string;
  onCardEnter(evt : MouseEvent<HTMLElement>) : void;
  onCardLeave(): void;
}

export default function FilmCard({id, name, previewImage, onCardEnter, onCardLeave} : FilmCardProps) : JSX.Element {

  const handleCardMouseEnter = (evt : MouseEvent<HTMLElement>) => onCardEnter(evt);

  const handleCardMouseLeave = () => onCardLeave();

  return (
    <article className="small-film-card catalog__films-card" data-id={id} onMouseEnter={handleCardMouseEnter} onMouseLeave={handleCardMouseLeave}>
      <Link className="small-film-card__link" to={`/films/${id}`}>
        <div className="small-film-card__image">
          <img src={previewImage} alt={name} width="280" height="175" />
        </div>
        <h3 className="small-film-card__title">
          {name}
        </h3>
      </Link>
    </article>
  );
}
