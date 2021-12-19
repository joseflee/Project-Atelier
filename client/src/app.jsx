import React from 'react';
import ReactDOM from 'react-dom';
<<<<<<< HEAD
import ProductOverview from './components/ProdOverview/OverView.jsx';
import RelProducts from './components/RelProductsComponents/RelProducts.jsx';
import QnA from './components/QnAcomponents/mainQnA.jsx';
import RatingsNReviews from './components/RatingsNReviews/RatingsNReviews.jsx';

=======
import ProductOverview from './components/ProdOverview/OverView.jsx'
// import RelProducts from './components/RelProductsComponents/RelProducts.jsx'
// import QnA from './components/QnAcomponents/mainQnA.jsx';
// import RatingsNReviews from './components/RatingsNReviews/RatingsNReviews.jsx'
>>>>>>> 960e260 (Implemented a main image and -click to display- thumbnail gallery)
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
<<<<<<< HEAD
        <RelProducts />
        <QnA productId={this.state.productId} />
        <RatingsNReviews productId={this.state.productId} />
=======
        {/* <RelProducts />
        <QnA />
        <RatingsNReviews /> */}
>>>>>>> 960e260 (Implemented a main image and -click to display- thumbnail gallery)
      </div>
    );
  }
}

export default App;
