import React, { useState, useEffect } from 'react';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

export default function ShareButton({ pageId, foodType }) {
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
    <div>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ copyAlert }
      >
        <img src={ shareIcon } alt="share icon" />
      </button>
      { showSpan && (
        <p> Link copiado! </p>
      )}
    </div>
  );
}
