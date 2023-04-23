import { Link } from 'react-router-dom';
import UserAvatar from '../user-avatar/user-avatar';
import { useAppDispatch } from '../../hooks';
import { logoutAction } from '../../store/api-actions';
import { MouseEvent } from 'react';

export default function UserBlock() : JSX.Element {

  const dispatch = useAppDispatch();

  const handleLogOutBtnClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

  return (
    <ul className="user-block">
      <li className="user-block__item">
        <UserAvatar />
      </li>
      <li className="user-block__item">
        <Link
          to='/'
          className="user-block__link"
          onClick={handleLogOutBtnClick}
        >
          Sign out
        </Link>
      </li>
    </ul>
  );
}
