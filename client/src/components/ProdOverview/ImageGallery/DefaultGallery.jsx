import React from 'react';

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
    // console.log('image props', this.props);
    return (
      <div className='POImageGallery' data-testid="ImageGallery">
        <div className='POThumbContainer'>
          {this.props.photos.map((element, index) => {
            if (this.state.selectedIndex === index) {
              return <img className='PODisplayThumbImg POThumbImg' key={index} src={element.thumbnail_url} onClick={() => { this.thumbToDisp(index); }} />;
            } else {
              return <img className='POThumbImg' key={index} src={element.thumbnail_url} onClick={() => { this.thumbToDisp(index); }} />;
            }
          })}
        </div>
        <div className='POImgContainer'>
          <i className='POLeftArrow' onClick={this.rotateLeft.bind(this)}></i>
          <img className='PODisplayImg' src={this.props.photos[this.state.selectedIndex].url} onClick={this.props.switchImageModal} />
          <i className='PORightArrow' onClick={this.rotateRight.bind(this)}></i>
        </div>
      </div>
    );
  }
}

export default DefaultGallery;