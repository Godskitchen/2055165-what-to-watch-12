import { NavLink } from 'react-router-dom';
import { tabNames } from '../../const';

type TabsListProps = {
  activeTab: typeof tabNames[number];
  id: string;
};

export default function TabsNavigation({activeTab, id}: TabsListProps) : JSX.Element {
  const tabs = [...tabNames].map((value) => (
    <li key={value} className={`film-nav__item ${activeTab === value ? 'film-nav__item--active' : ''}`}>
      <NavLink
        to={`/films/${id}/${value.toLowerCase()}`}
        className='film-nav__link'
        style={({isActive}) => ({ pointerEvents: isActive ? 'none' : 'auto' })}
        data-testid={`${activeTab === value ? 'active-tab' : 'inactive-tab'}`}
      >
        {value}
      </NavLink>
    </li>
  ));

  return (
    <nav className="film-nav film-card__nav" data-testid='tabs-navigation'>
      <ul className="film-nav__list">
        {tabs}
      </ul>
    </nav>
  );
}
