import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

export default function GuestBlock() : JSX.Element {
  return (
    <div className="user-block">
      <Link to={AppRoute.Login} className="user-block__link">Sign in</Link>
    </div>
  );
}
