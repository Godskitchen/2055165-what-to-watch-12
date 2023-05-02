import { DEFAULT_FILTER } from '../../const';
import { MainProcess } from '../../types/state';
import { changeFilterGenreAction, mainProcess, resetFilmsCountOnPageAction, resetFilterGenreAction, showMoreFilmsAction } from './main-process';

const INITIAL_FILMS_COUNT_ON_PAGE = 8;
const testFilmsCount = 10;

const initialState: MainProcess = {
  activeGenre: DEFAULT_FILTER,
  filmsCountOnPage: INITIAL_FILMS_COUNT_ON_PAGE,
};


describe('Reducer: main-process', () => {
  it('without additional parameters should return initial state', () => {
    expect(mainProcess.reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual(initialState);
  });

  describe('Change state known actions', () => {
    let testState: MainProcess;

    beforeEach(() => { testState = { activeGenre: 'currentActiveGenre', filmsCountOnPage: testFilmsCount }; });

    it('should change active genre', () => {
      expect(mainProcess.reducer(testState, changeFilterGenreAction('new-active-genre')))
        .toEqual({ activeGenre: 'new-active-genre', filmsCountOnPage: testFilmsCount });
    });

    it('should reset current active genre to default', () => {
      expect(mainProcess.reducer(testState, resetFilterGenreAction()))
        .toEqual({ activeGenre: DEFAULT_FILTER, filmsCountOnPage: testFilmsCount });
    });

    it('should increase showed films count on page', () => {
      const FILMS_COUNT_PER_LOAD = 8;
      expect(mainProcess.reducer(testState, showMoreFilmsAction()))
        .toEqual({ activeGenre: 'currentActiveGenre', filmsCountOnPage: testFilmsCount + FILMS_COUNT_PER_LOAD });
    });

    it('should reset show films count on page', () => {
      expect(mainProcess.reducer(testState, resetFilmsCountOnPageAction()))
        .toEqual({ activeGenre: 'currentActiveGenre', filmsCountOnPage: INITIAL_FILMS_COUNT_ON_PAGE });
    });
  });
});
