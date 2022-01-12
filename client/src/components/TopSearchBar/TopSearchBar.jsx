import React from 'react';
const TopSearchBar = () => {
  return (
    <div className='top-Search-Section'>
      <div className="top-Search-Logo"><span>Ate</span><span>li</span><span>er</span></div>
      <div className="top-Search-Container">
        <input className="top-Search-Text" type="text" name="search" />
        <i className="fa fa-search"></i>
      </div>
    </div>
  );
};

export default TopSearchBar;