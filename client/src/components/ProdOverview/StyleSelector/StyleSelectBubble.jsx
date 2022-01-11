import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const StyleBubble = (props) => {
  const update = () => {
    props.updater(props.style);
  };

  if (props.usecheck) {
    return (
      <div className='POStyleCircleContainer' onClick={update}>
        <img className='POStyleSmallImg' alt={props.style.name} src={props.style.photos[0].thumbnail_url} />
        <FontAwesomeIcon icon={faCheckCircle} className='POStyleCheck'/>
      </div>
    );
  } else {
    return (
      <div className='POStyleCircleContainer' onClick={update}>
        <img className='POStyleSmallImg' alt={props.style.name} src={props.style.photos[0].thumbnail_url} />
      </div>
    );
  }
};

export default StyleBubble;