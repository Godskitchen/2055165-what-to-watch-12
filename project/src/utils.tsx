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

  const similarFilms = filmsList.filter((film) => film.genre === genre && currentFilmId !== `${film.id}`).slice(0, count);
  return similarFilms;
}

