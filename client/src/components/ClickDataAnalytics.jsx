import React from 'react';

import { sendInteractions } from '../helpers.js';

export const ClickedData = (WrappedComponent) => {
  class ClickDataAnalytics extends React.Component {
    async handleClick(e) {
      var target = e.target;
      var date = new Date();
      console.log('click data: ', target.parent());

      // element: string -> selector for the element which was clicked
      // widget: string -> name of the widget/module in which the click occurred
      // time: string -> time the interaction occurred
      var clickedData = {
        element: target,
        widget: null,
        time: date
      };

      var sentInteractions = await sendInteractions(clickedData);
    }

    render() {
      return <WrappedComponent onClick={this.handleClick} {...this.props}/>;
    }
  }

  return ClickDataAnalytics;
};
