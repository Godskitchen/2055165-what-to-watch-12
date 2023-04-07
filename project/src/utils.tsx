import { Fragment } from 'react';
import { Films } from './types/film';

export function addNewlinesInList<T extends string>(list: T[]) : JSX.Element[] {

  const resultList = list.map(
    (value, index) =>
      (index !== list.length - 1)
        ? (<Fragment key={value}>{` ${value}, `}<br/></Fragment>)
        : (<Fragment key={value}>{` ${value} `}</Fragment>)
  );

  return resultList;
}

export function getSimilarFilms(currentFilmId: string, filmsList: Films, genre: string, count: number) : Films {
  return filmsList.filter((film) => film.genre === genre && currentFilmId !== `${film.id}`).slice(0, count);
}

export function filterFilmsByGenre(genre: string, filmsList: Films) : Films {
  if (genre === 'All genres') {
    return filmsList;
  }

  return filmsList.filter((film) => film.genre === genre);
}
