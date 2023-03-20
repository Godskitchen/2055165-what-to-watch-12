import { Link } from 'react-router-dom';

type FilmCardProps = {
  id: number;
  name: string;
  previewImage: string;
}

export default function FilmCard({id, name, previewImage} : FilmCardProps) : JSX.Element {

  return (
    <article className="small-film-card catalog__films-card" onMouseOver={() => null}>
      <Link className="small-film-card__link" to={`films/${id}`}>
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
