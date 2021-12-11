import React from 'react';
import ReactDOM from 'react-dom';

// import ProductOverview from './components/ProductOverview.jsx'
// import RelProducts from './components/RelProducts.jsx'
// import QnA from './components/QnA.jsx'
// import RatingsNReviews from './components/RatingsNReviews.jsx'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
        {/* <ProductOverview />
        <RelProducts />
        <QnA />
        <RatingsNReviews /> */}
        <h1>hello</h1>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));