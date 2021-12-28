import React from 'react';
import StyleBubble from './StyleSelectBubble.jsx';
import SizeDropdown from './SizeDropdown.jsx';
import QuantityDropdown from './QuantityDropdown.jsx';
import { StyleCont, HiddenText } from './Style.styles.js';

class StyleSelector extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      selectedSku: 'Select Size',
    };
  }

  changeSku (sku) {
    this.setState({
      selectedSku: sku,
      selectedSize: sku.size,
      selectedQuantity: sku.quantity,
    });
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
        <SizeDropdown displayedSkus={this.props.displayedStyle.skus} changeSku={this.changeSku.bind(this)} />
        <QuantityDropdown selectedQuantity={this.state.selectedQuantity} />
      </div>
    );
  }
}

export default StyleSelector;