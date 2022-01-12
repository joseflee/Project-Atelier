import React from 'react';

import { sendInteractions } from '../helpers.js';

const ClickedData = (WrappedComponent, widgetName) => {
  class ClickDataAnalytics extends React.Component {
    // define a state for widgetName

    async handleClick(e) {
      var target = e.target;
      var date = new Date();

      // element: string -> selector for the element which was clicked
      // widget: string -> name of the widget/module in which the click occurred
      // time: string -> time the interaction occurred
      var clickedData = {
        element: `${target.tagName.toLowerCase()} ${target.className} ${target.innerHTML}`,
        widget: widgetName,
        time: date.toString()
      };

      console.log(clickedData);

      var sentInteractions = await sendInteractions(clickedData);

      // Executes any click handlers already present.
      // if (this.props.onClick !== undefined || this.props.onClick !== null) {
      //   this.props.onClick(e);
      // }
    }

    render() {
      return <WrappedComponent onClick={this.handleClick} {...this.props}/>;
    }
  }

  return ClickDataAnalytics;
};

export default ClickedData;