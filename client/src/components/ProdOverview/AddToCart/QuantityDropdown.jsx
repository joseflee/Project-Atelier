import React from 'react';

const QuantityDropdown = (props) => {
  // console.log('props', props);
  if (!props.selectedQuantity) {
    return (
      <div>
        <select disabled>
          <option value='' hidden>-</option>
        </select>
      </div>
    );
  } else {
    var sizeArr = [];
    if (props.selectedQuantity < 15) {
      for (var i = 1; i <= props.selectedQuantity; i++) {
        sizeArr.push(i);
      }
    } else {
      for (var i = 1; i <= 15; i++) {
        sizeArr.push(i);
      }
    }
    return (
      <div>
        <select id='QuantitySelector'>
          {sizeArr.map((element, index) => {
            return <option key={index}>{element}</option>;
          })}
        </select>
      </div>
    );
  }
};

export default QuantityDropdown;