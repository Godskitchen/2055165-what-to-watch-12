import Genre from '../genre/genre';

type GenresListProps = {
  activeGenre: string;
  availableGenres: string[];
}

export default function GenresList({activeGenre, availableGenres} : GenresListProps) : JSX.Element {
  return (
    <ul className="catalog__genres-list">
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

