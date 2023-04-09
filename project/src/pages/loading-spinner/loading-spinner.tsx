import './spinner.css';

export default function LoadingSpinner() : JSX.Element {
  return (
    <div className="spinner-container">
      <div className="loading-spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
