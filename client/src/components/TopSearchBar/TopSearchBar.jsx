import React from 'react';
const TopSearchBar = () => {
  console.log('top bar');
  return (
    <div className='top-Search-Section'>
      <div class="top-Search-Logo"><span>Ate</span><span>li</span><span>er</span></div>
      <div class="top-Search-Container">
        <input class="top-Search-Text" type="text" name="search" />
        <i class="fa fa-search"></i>
      </div>
    </div>
  );
};

export default TopSearchBar;