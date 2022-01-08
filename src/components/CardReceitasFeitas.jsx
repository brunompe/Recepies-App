import React from 'react';
import ShareButton from './ShareButton';

export default function CardReceitasFeitas({
  pageId, foodType, testId, index, category, name, data, tags, image, alcoholicOrNot, area
}) {
  return (
    <div>
      {foodType === 'comida' ? (
        <div>

          <img data-testid={ `${index}-horizontal-image` } src={ image } alt="Recipe" />
          <h3 data-testid={ `${index}-horizontal-name` }>{name}</h3>
          <p data-testid={ `${index}-horizontal-top-text` }>{`${area} - ${category}`}</p>
          <p data-testid={ `${index}-horizontal-done-date` }>{ data }</p>
          <button type="button" data-testid={ `${index}-${tags[0]}-horizontal-tag` }>{tags[0]}</button>
          <button type="button" data-testid={ `${index}-${tags[1]}-horizontal-tag` }>{tags[1]}</button>

          <ShareButton
            pageId={ pageId }
            foodType="meal"
            testId={ `${index}-horizontal-share-btn` }
          />
        </div>
      ) : (
        <div>
          <img data-testid={ `${index}-horizontal-image` } src={ image } alt="Recipe" />
          <h3 data-testid={ `${index}-horizontal-name` }>{name}</h3>
          <p data-testid={ `${index}-horizontal-top-text` }>{alcoholicOrNot}</p>
          <p data-testid={ `${index}-horizontal-done-date` }>{data}</p>

          <ShareButton
            pageId={ pageId }
            foodType="drink"
            testId={ `${index}-horizontal-share-btn` }
          />
        </div>

      )}
    </div>
  );
}
