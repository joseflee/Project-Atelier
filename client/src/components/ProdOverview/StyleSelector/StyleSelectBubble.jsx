import React from 'react';

const StyleBubble = (props) => {
  // console.log('style bubble component props', props);

  const update = () => {
    props.updater(props.style);
  };

  return (
    <div className='POStyleCircleContainer' onClick={update}>
      <img className='POStyleSmallImg' src={props.style.photos[0].thumbnail_url} />
    </div>
  );
};

export default StyleBubble;