import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks';

export default function UserAvatar() : JSX.Element {

  const {avatarUrl} = useAppSelector((state) => state.userInfo);

  return (
    <div className="user-block__avatar">
      <Link to='/myList'>
        <img src={avatarUrl} alt="User avatar" width="63" height="63" />
      </Link>
    </div>
  );
}
