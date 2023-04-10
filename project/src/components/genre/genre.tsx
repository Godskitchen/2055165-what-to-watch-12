import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { changeGenre, resetFilmsCountOnPage, resetFilmsList } from '../../store/action';
import { fetchFilmsAction } from '../../store/api-actions';

type GenreProps = {
  filterName: string;
  isActive: boolean;
}

export default function Genre({filterName, isActive} : GenreProps) : JSX.Element {

  const dispatch = useAppDispatch();

  const onGenreClickHandler = () => {
    dispatch(resetFilmsList());
    dispatch(resetFilmsCountOnPage());
    dispatch(changeGenre({activeGenre: filterName}));
    dispatch(fetchFilmsAction());
  };

  return (
    <li className={`catalog__genres-item ${isActive ? 'catalog__genres-item--active' : ''}`}>
      <Link
        to="#"
        className="catalog__genres-link"
        style={{ pointerEvents: isActive ? 'none' : 'auto' }}
        onClick={onGenreClickHandler}
      >
        {filterName}
      </Link>
    </li>
  );
}
