import { useEffect, useRef } from 'react';

type CardVideoPlayerProps = {
  poster: string;
  videoLink: string;
  isActive: boolean;
}

const DELAY_BEFORE_PLAY = 1000;

export default function CardVideoPlayer({ poster, videoLink, isActive }: CardVideoPlayerProps): JSX.Element {

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    let isMounted = true;
    let timeoutID: NodeJS.Timeout | null = null;

    if (isMounted) {
      const videoElement = videoRef.current;

      if (videoElement === null) {
        return;
      }

      if (isActive) {
        timeoutID = setTimeout(() => { videoElement.play(); }, DELAY_BEFORE_PLAY);
      } else {
        videoElement.load();
      }
    }

    return () => {
      isMounted = false;
      if (timeoutID !== null) {
        clearTimeout(timeoutID);
      }
    };
  }, [isActive]);

  return (
    <video
      src={videoLink} muted
      poster={poster}
      style={{ width: '280px', height: 'inherit', objectFit: 'cover' }}
      ref={videoRef}
      data-testid='video'
    />
  );
}
