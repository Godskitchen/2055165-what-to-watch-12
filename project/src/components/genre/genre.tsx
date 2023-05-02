import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { resetFilmsCountOnPageAction, changeFilterGenreAction } from '../../store/main-process/main-process';

type GenreProps = {
  filterName: string;
  isActive: boolean;
}

export default function Genre({ filterName, isActive }: GenreProps): JSX.Element {

  const dispatch = useAppDispatch();

  const handleGenreClick = () => {
    dispatch(resetFilmsCountOnPageAction());
    dispatch(changeFilterGenreAction(filterName));
  };

  return (
    <li className={`catalog__genres-item ${isActive ? 'catalog__genres-item--active' : ''}`}>
      <Link
        to="#"
        className="catalog__genres-link"
        style={{ pointerEvents: isActive ? 'none' : 'auto' }}
        onClick={handleGenreClick}
      >
        {filterName}
      </Link>
    </li>
  );
}
