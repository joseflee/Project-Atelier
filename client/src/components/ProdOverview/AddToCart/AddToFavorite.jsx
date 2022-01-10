import React from 'react';

const AddToFavorite = (props) => {

  const sendToMyOutfit = () => {
    console.log('click!');
  };

  return (
    <div>
      <button onClick={sendToMyOutfit}>&#9734;</button>
    </div>
  );
};

export default AddToFavorite;