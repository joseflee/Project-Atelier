import React from 'react';

class SearchQuestions extends React.Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange() {
    
  }

  render() {
    return (
      <form>
        <input
          type='text'
          placeholder='Have a question? Search for answers…'
          size='50'
          onChange={this.handleInputChange} />
      </form>
    );
  }

}

export default SearchQuestions;