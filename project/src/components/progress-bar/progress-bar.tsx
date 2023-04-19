
type barProps = {
  currTime: number;
}

export default function ProgressBar({currTime} : barProps) : JSX.Element {

  return (
    <div className="player__controls-row">
      <div className="player__time">
        <progress className="player__progress" value="0" max="100"></progress>
        <div className="player__toggler" style={{left: '0'}}>Toggler</div>
      </div>
      <div className="player__time-value">{currTime}</div>
    </div>
  );
}

//dayjs().minute(runTime).second(0).format('HH:mm:ss')
