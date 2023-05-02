import { FilmRatingLevel } from '../const';
import { fakeMovies } from './mocks';
import { getFilmRatingLevel, getRandomFilms, getRandomIntNumber } from './utils';

describe('Function: getRandomIntNumber', () => {
  it('should return NaN if min or max values are less then 0', () => {
    expect(getRandomIntNumber(5, -4)).toEqual(NaN);
    expect(getRandomIntNumber(-5, 0)).toEqual(NaN);
  });

  it('should return NaN if min or max values are infinite', () => {
    expect(getRandomIntNumber(-Infinity, -4)).toEqual(NaN);
    expect(getRandomIntNumber(5, Infinity)).toEqual(NaN);
  });

  it('should return random integer number that >= minvalue and <= maxvalue', () => {
    const min = 5;
    const max = 7.6;
    const result = getRandomIntNumber(min, max);
    expect(Number.isInteger(result)).toBe(true);
    expect(result).toBeLessThanOrEqual(max);
    expect(result).toBeGreaterThanOrEqual(min);
  });
});

describe('Function: getFilmRatingLevel', () => {
  it('should return FilmRatingLevel.Bad if rating >= 0 and < 3', () => {
    expect(getFilmRatingLevel(2)).toEqual(FilmRatingLevel.Bad);
  });
  it('should return FilmRatingLevel.Bad if rating >= 3 and < 5', () => {
    expect(getFilmRatingLevel(4.5)).toEqual(FilmRatingLevel.Normal);
  });
  it('should return FilmRatingLevel.Bad if rating >= 5 and < 8', () => {
    expect(getFilmRatingLevel(5)).toEqual(FilmRatingLevel.Good);
  });
  it('should return FilmRatingLevel.Bad if rating >= 8 and < 10', () => {
    expect(getFilmRatingLevel(8.0)).toEqual(FilmRatingLevel.VeryGood);
  });
  it('should return FilmRatingLevel.Awesom if rating = 10', () => {
    expect(getFilmRatingLevel(10)).toEqual(FilmRatingLevel.Awesome);
  });
});

describe('Function: getRandomFilms', () => {
  it('should return random films count equals the param value', () => {
    const filmList = [...fakeMovies];
    const resCount = 4;
    expect(getRandomFilms(filmList, resCount).length).toEqual(resCount);
  });

  it('should return films list equals the source list if require count > films count', () => {
    const filmList = [...fakeMovies.slice(0, 2)];
    const resCount = 20;
    expect(getRandomFilms(filmList, resCount)).toEqual(filmList);
  });
});
