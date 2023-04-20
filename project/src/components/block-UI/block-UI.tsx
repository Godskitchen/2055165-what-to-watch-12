import LoadingSpinner from '../../pages/loading-spinner/loading-spinner';
import './block-UI.css';

export default function BlockUI() : JSX.Element {

  return (
    <div className="block-ui-container">
      <div className="block-ui-overlay">
        <div className="block-ui-message-container">
          <LoadingSpinner />
        </div>
      </div>
    </div>
  );
}


