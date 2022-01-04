import React from 'react';
import StyleBubble from './StyleSelectBubble.jsx';

const StyleSelector = (props) => {
  // console.log('style props', props);
  const rows = [...Array( Math.ceil(props.styles.results.length / 4) )];
  const formattedArr = rows.map( (row, idx) => props.styles.results.slice(idx * 4, idx * 4 + 4) );
  const styleRows = formattedArr.map((row, index) => (
    <div className='POStyleRowContainer' key={index}>
      {row.map((element, index) => (
        <div className='POStyleContainer' key={index}>
          <StyleBubble style={element} updater={props.changeStyle} />
        </div>
      ))}
    </div>
  ));
  return (
    <div className='styleSelector'>
      <div>
        <p><strong>{'Style >'}</strong> {props.displayedStyle.name}</p>
      </div>
      {styleRows}
    </div>
  );
};

export default StyleSelector;