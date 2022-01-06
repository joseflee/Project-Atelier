import React from 'react';

const StyleBubble = (props) => {
  const update = () => {
    props.updater(props.style);
  };

  return (
    <div className='POStyleCircleContainer' onClick={update}>
      <img className='POStyleSmallImg' alt={props.style.name} src={props.style.photos[0].thumbnail_url} />
    </div>
  );
};

export default StyleBubble;