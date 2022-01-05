import React from 'react';

const ExpandedModal = (props) => {
  console.log('modal props', props);
  return (
    <div className='POModal'>
      <button className='POCloseModal' onClick={props.switchModal}>x</button>
    </div>
  );
};

export default ExpandedModal;