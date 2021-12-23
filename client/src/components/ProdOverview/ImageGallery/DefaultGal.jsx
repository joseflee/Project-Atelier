import React from 'react';
import styled from 'styled-components';
import { ImgContainer, DisplayImg, ThumbContainer, ThumbImg,
  DisplayedThumbImg, RightArrow, LeftArrow } from './ImageGal.styles.js';

class DefaultGallery extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      selectedIndex: 0,
    };
  }

  componentDidUpdate({photos}) {
    // Sets image to last one if selectedIndex is out of range
    if (this.state.index > photos.length - 1) {
      this.setState({
        selectedIndex: photos.length - 1,
      });
    }
  }

  rotateRight () {
    if (this.state.selectedIndex < this.props.photos.length - 1) {
      this.setState({
        selectedIndex: this.state.selectedIndex += 1,
      });
    } else {
      this.setState({
        selectedIndex: 0,
      });
    }
  }

  rotateLeft () {
    if (this.state.selectedIndex <= this.props.photos.length - 1 && this.state.selectedIndex !== 0) {
      this.setState({
        selectedIndex: this.state.selectedIndex -= 1,
      });
    } else {
      console.log('end', this.props.photos.length - 1)
      this.setState({
        selectedIndex: this.props.photos.length - 1,
      });
    }
  }

  thumbToDisp(index) {
    this.setState({
      selectedIndex: index
    });
  }

  render () {
    return (
      <div className='imageGallery'>
        <ImgContainer className='mainImage'>
          <LeftArrow className='leftArrow' onClick={this.rotateLeft.bind(this)}></LeftArrow>
          <DisplayImg src={this.props.photos[this.state.selectedIndex].url} />
          <RightArrow className='arrowRight' onClick={this.rotateRight.bind(this)}></RightArrow>
        </ImgContainer>
        <ThumbContainer className='thumbnails'>
          {this.props.photos.map((element, index) => {
            if (this.state.selectedIndex === index) {
              return <DisplayedThumbImg key={index} src={element.thumbnail_url} onClick={() => { this.thumbToDisp(index); }} />;
            } else {
              return <ThumbImg key={index} src={element.thumbnail_url} onClick={() => { this.thumbToDisp(index); }} />;
            }
          })}
        </ThumbContainer>
      </div>
    );
  }
}

export default DefaultGallery;