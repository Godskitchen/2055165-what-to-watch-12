import { render, screen } from '@testing-library/react';
import CardVideoPlayer from './card-video-player';

describe('Component: CardVideoPlayer', () => {
  const mockPlayer = {
    poster: 'mock-path',
    videoLink: 'mock-link',
    isActive: false
  };

  beforeAll(() => {
    window.HTMLMediaElement.prototype.play = jest.fn();
    window.HTMLMediaElement.prototype.pause = jest.fn();
    window.HTMLMediaElement.prototype.load = jest.fn();
  });

  it('should render correctly', () => {

    render(
      <CardVideoPlayer
        poster={mockPlayer.poster}
        videoLink={mockPlayer.videoLink}
        isActive={mockPlayer.isActive}
      />,
    );

    expect(screen.getByTestId('video')).toBeInTheDocument();
    expect(screen.getByTestId('video')).toHaveAttribute('src', mockPlayer.videoLink);
    expect(screen.getByTestId('video')).toHaveAttribute('poster', mockPlayer.poster);
  });

  it('should start playing video if pros isActive equals true', () => {
    jest.useFakeTimers();
    const DELAY_BEFORE_PLAY = 1000;
    const { rerender } = render(<CardVideoPlayer {...mockPlayer} />);

    const videoElement: HTMLVideoElement = screen.getByTestId('video');
    const playSpy = jest.spyOn(videoElement, 'play');
    const loadSpy = jest.spyOn(videoElement, 'load');

    //user mouseEnter event on film card
    rerender(<CardVideoPlayer {...mockPlayer} isActive />);
    jest.advanceTimersByTime(DELAY_BEFORE_PLAY - 1);
    expect(playSpy).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1);
    expect(playSpy).toHaveBeenCalledTimes(1);

    jest.clearAllTimers();
    jest.useRealTimers();
    playSpy.mockRestore();
    loadSpy.mockRestore();
  });
});
