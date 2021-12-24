import React from 'react';

const StyleBubble = (props) => {
  // console.log('style bubble component props', props);

  const update = () => {
    props.updater(props.style);
  };

  return (
    <div onClick={update}>
      {props.style.name}
    </div>
  );
};

export default StyleBubble;