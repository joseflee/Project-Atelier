import React from 'react';
import StyleBubble from './StyleSelectBubble.jsx';
import { StyleCont, HiddenText } from './Style.styles.js';

class StyleSelector extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    // console.log('state', this.state);
    return (
      <div className='styleSelector'>
        {this.props.styles.results.map((element, index) => {
          return <StyleCont key={index}>
            <HiddenText>{element.name}</HiddenText>
            <StyleBubble style={element} updater={this.props.changeStyle} />
          </StyleCont>;
        })}
      </div>
    );
  }
}

export default StyleSelector;