import { fireEvent, render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-router/history-router';
import NotFoundPage from './not-found-page';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';


const mockStore = configureMockStore();
describe('Page: NotFoundPage', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={mockStore({})}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <NotFoundPage />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Вернуться на главную');
  });

  it('should navigate to main page correctly by clicking on button', () => {
    const history = createMemoryHistory();
    history.push('/fake');

    render(
      <Provider store={mockStore({})}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <Routes>
              <Route
                path={AppRoute.Main}
                element={<h1>Main Page</h1>}
              />
              <Route
                path='*'
                element={<NotFoundPage />}
              />
            </Routes>
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.queryByText(/Main Page/i)).not.toBeInTheDocument();
    const backToMainBtn = screen.getByRole('button');
    fireEvent.click(backToMainBtn);
    expect(screen.getByText(/Main Page/i)).toBeInTheDocument();
  });
});
