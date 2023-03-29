import { useState } from 'react';
import { Films } from '../../types/film';
import FilmCard from '../film-card/film-card';

type FilmListProps = {
  filmsList: Films;
}

export default function FilmsList({filmsList} : FilmListProps) : JSX.Element {

  const [activeCardId, setActiveCardId] = useState('');

  // eslint-disable-next-line no-console
  console.log('activeCardid = ', activeCardId);

  return (
    <div className="catalog__films-list">
      {filmsList.map(({id, name, previewImage}) =>
        (
          <FilmCard
            key={`${id}`}
            id={id}
            name={name}
            previewImage={previewImage}
            onCardEnter={() => setActiveCardId(`${id}`)}
            onCardLeave={() => setActiveCardId('')}
          />
        )
      )}
    </div>
  );
}
