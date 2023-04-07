import { genres } from '../../const';
import Genre from '../genre/genre';

type GenresListProps = {
  activeGenre: string;
}

export default function GenresList({activeGenre} : GenresListProps) : JSX.Element {
  return (
    <ul className="catalog__genres-list">
      {genres.map(({filter}) =>
        (
          <Genre
            key={filter}
            filterName={filter}
            isActive={filter === activeGenre}
          />
        )
      )}
    </ul>
  );
}

