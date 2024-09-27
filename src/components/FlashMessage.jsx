import { useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/FlashMessage.css';

function FlashMessage({ message, type = 'info', setMessage }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage('');
    }, 3000);

    return () => clearTimeout(timer);
  }, [message, setMessage]);

  if (!message) return null;

  return (
    <div className={`flash-message ${type}`}>
      <p>{message}</p>
    </div>
  );
}

FlashMessage.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string,
  setMessage: PropTypes.func.isRequired
};

export default FlashMessage;
