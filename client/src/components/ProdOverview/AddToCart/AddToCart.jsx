import React from 'react';
import SizeDropdown from './SizeDropdown.jsx';
import QuantityDropdown from './QuantityDropdown.jsx';
import AddToFavorite from './AddToFavorite.jsx';

class AddToCart extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      desiredSize: 'Select Size',
    };
  }

  componentDidUpdate({displayedStyle}) {
    if (this.state.desiredSize !== 'Select Size') {
      this.setState({
        desiredSize: 'Select Size',
      });
    }
  }

  changeSku (sku, skuNum) {
    this.setState({
      sku: skuNum,
      skuQuantity: sku.quantity,
      desiredSize: sku.size,
    });
  }

  updateQuantity () {
    var quantity = document.getElementById('QuantitySelector').value;
    this.setState({
      desiredQuantity: quantity
    });
  }
  render () {
    // console.log('state', this.state);
    return (
      <div className='POAddToCart'>
        <SizeDropdown displayedSkus={this.props.displayedStyle.skus} changeSku={this.changeSku.bind(this)} />
        <QuantityDropdown selectedQuantity={this.state.skuQuantity} />
        <div >
          <button className='POAddToCartbutton'>Add To Cart</button>
        </div>
        <AddToFavorite />
      </div>
    );
  }
}

export default AddToCart;