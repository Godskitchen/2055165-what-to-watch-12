import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getUserInfo } from '../../store/user-process/user-process-selectors';

export default function UserAvatar(): JSX.Element {

  const { avatarUrl } = useAppSelector(getUserInfo);

  return (
    <div className="user-block__avatar" data-testid='user-avatar'>
      <Link to='/mylist'>
        <img src={avatarUrl} alt="User avatar" width="63" height="63" />
      </Link>
    </div>
  );
}
