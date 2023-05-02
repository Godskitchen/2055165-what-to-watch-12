import { Fragment } from 'react';
import { Films } from '../types/film';
import { FilmRatingLevel } from '../const';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);


export const getRandomIntNumber = (min: number, max: number) : number | typeof NaN => {
  if ((!Number.isFinite(min) || !Number.isFinite(max)) || (min < 0 || max < 0)) {
    return NaN;
  }

  const lowerBound = Math.ceil(Math.min(min, max));
  const upperBound = Math.floor(Math.max(min, max));

  return Math.floor(Math.random() * (upperBound - lowerBound + 1) + lowerBound);
};

export function addNewlinesInList<T extends string>(list: T[]) : JSX.Element[] {

  const resultList = list.map(
    (value, index) =>
      (index !== list.length - 1)
        ? (<Fragment key={value}>{` ${value}, `}<br/></Fragment>)
        : (<Fragment key={value}>{` ${value} `}</Fragment>)
  );

  return resultList;
}

export function filterFilmsByGenre(genre: string, filmsList: Films) : Films {
  if (genre === 'All genres') {
    return filmsList;
  }

  return filmsList.filter((film) => film.genre === genre);
}

export function getRandomFilms(filmsList: Films, filmsCount: number) {

  const uniqueSourceArray = Array.from(new Set(filmsList));

  if (filmsCount >= uniqueSourceArray.length) {
    return uniqueSourceArray;
  }

  const resultElements: Films = [];

  for (let i = 0; i < filmsCount; i++) {
    let element = filmsList[getRandomIntNumber(0, filmsList.length - 1)];
    while (resultElements.includes(element)){
      element = filmsList[getRandomIntNumber(0, filmsList.length - 1)];
    }
    resultElements.push(element);
  }

  return resultElements;
}

export function getFilmRatingLevel(rating: number) : string {
  if (rating >= 0 && rating < 3) {
    return FilmRatingLevel.Bad;
  } else if (rating >= 3 && rating < 5) {
    return FilmRatingLevel.Normal;
  } else if (rating >= 5 && rating < 8) {
    return FilmRatingLevel.Good;
  } else if (rating >= 8 && rating < 10) {
    return FilmRatingLevel.VeryGood;
  } else {
    return FilmRatingLevel.Awesome;
  }
}

export function formatTime(timeleft: number) : string {
  const dur = dayjs.duration(timeleft, 'seconds');
  return dur.format(`[-]${dur.hours() === 0 ? '' : 'HH[:]'}mm[:]ss`);
}
