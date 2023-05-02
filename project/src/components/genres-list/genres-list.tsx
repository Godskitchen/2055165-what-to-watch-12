import { useAppSelector } from '../../hooks';
import { getActiveFilterGenre } from '../../store/main-process/main-process-selectors';
import Genre from '../genre/genre';

type GenresListProps = {
  availableGenres: string[];
}

export default function GenresList({ availableGenres }: GenresListProps): JSX.Element {

  const activeGenre = useAppSelector(getActiveFilterGenre);

  return (
    <ul className="catalog__genres-list" data-testid='genreslist'>
      {availableGenres.map((genre) =>
        (
          <Genre
            key={genre}
            filterName={genre}
            isActive={genre === activeGenre}
          />
        )
      )}
    </ul>
  );
}

