import { Link } from 'react-router-dom';
import UserAvatar from '../user-avatar/user-avatar';
import { useAppDispatch } from '../../hooks';
import { logoutAction } from '../../store/api-actions';

export default function UserBlock() : JSX.Element {

  const dispatch = useAppDispatch();

  return (
    <ul className="user-block">
      <li className="user-block__item">
        <UserAvatar />
      </li>
      <li className="user-block__item">
        <Link
          to='/'
          className="user-block__link"
          onClick={(evt) => {
            evt.preventDefault();
            dispatch(logoutAction());
          }}
        >
          Sign out
        </Link>
      </li>
    </ul>
  );
}
