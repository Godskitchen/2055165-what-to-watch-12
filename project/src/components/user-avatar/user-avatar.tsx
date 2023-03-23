import { Link } from 'react-router-dom';

export default function UserAvatar() : JSX.Element {
  return (
    <div className="user-block__avatar">
      <Link to='/myList'>
        <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
      </Link>
    </div>
  );
}
