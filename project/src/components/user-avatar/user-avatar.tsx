import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks';

export default function UserAvatar() : JSX.Element {

  const userAvatarUrl = useAppSelector((state) => state.userAvatarUrl);

  return (
    <div className="user-block__avatar">
      <Link to='/myList'>
        <img src={userAvatarUrl} alt="User avatar" width="63" height="63" />
      </Link>
    </div>
  );
}
