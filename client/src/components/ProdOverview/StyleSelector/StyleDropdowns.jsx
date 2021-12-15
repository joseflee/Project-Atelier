import React from 'react';

const StyleDropdown = (props) => {
  // console.log('dropdown props', props.displayedStyle.skus)
  var sizes = Object.values(props.displayedStyle.skus)
  console.log('sizes', sizes)
  return (
    <div>
      <select name='Size' id='sizeSelector'>
        <option value='SelectSize' selected>Select Size</option>
        {sizes.map((element) => {
          return <option>{element.size}</option>
        })}
      </select>
    </div>
  )
}

export default StyleDropdown;