import React from 'react';
import { SmallImg, CircDiv } from './Style.styles.js';

const StyleBubble = (props) => {
  // console.log('style bubble component props', props);

  const update = () => {
    props.updater(props.style);
  };

  return (
    <CircDiv onClick={update}>
      <SmallImg src={props.style.photos[0].thumbnail_url} />
    </CircDiv>
  );
};

export default StyleBubble;