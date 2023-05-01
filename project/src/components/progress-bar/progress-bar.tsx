import { formatTime } from '../../utils/utils';

type barProps = {
  currentTime: number;
  duration: number;
}

export default function ProgressBar({currentTime, duration} : barProps) : JSX.Element {

  const timeLeft = formatTime(duration - currentTime);
  const percentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="player__controls-row">
      <div className="player__time">
        <progress className="player__progress" value={percentage} max="100" data-testid='progress-bar'></progress>
        <div className="player__toggler" style={{left: `${percentage}%`}}>Toggler</div>
      </div>
      <div className="player__time-value">{timeLeft}</div>
    </div>
  );
}

