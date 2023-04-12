import { Link } from 'react-router-dom';
import UserAvatar from '../user-avatar/user-avatar';

export default function UserBlock() : JSX.Element {
  return (
    <ul className="user-block">
      <li className="user-block__item">
        <UserAvatar />
      </li>
      <li className="user-block__item">
        <Link to='/' className="user-block__link">Sign out</Link>
      </li>
    </ul>
  );
}
