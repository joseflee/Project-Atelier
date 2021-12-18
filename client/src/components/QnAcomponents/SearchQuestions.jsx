import React from 'react';

class SearchQuestions extends React.Component {
  constructor(props) {
    super(props);
    
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    let query = event.target.value;
    if (query.length >= 3) {
      this.props.search(query, true);
    } else {
      this.props.search(query, false);
    }


  }

  render() {
    return (
      <form>
        <input
          type='text'
          placeholder='Have a question? Search for answers…'
          size='50'
          onChange={(e)=>this.handleInputChange(e)} />
      </form>
    );
  }

}

export default SearchQuestions;