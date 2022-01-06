import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft} from '@fortawesome/free-solid-svg-icons';

// library.add(faArrowRight);
// library.add(faArrowLeft);


export class ExpandedModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
  }

  componentDidMount() {
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    document.body.style.overflow = 'unset';
  }

  rotateRight () {
    if (this.state.index < this.props.photos.length - 1) {
      this.setState({
        index: this.state.index += 1,
      });
    } else {
      this.setState({
        index: 0,
      });
    }
  }

  rotateLeft () {
    if (this.state.index <= this.props.photos.length - 1 && this.state.index !== 0) {
      this.setState({
        index: this.state.index -= 1,
      });
    } else {
      this.setState({
        index: this.props.photos.length - 1,
      });
    }
  }

  render () {
    console.log('props', this.props);
    return (
      <div className='POModal'>
        <button className='POCloseModal' onClick={this.props.switchModal}>x</button>
        <div className='POModalArrowContainer'>
          <FontAwesomeIcon icon={faArrowLeft} size='lg' onClick={this.rotateLeft.bind(this)} />
          <FontAwesomeIcon icon={faArrowRight} size='lg' onClick={this.rotateRight.bind(this)}/>
        </div>
        <div className='POModalImageDisplayer'>
          <img className='POModalImage' src={this.props.photos[this.state.index].url}/>
        </div>
        <div className='POModalThumbDisplayer'>
          {this.props.photos.map((element, index) => {
            if (this.state.index === index) {
              return <img className='POModalDisplayThumbImg POModalThumbImg' key={index} src={element.thumbnail_url} onClick={() => { this.thumbToDisp(index); }} />;
            } else {
              return <img className='POModalThumbImg' key={index} src={element.thumbnail_url} onClick={() => { this.thumbToDisp(index); }} />;
            }
          })}
        </div>
      </div>
    );
  }
}

export default ExpandedModal;