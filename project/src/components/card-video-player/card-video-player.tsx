import {useEffect, useRef} from 'react';

type CardVideoPlayerProps = {
  poster: string;
  videoLink: string;
  isActive: boolean;
}

export default function CardVideoPlayer({poster, videoLink, isActive} : CardVideoPlayerProps) : JSX.Element {

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement === null) {
      return;
    }

    let timeoutID: NodeJS.Timeout | null = null;

    if (isActive) {
      timeoutID = setTimeout(() => {videoElement.play();}, 1000);
    } else {
      videoElement.load();
    }
    return () => {
      if (timeoutID !== null) {
        clearTimeout(timeoutID);
      }
    };
  }, [isActive]);

  return (
    <video
      src={videoLink} muted
      poster={poster}
      style={{width:'280px', height: 'inherit', objectFit: 'cover'}}
      ref={videoRef}
    />
  );
}
