import React from 'react';

const AddToFavorite = (props) => {

  const sendToMyOutfit = () => {
    console.log('click!');
  };

  return (
    <div className='POATOC'>
      <button onClick={sendToMyOutfit} className='POAddToFavorte'>&#9734;</button>
    </div>
  );
};

export default AddToFavorite;