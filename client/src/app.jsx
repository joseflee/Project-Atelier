import React from 'react';
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
      </div>
    )
  }
}
Æ
ReactDOM.render(<App />, document.getElementById('app'));