//import { useState } from 'react';
import { Film, Films } from '../../types/film';
import FilmCard from '../film-card/film-card';

type FilmListProps = {
  filmList: Films;
}

export default function FilmList({filmList} : FilmListProps) : JSX.Element {

  return (
    <div className="catalog__films-list">
      {filmList.map(({id, name, previewImage} : Film) =>
        (<FilmCard key={`${id}`} id={id} name={name} previewImage={previewImage} />)
      )}
    </div>
  );
}
