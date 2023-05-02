import { useState } from 'react';
import { Films } from '../../types/film';
import FilmCard from '../film-card/film-card';

type FilmListProps = {
  filmsList: Films;
}

export default function FilmsList({ filmsList }: FilmListProps): JSX.Element {

  const [activeCardId, setActiveCardId] = useState(0);

  return (
    <div className="catalog__films-list" data-testid='filmslist'>
      {filmsList.map(({ id, name, previewImage, previewVideoLink }) =>
        (
          <FilmCard
            key={id}
            id={id}
            name={name}
            previewImage={previewImage}
            previewVideoLink={previewVideoLink}
            onCardEnter={() => setActiveCardId(id)}
            onCardLeave={() => setActiveCardId(0)}
            isActive={id === activeCardId}
          />
        )
      )}
    </div>
  );
}
