import React from 'react';
import ReactDOM from 'react-dom';
import ProductOverview from './components/ProdOverview/OverView.jsx';
import RelProducts from './components/RelProductsComponents/RelProducts.jsx';
import QnA from './components/QnAcomponents/mainQnA.jsx';
import RatingsNReviews from './components/RatingsNReviews/RatingsNReviews.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: 59553,
    };
  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
        <ProductOverview />
        <RelProducts />
        <QnA />
        <RatingsNReviews productId={this.state.productId} />
      </div>
    );
  }
}

export default App;
