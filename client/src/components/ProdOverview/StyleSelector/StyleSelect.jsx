import React from 'react';
import StyleBubble from './StyleSelectBubble.jsx';

class StyleSelector extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    // console.log('state', this.state);
    return (
      <div className='styleSelector'>
        {this.props.styles.results.map((element, index) => {
          return <div className='POStyleContainer' key={index}>
            <p className='POStyleName'>{element.name}</p>
            <StyleBubble style={element} updater={this.props.changeStyle} />
          </div>;
        })}
      </div>
    );
  }
}

export default StyleSelector;