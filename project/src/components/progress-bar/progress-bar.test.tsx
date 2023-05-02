import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProgressBar from './progress-bar';

describe('Component ProgressBar', () => {
  it('should render correctly', () => {

    const mockProps = {
      duration: 50,
      currentTime: 100
    };

    render(
      <MemoryRouter>
        <ProgressBar {...mockProps} />
      </MemoryRouter>
    );

    expect(screen.getByTestId('progress-bar')).toBeInTheDocument();
    expect(screen.getByText('Toggler')).toBeInTheDocument();
  });
});
