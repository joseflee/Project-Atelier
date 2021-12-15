import React from 'react';
import ReactDOM from 'react-dom';
import ProductOverview from './components/ProdOverview/OverView.jsx'
// import RelProducts from './components/RelProducts.jsx'
// import QnA from './components/QnAcomponents/mainQnA.jsx';
// import RatingsNReviews from './components/RatingsNReviews/RatingsNReviews.jsx'
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
        <ProductOverview />
        {/* <RelProducts />
        <QnA />
        <RatingsNReviews /> */}
      </div>
    );
  }
}

export default App;
