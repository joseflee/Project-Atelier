import React from 'react';
import QuestionsListItem from './QuestionsListItem.jsx';

class QuestionsList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {/* {console.log('questions', this.props.data)} */}
        {this.props.data.map((question, key) =>{
          return <QuestionsListItem
            question={question}
            key={key}
            name={this.props.name}
            productId={this.props.productId}
            clickOnHelpful={this.props.clickOnHelpful}
            clickOnHelpfulAnswer={this.props.clickOnHelpfulAnswer}
            reportAnswer={this.props.reportAnswer}
            addNewAnswer={this.props.addNewAnswer}
            productName={this.props.productName}
          />;
        })}
      </div>
    );
  }
}

export default QuestionsList;