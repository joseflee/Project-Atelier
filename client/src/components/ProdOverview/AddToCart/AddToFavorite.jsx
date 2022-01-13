import React from 'react';

const AddToFavorite = (props) => {

  if (props.addToFavorites.includes(props.currentStyleId)) {
    return (
      <div className='POATOC'>
        <button onClick={props.toggleFavorite} className='POAddToFavorte'>&#9733;</button>
      </div>
    );
  } else {
    return (
      <div className='POATOC'>
        <button onClick={props.toggleFavorite} className='POAddToFavorte'>&#9734;</button>
      </div>
    );
  }
};

export default AddToFavorite;