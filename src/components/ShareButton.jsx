import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

export default function ShareButton({ pageId, foodType, testId }) {
  const [urlText, setUrlText] = useState('');
  const [showSpan, setShowSpan] = useState(false);

  const copyAlert = () => {
    copy(urlText);
    setShowSpan(true);
  };

  const urlInitial = () => {
    if (foodType === 'meal') {
      const fullURL = `http://localhost:3000/comidas/${pageId}`;
      setUrlText(fullURL);
    } else {
      const fullURL = `http://localhost:3000/bebidas/${pageId}`;
      setUrlText(fullURL);
    }
  };

  useEffect(() => {
    urlInitial();
  }, []);

  return (
    <div className="share-button-div">
      { showSpan && (
        <p> Link copiado! </p>
      )}
      <button
        type="button"
        data-testid={ testId }
        onClick={ copyAlert }
        src={ shareIcon }
      >
        <img src={ shareIcon } alt="share icon" />
      </button>
    </div>
  );
}

ShareButton.propTypes = {
  foodType: PropTypes.string.isRequired,
  pageId: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
};
