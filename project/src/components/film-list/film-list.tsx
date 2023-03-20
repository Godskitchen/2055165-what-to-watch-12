import { useState } from 'react';
import { Film, Films } from '../../types/film';
import { MouseEvent } from 'react';
import FilmCard from '../film-card/film-card';

type FilmListProps = {
  filmList: Films;
}

export default function FilmList({filmList} : FilmListProps) : JSX.Element {

  const [activeCardId, setActiveCardId] = useState('');

  const onCardEnter = (evt : MouseEvent<HTMLElement>) => {
    if (evt.currentTarget.dataset['id']) {
      setActiveCardId(evt.currentTarget.dataset['id']);
    }
  };

  const onCardLeave = () => {
    setActiveCardId('');
  };

  // eslint-disable-next-line no-console
  console.log('activeCardid = ', activeCardId);

  return (
    <div className="catalog__films-list">
      {filmList.map(({id, name, previewImage} : Film) =>
        (
          <FilmCard
            key={`${id}`}
            id={id}
            name={name}
            previewImage={previewImage}
            onCardEnter={onCardEnter}
            onCardLeave={onCardLeave}
          />
        )
      )}
    </div>
  );
}
